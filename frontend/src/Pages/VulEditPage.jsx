import { useEffect, Fragment, useReducer, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getVulReq, editVulReq, getScreenShotReq, getRefFileReq } from '../utils'
import VulInfoTable from '../Components/VulInfoTable';
import POCInfoTable from '../Components/POCInfoTable';
import ScreenShotInfoTable from '../Components/ScreenShotInfoTable';
import ReferFileInfoTable from '../Components/ReferFileInfoTable';
import { useState } from 'react';

const pocListStateReducer = (state, action) => {
  switch(action.type) {
    case 'set' :
      return [ ...action.value ];
    case 'append':
      return [ ...state, { ...action.value } ];
    case 'delete':
      return state.filter((e, idx) => idx !== action.value);
    case 'update':
      state[action.idx][action.name] = action.value;
      return [ ...state ];
    default:
      return state;
  }
};

const vulObjStateReducer = (state, action) => {
  return (action.type === 'set')? { ...action.value } : { ...state, [action.name]: action.value };
};

export default function VulEditPage(props){
  const { projectId, areaAlias, assetId, vulId } = useParams();

  const [ vulObj, vulObjDispatch ] = useReducer(vulObjStateReducer, {});
  const [ pocList, pocListDispatch ] = useReducer(pocListStateReducer, []);
  const [ screenshotList, setScreenshotList ] = useState([]);

  // const [ refFileList, setRefFileList ] = useState([]);

  const navigate = useRef(useNavigate());
  
  useEffect(() => {
    getVulReq(vulId).then( ([result, jsonData])=> { 
      if(result){
        vulObjDispatch({ type: 'set', value: jsonData});
        pocListDispatch({ type: 'set', value: jsonData.pocs });
      }
    });
    getScreenShotReq(vulId).then( ([result, jsonData])=> { 
      if(result) setScreenshotList(jsonData);
    });
    // getRefFileReq(vulId).then( ([result, jsonData])=> { 
    //   if(result) setRefFileList(jsonData);
    // });
  },[vulId]);

  const saveVulObj=()=>{
    let payload = {...vulObj };
    payload.pocs = pocList;
    
    if(pocList.length && ( vulObj.result === 'N' || vulObj.result === 'NA' || vulObj.result === '' )){
      vulObjDispatch({ name: 'result', value: 'Y'});
      alert('취약항목이 존재하므로 평가결과를 "취약"으로 변경하여 저장합니다.');
      payload.result = 'Y';
    }
    if(pocList.length === 0 && vulObj.result === 'Y'){
      vulObjDispatch({ name: 'result', value: 'N'});
      alert('취약항목이 존재하지 않으므로 평가결과를 "양호"로 변경하여 저장합니다.');
      payload.result = 'N';
    }
    
    for(let poc of pocList){
      if(poc.is_patched === false && payload.is_patched === true){
        vulObjDispatch({ name: 'is_patch', value: false});
        payload.is_patched = false;
      }
      if(poc.is_reported === false && payload.is_reported === true){
        vulObjDispatch({ name: 'is_reported', value: false});
        payload.is_reported = false;
      }
      if(poc.is_new === true && payload.is_new === false){
        vulObjDispatch({ name: 'is_new', value: true});
        payload.is_new = true;
      }
    }
    

    editVulReq(vulId, payload).then(([result, jsonData])=> {
      if(result){
        console.log(jsonData)
        vulObjDispatch({ type: 'set', value: jsonData});
        pocListDispatch({ type: 'set', value: jsonData.pocs });
        alert('저장 완료');
      }else{ 
        alert('error')
      }
    });
  }

  const pocTable = useMemo(()=> <POCInfoTable vulId={parseInt(vulId)} pocList={pocList} pocListDispatch={pocListDispatch}/>, [vulId, pocList]);
  const vulTable = useMemo(()=> <VulInfoTable vulObj={vulObj} vulObjDispatch={vulObjDispatch}/>, [vulObj]);
  const ScreenShotTable = useMemo(()=> <ScreenShotInfoTable refFileList={screenshotList} setRefFileList={setScreenshotList} vulId={vulId}/>, [screenshotList, vulId]);

  // const ReferFileTable = useMemo(()=> <ReferFileInfoTable refFileList={refFileList} setRefFileList={setRefFileList} vulId={vulId}/>, [refFileList, vulId]);


  return (
    <Fragment>
      <div className="card shadow mb-4">
      <div className="card-header py-3">
        <span className='m-0 font-weight-bold search-title'>취약점 상세</span>
        <Button size="sm" as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetId}`}>뒤로</Button>
        <Button size="sm" onClick={ saveVulObj }>저장</Button>
      </div>
        <div className="card-body">
          { vulTable }
          { areaAlias === 'WEB' || areaAlias === 'MOB' ? ScreenShotTable : null }
          {/* { ReferFileTable } */}
          { pocTable }
          <div className="form-actions">
          </div>
        </div>
      </div>
    </Fragment>
  );
}

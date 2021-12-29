import { useEffect, Fragment, useReducer, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getVulReq, editVulReq, getScreenShotReq } from '../utils'
import VulInfoTable from '../Components/VulInfoTable';
import POCInfoTable from '../Components/POCInfoTable';
import ScreenShotInfoTable from '../Components/ScreenShotInfoTable';
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
  //const { state } = useLocation();
  //const [ vulObj, vulObjDispatch ] = useReducer(vulObjStateReducer, (state) ? state.vulObj : {});
  //const [ pocList, pocListDispatch ] = useReducer(pocListStateReducer, vulObj ? vulObj.pocs : []);
  
  const [ vulObj, vulObjDispatch ] = useReducer(vulObjStateReducer, {});
  const [ pocList, pocListDispatch ] = useReducer(pocListStateReducer, []);
  const [ refFileList, setRefFileList ] = useState([]);

  const navigate = useRef(useNavigate());
  
  useEffect(() => {
    getVulReq(vulId).then( ([result, jsonData])=> { 
      if(result){
        vulObjDispatch({ type: 'set', value: jsonData});
        pocListDispatch({ type: 'set', value: jsonData.pocs });
      }
    });
    getScreenShotReq(vulId).then( ([result, jsonData])=> { 
      if(result){
        setRefFileList(jsonData);
      }
    });
  },[vulId]);

  const saveVulObj=()=>{
    if(pocList.length && ( vulObj.result === 'N' || vulObj.result === 'NA' || vulObj.result === '' )){
      alert('취약항목이 존재하므로 평가결과를 "취약"으로 변경합니다');
      vulObjDispatch({ name: 'result', value: 'Y'});
      return false;
    }
    if(pocList.length === 0 && vulObj.result === 'Y'){
      alert('취약항목이 존재하지 않으므로 평가결과를 "양호"으로 변경합니다');
      vulObjDispatch({ name: 'result', value: 'N'});
      return false;
    }

    editVulReq(vulId, vulObj, pocList).then(([result, jsonData])=> {
      if(result){
        vulObjDispatch({ type: 'set', value: jsonData});
        pocListDispatch({ type: 'set', value: jsonData.pocs });
        navigate.current(`/v-a/${projectId}/${areaAlias}/${assetId}`);
        return true;
      }else{ 
        alert('error')
      }
    });
  }

  const pocTable = useMemo(()=> <POCInfoTable vulId={parseInt(vulId)} pocList={pocList} pocListDispatch={pocListDispatch}/>, [vulId, pocList]);
  const vulTable = useMemo(()=> <VulInfoTable vulObj={vulObj} vulObjDispatch={vulObjDispatch}/>, [vulObj]);
  const ScreenShotTable = useMemo(()=> <ScreenShotInfoTable refFileList={refFileList} setRefFileList={setRefFileList} vulId={vulId}/>, [refFileList]);

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
          { ScreenShotTable }
          { pocTable }
          <div className="form-actions">
          </div>
        </div>
      </div>
    </Fragment>
  );
}

import { useEffect, Fragment, useReducer, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getVulReq, editVulReq, getScreenShotReq, getRefFileReq } from '../utils'
import VulInfoTable from '../Components/VulInfoTable';
import POCInfoTable from '../Components/POCInfoTable';
import ScreenShotInfoTable from '../Components/ScreenShotInfoTable';
import ReferFileInfoTable from '../Components/ReferFileInfoTable';
import { Box, Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import ZoomInMapRoundedIcon from '@mui/icons-material/ZoomInMapRounded';
import { useState } from 'react';

const pocListStateReducer = (state, action) => {
  console.log(action)
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
  const { VUL_INIT_STATE } = global.config
  const [ vulObj, vulObjDispatch ] = useReducer(vulObjStateReducer, VUL_INIT_STATE);
  const [ pocList, pocListDispatch ] = useReducer(pocListStateReducer, []);
  const [ screenshotList, setScreenshotList ] = useState([]);

  // const [ refFileList, setRefFileList ] = useState([]);

  const navigate = useNavigate();
  console.log(vulObj)
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
      if(poc.is_new === false && payload.is_new === true){
        vulObjDispatch({ name: 'is_new', value: false});
        payload.is_new = false;
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
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>Step1</Typography>} action={ 
          <>
          <Tooltip title="저장" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={saveVulObj}>
              <SaveIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
         

          <Tooltip title="뒤로" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={()=>navigate(-1)}>
              <ArrowBackIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          </> 
        }/>
        <CardContent>
          { vulTable }
          { areaAlias === 'WEB' || areaAlias === 'MOB' ? ScreenShotTable : null }
          {/* { ReferFileTable } */}
          { pocTable }
        </CardContent >
      </Card>

      
    </Fragment>
  );
}

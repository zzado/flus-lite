import { useEffect, Fragment, useReducer } from 'react';
import AssetInfoTable from '../Components/AssetInfoTable';
import { Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { editAssetReq, payloadEmptyCheck } from '../utils';
import SaveIcon from '@mui/icons-material/Save';
import { useAssetContext } from '../Context/AppContext'

const stateReducer = (state, action) => {
  console.log(action)
  if(action.type === 'setAssetObj')
    return { ...state, ...action.value};
  else
    return { ...state, [action.name]: action.value};
};

export default function AssetEditPage(){
  const { platformList, assetObj, resetAssetList} = useAssetContext();
  const { areaAlias, assetId, projectId } = useParams();
  const { ASSET_INIT_STATE, ASSET_VALID_CHECK_FIELDS } = global.config
  const [ assetState, assetStateDispatch ] = useReducer(stateReducer, ASSET_INIT_STATE);
  const navigate = useNavigate();
  
  useEffect(() => {
    assetStateDispatch({type:'setAssetObj', value: assetObj});
  },[assetObj]);

  useEffect(() => {
      if(platformList.length) assetStateDispatch({name:'platformList' ,value:platformList});
  }, [platformList]);


  const editAsset = () => {
    let payload = {...assetState };
    
    if( ['SRV', 'DBM', 'MOB', 'ISS', 'NET'].includes(areaAlias) && payload.platform === 'NONE'){
      alert(`[자산종류] 필드가 비어있습니다!`); 
      return false;
    }

    if(!assetState.platformList.find(e=>e.value===payload.platform)){
      payload.platform_t = payload.platform;
      payload.platform = '[[OTHER]]';
    }

    const [validResult, value] = payloadEmptyCheck(payload, ASSET_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    editAssetReq(assetId, payload).then( ([result, jsonData]) => {
       if(result){ 
        resetAssetList();
        navigate(`/a/${projectId}/${areaAlias}/${assetId}`); 
      }else{ 
        navigate('/auth');
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>자산 편집</Typography>} action={ 
          <>
          <Tooltip title="뒤로가기" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={()=>navigate(`/a/${projectId}/${areaAlias}/${assetId}`)}>
              <ArrowBackIcon sx={{ color:'black', fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="저장" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={editAsset}>
              <SaveIcon sx={{ color:'green', fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          </> 
        }/>
        <CardContent>
        
        <AssetInfoTable action={'edit'} areaAlias={areaAlias} assetState={assetState} assetStateDispatch={assetStateDispatch}/>
        </CardContent>
      </Card>
    </Fragment>
  );
}

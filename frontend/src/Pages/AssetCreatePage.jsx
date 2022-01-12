import { useEffect, Fragment, useReducer } from 'react';
import AssetInfoTable from '../Components/AssetInfoTable';
import { Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createAssetReq, payloadEmptyCheck } from '../utils';
import SaveIcon from '@mui/icons-material/Save';
import { useAssetContext } from '../Context/AppContext'

const stateReducer = (state, action) => {
  return { ...state, [action.name]: action.value};
};

export default function AssetCreatePage(){
  const { areaAlias, projectId } = useParams();
  const { platformList, assetList, resetAssetList, getPlatformList} = useAssetContext();
  const { ASSET_INIT_STATE, ASSET_VALID_CHECK_FIELDS } = global.config
  const [ assetState, assetStateDispatch ] = useReducer(stateReducer, ASSET_INIT_STATE);
  const navigate = useNavigate();
  
  useEffect(() => {
    assetStateDispatch({name:'platformList' ,value: platformList});
  }, [platformList]);

  useEffect(() => {
    if(assetList.length) assetStateDispatch({name:'num' , value:assetList[assetList.length-1].num +1});
  }, [assetList]);

  useEffect(() => {
    getPlatformList()
  }, [getPlatformList]);

  const createAsset = () => {
    let payload = {...assetState, area_alias: areaAlias, project: projectId };
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

    createAssetReq(payload).then( ([result, jsonData]) => {
      if(result){ 
        resetAssetList();
        navigate(`/w/${projectId}/${areaAlias}/step1`); 
      }else{ console.log(jsonData); navigate('/auth');}
    });
  };

  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>자산 편집</Typography>} action={ 
          <>
          <Tooltip title="뒤로가기" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step1`)}>
              <ArrowBackIcon sx={{ color:'black', fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="저장" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={createAsset}>
              <SaveIcon sx={{ color:'green', fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          </> 
        }/>
        <CardContent>
        
        <AssetInfoTable action={'create'} areaAlias={areaAlias} assetState={assetState} assetStateDispatch={assetStateDispatch}/>
        </CardContent>
      </Card>
    </Fragment>
  );
}

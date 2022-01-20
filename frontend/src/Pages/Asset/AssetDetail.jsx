import { useEffect, Fragment, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AssetInfoTable from 'Components/AssetInfoTable';
//import { useAssetContext } from 'Context/AppContext'
import { useAssetContext } from 'Hooks/useAssetContext';
import { deleteAssetReq  } from 'utils';

import { Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function AssetDetailPage(){
  const { assetObj, resetAssetList} = useAssetContext();

  const navigate = useNavigate();
  const { projectId, areaAlias, assetId } = useParams();
  const { ASSET_INIT_STATE } = global.config
  const [ assetState, setAssetState ] = useState(ASSET_INIT_STATE);

  useEffect(() => {
    if(assetObj.name) setAssetState(assetObj);
  },[assetObj]);

  const deleteAsset = ()=>{
    if(window.confirm("자산을 정말 삭제 하시겠습니까?")){
      deleteAssetReq(assetId).then( (result) => {
        if(result){
          resetAssetList();
          navigate(`/w/${projectId}/${areaAlias}/step1`);
        }
      });
    }
  };
  
  return (
    <Fragment>
      <Card>
      <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>자산 정보</Typography>} action={ 
        <>
        <Tooltip title="뒤로가기" placement="top" arrow>
          <IconButton sx={{mr:1}} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step1`)}>
            <ArrowBackIcon sx={{ color:'black', fontSize: 40 }}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="자산 편집" placement="top" arrow>
          <IconButton sx={{mr:1}} onClick={()=>navigate(`/a/${projectId}/${areaAlias}/${assetId}/edit`)}>
            <EditIcon sx={{ color:'darkblue', fontSize: 40 }}/>
          </IconButton>
        </Tooltip>

        <Tooltip title="자산 삭제" placement="top" arrow>
          <IconButton sx={{mr:1}} onClick={deleteAsset}>
            <DeleteIcon sx={{ color:'#c80004', fontSize: 40 }}/>
          </IconButton>
        </Tooltip>
        </> 
      }/>
        <CardContent>
        <AssetInfoTable action={'detail'} areaAlias={areaAlias} assetState={assetState}/>
        </CardContent>
      </Card>
    </Fragment>
  );
}

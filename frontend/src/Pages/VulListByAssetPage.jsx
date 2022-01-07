import { Fragment, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import AssetInfoTable from '../Components/AssetInfoTable';
import VulListTable from '../Components/VulListTable';
import { Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import { useVulListByAssetContext } from '../Context/AppContext';

export default function VulListByAssetPage(){  
  const { projectId, areaAlias, assetId } = useParams();
  const { assetObj, vulListByAsset } = useVulListByAssetContext(assetId);

  const { ASSET_INIT_STATE } = global.config
  const [ assetState, setAssetState ] = useState(ASSET_INIT_STATE);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(assetObj.id) setAssetState(assetObj);
  },[assetObj]);
  
  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>자산 정보</Typography>} action={ 
          <>
          <Tooltip title="일괄 등록" placement="top" arrow>
              <IconButton sx={{mr:2}} onClick={()=> navigate(`/v-a/${projectId}/${areaAlias}/${assetId}/vul-grid`)}>
                <AddRoadIcon sx={{ fontSize: 40 }}/>
              </IconButton>
            </Tooltip>

          <Tooltip title="뒤로가기" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step2`)}>
              <ArrowBackIcon sx={{ color:'black', fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          </> 
        }/>
        <CardContent>
          <AssetInfoTable action={'detail'} areaAlias={areaAlias} assetState={assetState} />
          <VulListTable asseCodeDisplay={false} vulList={vulListByAsset} projectId={projectId} areaAlias={areaAlias}/>
        </CardContent>
      </Card>
    </Fragment>
  );
}
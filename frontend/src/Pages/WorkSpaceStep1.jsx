import { Fragment } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAssetContext } from '../Context/AppContext'
import { Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AssetListTable from '../Components/AssetListTable'


export default function WorkSpaceStep1(){
  const { assetList } = useAssetContext();
  const { projectId, areaAlias } = useParams();

  const navigate = useNavigate()

  const onRowClick = (e) =>{
    const assetid = e.target.parentElement.getAttribute('assetid');
    if(e.target.type !== 'checkbox') navigate(`/a/${projectId}/${areaAlias}/${assetid}`);
  }

  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>Step1</Typography>} action={ 
          <>
          <Tooltip title="자산 등록" placement="top" arrow>
            <IconButton sx={{mr:1}} component={Link} to={`/a/${projectId}/${areaAlias}/create`}>
              <AddIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="일괄 등록" placement="top" arrow>
            <IconButton sx={{mr:2}} component={Link} to={`/w/${projectId}/${areaAlias}/asset-grid`}>
              <AddRoadIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          </> 
        }/>
        <CardContent>
          <AssetListTable onRowClick={onRowClick} assetList={assetList} />
        </CardContent >
      </Card>
    </Fragment>
  );
}
import { Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tooltip, Card, CardHeader, CardContent ,Typography, IconButton } from '@mui/material';
import AddRoadIcon from '@mui/icons-material/AddRoad';

export default function WorkSpaceStep4(){
  const { projectId, areaAlias } = useParams();

  const navigate = useNavigate()

  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>Step4</Typography>} action={ 
          <>
          <Tooltip title="일괄 등록" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/vuls-grid`)}>
              <AddRoadIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          </> 
        }/>
        <CardContent>
        </CardContent>
      </Card>
    </Fragment>
  );
}

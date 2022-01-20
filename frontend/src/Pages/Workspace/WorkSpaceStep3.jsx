import { Fragment, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import VulListTable from 'Components/VulListTable';
import { AppContext } from 'Context/AppContext'

import { Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LinearProgress from '@mui/material/LinearProgress';

export default function WorkSpaceStep3(){
  const { projectId, areaAlias } = useParams();
  const { appContextState } = useContext(AppContext);
  const { vulList, vulListLoading  } = appContextState;
  const navigate = useNavigate()

  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>Step3</Typography>} action={ 
          <>
          { vulListLoading ? null
          :<Tooltip title="일괄 등록" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/vuls-grid`)}>
              <AddRoadIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          }
          </> 
        }/>
        <CardContent>
        { vulListLoading ? <LinearProgress /> : <VulListTable asseCodeDisplay={true} projectId={projectId} areaAlias={areaAlias} vulList={vulList} /> }
        </CardContent >
      </Card>
    </Fragment>
  );
}

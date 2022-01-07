import { Fragment, useContext, useMemo } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { VulsByAreaContext } from '../Context/VulsByAreaContext';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap'
import VulListTable from '../Components/VulListTable';
import VulFilterBar from '../Components/VulFilterBar';
import { Select, MenuItem, Box, TableFooter, Pagination, Tooltip, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Card, CardHeader, CardContent ,Checkbox, Typography, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LinearProgress from '@mui/material/LinearProgress';
import { AppContext } from '../Context/AppContext'

export default function WorkSpaceStep4(){
  const { projectId, areaAlias } = useParams();
  const { appContextState } = useContext(AppContext);
  const { assetList } = appContextState;
  const [ vulResultFilter, setVulResultFilter ] = useState('Y');
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

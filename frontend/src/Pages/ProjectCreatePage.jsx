import { Fragment, useContext, useReducer } from 'react';
import { AppContext } from '../Context/AppContext';
import ProjectInfoTable from '../Components/ProjectInfoTable';
import { Typography, Tooltip, IconButton, Card, CardHeader, CardContent } from '@mui/material';
import {Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { payloadEmptyCheck, createProjectReq } from '../utils';

const stateReducer = (state, action) => {
  console.log(action)
  return { ...state, [action.name]: action.value};
};
export default function ProjectDetailPage(){
  const { appContextDispatch } = useContext(AppContext);
  const { PROJECT_VALID_CHECK_FIELDS, PROJECT_INIT_STATE } = global.config;
  const [ projectState, projectStateDispatch ] = useReducer(stateReducer, PROJECT_INIT_STATE);
  
  const navigate = useNavigate();
  
  const createProject = () => {
    const [validResult, value] = payloadEmptyCheck(projectState, PROJECT_VALID_CHECK_FIELDS);
    if (!validResult) {
      alert(`[${value}] 필드가 비어있습니다!`);
      return false;
    }
    createProjectReq({...projectState, assessors: projectState.assessors.map(e=>e.id)}).then(([result, jsonData]) => {
      if (result) {
        appContextDispatch({ type: 'projectReset' });
        navigate(`/p/`);
      } else {
        console.log(jsonData);
        navigate('/auth');
      }
    });
  };

  return (
    <Fragment>
    <Card>
    <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>프로젝트 생성</Typography>} action={ 
      <>
      <Tooltip title="뒤로가기" placement="top" arrow>
        <IconButton sx={{mr:1}} component={Link} to={`/p`}>
          <ArrowBackIcon sx={{ color:'black', fontSize: 40 }}/>
        </IconButton>
      </Tooltip>
      <Tooltip title="저장" placement="top" arrow>
        <IconButton sx={{mr:1}} onClick={createProject}>
          <SaveIcon sx={{ color:'green', fontSize: 40 }}/>
        </IconButton>
      </Tooltip>
      </> 
    }/>
      <CardContent>
        <ProjectInfoTable action={'create'} projectState={projectState} projectStateDispatch={projectStateDispatch} />
      </CardContent>
    </Card>
    </Fragment>
  );
}
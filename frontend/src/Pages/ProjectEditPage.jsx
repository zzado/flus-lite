import { Fragment, useContext, useReducer, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';
import ProjectInfoTable from '../Components/ProjectInfoTable';
import { Typography, Tooltip, IconButton, Card, CardHeader, CardContent } from '@mui/material';
import {Link, useNavigate, useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { payloadEmptyCheck, editProjectReq } from '../utils';


const stateReducer = (state, action) => {
  if(action.type === 'setProjectObj')
    return { ...state, ...action.value};
  else
    return { ...state, [action.name]: action.value};
};

export default function ProjectEditPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject } = appContextState;
  const { projectId } = useParams();
  const { PROJECT_VALID_CHECK_FIELDS, PROJECT_INIT_STATE } = global.config;
  const [ projectState, projectStateDispatch ] = useReducer(stateReducer, PROJECT_INIT_STATE);

  const navigate = useNavigate();

  const editProject = () => {
    const [validResult, value] = payloadEmptyCheck(projectState, PROJECT_VALID_CHECK_FIELDS);
    if (!validResult) {
      alert(`[${value}] 필드가 비어있습니다!`);
      return false;
    }
    
    editProjectReq({...projectState, assessors: projectState.assessors.map(e=>e.id)}).then(([result, jsonData]) => {
      if (result) {
        appContextDispatch({ type: 'projectReset' });
        navigate(`/p/${projectState.id}/`);
      } else {
        console.log(jsonData);
        navigate('/auth');
      }
    });
  };

  useEffect(() => {
    if(currentProject.name)
      projectStateDispatch({type:'setProjectObj', value: currentProject});
  }, [currentProject]);


  return (
    <Fragment>
    <Card>
      <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>프로젝트 편집</Typography>} action={ 
          <>
          <Tooltip title="뒤로가기" placement="top" arrow>
            <IconButton sx={{mr:1}} component={Link} to={`/p/${projectId}`}>
              <ArrowBackIcon sx={{ color:'black', fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="저장" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={editProject}>
              <SaveIcon sx={{ color:'green', fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          </> 
        }/>
      <CardContent>
        <ProjectInfoTable action='edit' projectState={projectState} projectStateDispatch={projectStateDispatch} />
      </CardContent>
    </Card>
    </Fragment>
  );
}

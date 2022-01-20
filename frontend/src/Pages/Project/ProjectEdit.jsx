import { Fragment, useReducer, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { useProjectContext } from 'Hooks/useProjectContext';
import ProjectInfoTable from 'Components/ProjectInfoTable';
import { payloadEmptyCheck, editProjectReq } from 'utils'

import { Typography, Tooltip, IconButton, Card, CardHeader, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';;


const stateReducer = (state, action) => {
  if(action.type === 'setProjectObj')
    return { ...state, ...action.value};
  else
    return { ...state, [action.name]: action.value};
};

export default function ProjectEdit(){
  const { projectObj, resetProjectList } = useProjectContext();
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
        resetProjectList();
        navigate(`/p/${projectState.id}/`);
      } else {
        console.log(jsonData);
        navigate('/auth');
      }
    });
  };

  useEffect(() => {
    if(projectObj.name)
      projectStateDispatch({type:'setProjectObj', value: projectObj});
  }, [projectObj]);


  return (
    <Fragment>
    <Card>
      <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>프로젝트 편집</Typography>} action={ 
          <>
          <Tooltip title="뒤로가기" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={()=>`/p/${projectId}`}>
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

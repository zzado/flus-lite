import { Fragment, } from 'react';
import { useProjectContext } from 'Hooks/useProjectContext';
import ProjectInfoTable from 'Components/ProjectInfoTable';
import { Typography, Tooltip, IconButton, Card, CardHeader, CardContent } from '@mui/material';
import { useNavigate, useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { deleteProjectReq } from 'utils';

export default function ProjectDetail(){
  const { projectObj, resetProjectList } = useProjectContext();
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const deleteProject = () =>{
    if(window.confirm("프로젝트를 정말 삭제 하시겠습니까?")){
      if(deleteProjectReq(projectId)){
        resetProjectList()
        //appContextDispatch({ type: 'projectReset' });
        navigate('/p/');
      }else{
        navigate('/auth');
      }
    }
  }

  return (
    <Fragment>
    <Card>
      <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>프로젝트 정보</Typography>} action={ 
        <>
        <Tooltip title="뒤로가기" placement="top" arrow>
          <IconButton sx={{mr:1}} onClick={()=>navigate('/p')}>
            <ArrowBackIcon sx={{ color:'black', fontSize: 40 }}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="프로젝트 편집" placement="top" arrow>
          <IconButton sx={{mr:1}} onClick={()=>navigate(`/p/${projectId}/edit`)}>
            <EditIcon sx={{ color:'darkblue', fontSize: 40 }}/>
          </IconButton>
        </Tooltip>

        <Tooltip title="프로젝트 삭제" placement="top" arrow>
          <IconButton sx={{mr:1}} onClick={deleteProject}>
            <DeleteIcon sx={{ color:'#c80004', fontSize: 40 }}/>
          </IconButton>
        </Tooltip>
        </> 
      }/>
      <CardContent>
      <ProjectInfoTable action={'detail'} projectState={projectObj} />
      </CardContent>
    </Card>
    </Fragment>
  );
}

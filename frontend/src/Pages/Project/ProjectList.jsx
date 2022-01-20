import { Fragment, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from 'Context/AppContext';
import { Tooltip, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Card, CardHeader, CardContent ,Checkbox,  IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const TableStyle = styled('div')(
  ({ theme }) => `
  table {
    border: 1px solid rgba(224, 224, 224, 1),
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    text-align: center;
  }
  th {
    background-color: #E7EBF0;
    font-weight : bold
  }
  `,
);
export default function ProjectList(){
  const { appContextState } = useContext(AppContext);
  const { projectList } = appContextState;
  
  const navigate = useNavigate();

  
  //const blackButton = {marginLeft: '5px', float: 'right', backgroundColor:'#1d2124', borderColor: '#171a1d', color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: 'darkgray', color: 'white',}};

  const onRowClick = (e) =>{
    const projectid = e.target.parentElement.getAttribute('projectid');
    if(e.target.type !== 'checkbox') navigate(`/p/${projectid}`);
  }

  const deleteProject = () =>{
    // if(window.confirm("프로젝트를 정말 삭제 하시겠습니까?")){
    //   if(deleteProjectReq(checkedProject)){
    //     appContextDispatch({ type: 'reset' });
    //     navigate.current('/p/');
    //   }else{
    //     navigate.current('/auth');
    //   }
    // }
  }
  
  return (
    <Fragment>
    <Card>
      <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>프로젝트 관리</Typography>} action={ 
        <>
        <Tooltip title="프로젝트 가져오기" placement="top" arrow>
          <IconButton sx={{mr:1}} component={Link} to={`/dashboard`}>
            <FileUploadIcon sx={{ fontSize: 40 }}/>
          </IconButton>
        </Tooltip>

        <Tooltip title="프로젝트 생성" placement="top" arrow>
          <IconButton sx={{mr:2}} component={Link} to={`/p/create`}>
            <AddIcon sx={{ fontSize: 40 }}/>
          </IconButton>
        </Tooltip>

        <Tooltip title="프로젝트 내보내기" placement="top" arrow>
          <IconButton sx={{mr:1}} component={Link} to={`/dashboard`}>
            <FileDownloadIcon sx={{ fontSize: 40 }}/>
          </IconButton>
        </Tooltip>

        <Tooltip title="프로젝트 삭제" placement="top" arrow>
          <IconButton sx={{mr:2}} onClick={deleteProject}>
            <DeleteIcon sx={{ fontSize: 40 }}/>
          </IconButton>
        </Tooltip>
        </> 
      }/>

      <CardContent>
        <TableStyle>
        <TableContainer>
          <Table size='medium'>
            <TableHead>
              <TableRow >
                <TableCell padding="checkbox">
                  <Checkbox color="primary" disabled />
                </TableCell>
                <TableCell component="th" scope="row" >프로젝트명</TableCell>
                <TableCell component="th" scope="row" >평가대상기관</TableCell>
                <TableCell component="th" scope="row" >평가기준</TableCell>
                <TableCell component="th" scope="row" >시작일</TableCell>
                <TableCell component="th" scope="row" >종료일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { projectList.map((projectObj, idx) => (
            <TableRow hover onClick={onRowClick} projectid={projectObj.id} key={projectObj.id}>
              <TableCell padding="checkbox">
                <Checkbox color="primary" value={projectObj.id}/>
              </TableCell>
              <TableCell component="td">{projectObj.name}</TableCell>
              <TableCell component="td">{projectObj.client_company}</TableCell>
              <TableCell component="td">{projectObj.compliance}</TableCell>
              <TableCell component="td">{projectObj.start_date}</TableCell>
              <TableCell component="td">{projectObj.end_date}</TableCell>
            </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
        </TableStyle>
      </CardContent >
    </Card>

    </Fragment>
  );
}

import { Outlet } from 'react-router-dom';
import { Tabs, Tab, Button, Box } from '@mui/material'
import { useParams, useNavigate, useLocation } from 'react-router-dom'


export default function WorkSpaceLayOut(props){
  const { step } = props;
  const { projectId, areaAlias } = useParams();
  const location = useLocation();
  console.log(location)
  const navigate = useNavigate()
  

  return(
    <>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={step}  aria-label="basic tabs example">
        <Tab component={Button} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step1`)} label="자산 관리" />
        <Tab component={Button} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step2`)} label="취약점 관리" />
        <Tab component={Button} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step3`)} label="취약점 목록" />
        <Tab component={Button} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step4`)} label="통계" />
        <Tab component={Button} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step5`)} label="결과서" />
      </Tabs>
    </Box>
    {props.children}
    <Outlet/>
    </>
  );
};
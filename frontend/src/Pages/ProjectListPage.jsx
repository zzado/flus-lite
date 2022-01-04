import { Fragment, useContext } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import { Collapse, List, ListItemIcon, ListItemText, ListSubheader, ListItemButton, Drawer, Divider, Menu, MenuItem, IconButton, CssBaseline, AppBar, Toolbar, Box, Button, Typography, Grid, Container } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


export default function ProjectListPage(){
  const { appContextState } = useContext(AppContext);
  const { projectList } = appContextState;

  const blackButton = {marginLeft: '5px', float: 'right', backgroundColor:'#1d2124', borderColor: '#171a1d', color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: 'darkgray', color: 'white',}};

  const SubMenuBox = () => {
    return (
      <Box sx={{width: '100%', display: 'inline-flex', flexDirection: 'column'}}>
        <Box style={{width: '100%', margin: '5px 0px'}}>
          <Button variant='cotained' component={Link}  to="/p/create/" sx={{...blackButton}}>프로젝트 생성</Button>
        
          <PopupState variant="popover">
            {(popupState) => (
            <>
            <Button variant="contained" sx={{...blackButton}} {...bindTrigger(popupState)}>프로젝트 내보내기/가져오기</Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem component={Link} to={`/dashboard`}>프로젝트 내보내기</MenuItem>
              <MenuItem component={Link} to={`/dashboard`}>프로젝트 가져오기</MenuItem>
            </Menu>
            </>
            )}
          </PopupState>
        </Box>
      </Box>
    )
  };

  return (
    <Fragment>
    <SubMenuBox/>
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <span className="m-0 font-weight-bold search-title">프로젝트 목록</span>
      </div>
      <div className="card-body">
      <Table responsive="md" hover >
        <thead>
        <tr>
            <th></th>
            <th>번호</th>
            <th>프로젝트명</th>
            <th>평가대상기관</th>
            <th>평가기준</th>
            <th>시작일</th>
            <th>종료일</th>
        </tr>
        </thead>
        <tbody>
        { projectList.map((projectObj, idx) => (
        <tr key={idx}>
          <td><input type="checkbox"/></td>
          <td>{idx+1}</td>
          <td><Link to={`/p/${projectObj.id}`} key={idx}>{projectObj.name}</Link></td>
          <td>{projectObj.client_company}</td>
          <td>{projectObj.compliance}</td>
          <td>{projectObj.start_date}</td>
          <td>{projectObj.end_date}</td>
        </tr>
        ))}
        </tbody>
      </Table>
      </div>
    </div>

    </Fragment>
  );
}

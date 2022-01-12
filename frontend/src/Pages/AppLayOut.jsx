import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { Outlet } from 'react-router-dom';

import { Collapse, List, ListItemIcon, ListItemText, ListSubheader, ListItemButton, Drawer, Divider, Button, Menu, MenuItem, IconButton, CssBaseline, AppBar, Toolbar, Box, Typography, Grid, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ConstructionIcon from '@mui/icons-material/Construction';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';

export default function AppLayOut() {
  const { appContextState } = useContext(AppContext);
  const { currentProject, projectList, currentArea, currentUser } = appContextState;
  const { AREA_RNAME } = global.config;
  const [ areaListopen, setAreaListopen ] = useState(true)
  const [ toolsOpen, setToolsOpen ] = useState(false)
  const [ documentOpen, setDocumentOpen ] = useState(false)

  console.log(currentUser)
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const projectSelectButtonStyle = currentProject.name ? {backgroundColor:'#fbc22c', fontWeight:'bold', color:'black', border: '0.5px solid #fbc22c', '&:hover': { backgroundColor: '#fbc22c',
  color: 'black',},} : {backgroundColor:'white', fontWeight:'bold', color:'black', border: '2px solid #000000', '&:hover': { backgroundColor: 'white',
  color: 'black',},};

  const areaSelectButtonStyle = currentArea ? {backgroundColor:'#fbc22c', fontWeight:'bold', color:'black', border: 'px solid #fbc22c', '&:hover': { backgroundColor: '#fbc22c',
  color: 'black',},} : {backgroundColor:'white', fontWeight:'bold', color:'black', border: '2px solid #000000', '&:hover': { backgroundColor: 'white',
  color: 'black',},};

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' sx={{ background:'white', }}>
        <Toolbar variant='dense' >
          <Grid container spacing={3} >
            <Grid item sx={{width: '210px', paddingLeft:'0px',}}>
              <Box/>
            </Grid>
            <Grid item>
              <PopupState variant="popover">
                {(popupState) => (
                <> 
                  <Button  variant="cotained" sx={{...projectSelectButtonStyle}} {...bindTrigger(popupState)}>{currentProject.name || '프로젝트 선택 (클릭하세요)'}</Button>
                  <Menu {...bindMenu(popupState)}>
                  {projectList && projectList.map((projectObj,idx)=>
                    <MenuItem key={idx} onClick={popupState.close} component={Link} to={`/p/${projectObj.id}`}>{projectObj.name}</MenuItem>
                  )}
                  </Menu>
                </>
                )}
              </PopupState>
            </Grid>
            <Grid item>
            { currentProject.area ?   
              <PopupState variant="popover">
                {(popupState) => (
                <>
                  <Button variant="contained" sx={{...areaSelectButtonStyle}} {...bindTrigger(popupState)}>{currentArea || '분야 선택 (클릭하세요)'}</Button>
                  <Menu {...bindMenu(popupState)}>
                  {currentProject.area && currentProject.area.map((areaAlias,idx)=>
                    <MenuItem key={idx} onClick={popupState.close} component={Link} to={`/w/${currentProject.id}/${areaAlias.split('-').pop()}/step1`}>{AREA_RNAME[areaAlias.split('-').pop()]}</MenuItem>
                  )}
                  </Menu>
                </>
                )}
              </PopupState>
            :null}
            </Grid>
            
          </Grid>
          <Grid container spacing={2} justifyContent={'flex-end'}>
            <Grid item>
              <IconButton color="inherit" size="small"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  >
                <AccountCircleIcon sx={{ color:'black', fontSize: 40 }}/>
              </IconButton>
              <Menu
                  id="menu-appbar"
                  sx={{ mt: '45px' }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled onClick={handleClose}>{currentUser.username}</MenuItem>
                  <MenuItem disabled onClick={handleClose}>{currentUser.is_admin ? '관리자' : currentUser.is_manager ? '프로젝트 관리자' : '일반 사용자'}</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
            </Grid>
            
          </Grid>
        </Toolbar>
      </AppBar>
      
      <Drawer variant="permanent" sx={{ width: 220, [`& .MuiDrawer-paper`]: { background:'linear-gradient(180deg, #000000 10%, #555555 100%)', color: 'white', width: 220, boxSizing: 'border-box', border: '0px' }, }} >
        
        <Box sx={{ height: '80px', background: 'linear-gradient( to right, #ec6815, #f8a428 )'}}>
          <Typography variant='h4' align='center' >
            FLUS
          </Typography>
        </Box>
        <List dense={false} subheader={
          <ListSubheader sx={{backgroundColor: 'transparent',color:'gray', fontWeight:'bold'}}>
            평가 현황 및 수행
          </ListSubheader>
        }>
          <ListItemButton component={Link} to={'/dashboard'} sx={{color: 'white', '&:hover': {color: 'white',},}}>
            <ListItemIcon sx={{color: 'white'}}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='DashBoard' />
          </ListItemButton>
          
          <ListItemButton component={Link} to={'/p'} sx={{color: 'white', '&:hover': {color: 'white',},}}>
            <ListItemIcon sx={{color: 'white'}} >
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary='프로젝트 관리' />
          </ListItemButton>
          
          {currentProject.name ? 
          <ListItemButton onClick={()=>setAreaListopen(!areaListopen)}>
            <ListItemIcon sx={{color: 'white'}} >
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="평가수행" />
            {areaListopen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          : null }

          <Collapse in={areaListopen} timeout="auto" unmountOnExit>
            <List dense={true} disablePadding component='div' sx={{marginLeft: '20px',width:'180px', backgroundColor:'white', borderRadius: '0.5rem'}}>
              {currentProject.area && currentProject.area.map((areaAlias,idx)=>
              <ListItemButton key={idx} sx={{ pl: 2 }} component={Link} to={`/w/${currentProject.id}/${areaAlias.split('-').pop()}/step1`}>
                <ListItemText sx={{color: 'black'}} primary={AREA_RNAME[areaAlias.split('-').pop()]} />
              </ListItemButton>
              )}
            </List>
          </Collapse>
        </List>

        <Divider />

        <List dense={false} subheader={
          <ListSubheader sx={{backgroundColor: 'transparent',color:'gray', fontWeight:'bold'}}>
            통계 및 결과서
          </ListSubheader>
        }>
          <ListItemButton component={Link} to={'/dashboard'} sx={{color: 'white', '&:hover': {color: 'white',},}}>
            <ListItemIcon sx={{color: 'white'}}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='프로젝트 통계' />
          </ListItemButton>
          
          <ListItemButton component={Link} to={'/p'} sx={{color: 'white', '&:hover': {color: 'white',},}}>
            <ListItemIcon sx={{color: 'white'}} >
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary='프로젝트 결과서' />
          </ListItemButton>
        </List>

        <Divider />

        <List dense={false} subheader={
          <ListSubheader sx={{backgroundColor: 'transparent',color:'gray', fontWeight:'bold'}}>
            도구 및 양식 다운로드
          </ListSubheader>
        }>
          <ListItemButton onClick={()=>setToolsOpen(!toolsOpen)}>
            <ListItemIcon sx={{color: 'white'}} >
              <ConstructionIcon />
            </ListItemIcon>
            <ListItemText primary="평가 도구" />
            {toolsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={toolsOpen} timeout="auto" unmountOnExit>
            <List dense={true} disablePadding component='div' sx={{marginLeft: '20px',width:'180px', backgroundColor:'white', borderRadius: '0.5rem'}}>

              <ListItemButton sx={{ pl: 2 }} component={Link} to={''}>
                <ListItemText sx={{color: 'black'}} primary='서버 점검 스크립트' />
              </ListItemButton>

              <ListItemButton sx={{ pl: 2 }} component={Link} to={''}>
                <ListItemText sx={{color: 'black'}} primary='DB 점검 스크립트' />
              </ListItemButton>

              <ListItemButton sx={{ pl: 2 }} component={Link} to={''}>
                <ListItemText sx={{color: 'black'}} primary='단말기 점검 스크립트' />
              </ListItemButton>

              <ListItemButton sx={{ pl: 2 }} component={Link} to={''}>
                <ListItemText sx={{color: 'black'}} primary='비조치 의견서 모음' />
              </ListItemButton>

              <ListItemButton sx={{ pl: 2 }} component={Link} to={''}>
                <ListItemText sx={{color: 'black'}} primary='취약점 평가 기준' />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={()=>setDocumentOpen(!documentOpen)}>
            <ListItemIcon sx={{color: 'white'}} >
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="문서 양식" />
            {documentOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Collapse in={documentOpen} timeout="auto" unmountOnExit>
            <List dense={true} disablePadding component='div' sx={{marginLeft: '20px',width:'180px', backgroundColor:'white', borderRadius: '0.5rem'}}>

              <ListItemButton sx={{ pl: 2 }} component={Link} to={''}>
                <ListItemText sx={{color: 'black'}} primary='통계 그래프' />
              </ListItemButton>

              <ListItemButton sx={{ pl: 2 }} component={Link} to={''}>
                <ListItemText sx={{color: 'black'}} primary='회의록/결과서' />
              </ListItemButton>

              <ListItemButton sx={{ pl: 2 }} component={Link} to={''}>
                <ListItemText sx={{color: 'black'}} primary='금감원 결과 보고서' />
              </ListItemButton>

            </List>
          </Collapse>

        </List>

      </Drawer>

      
      <Container sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            height: '100vh',
          }} maxWidth={false}>
        <Toolbar sx={{paddingBottom:'100px'}}/>
        <Outlet/>
      </Container>
    </Box>
  );
}

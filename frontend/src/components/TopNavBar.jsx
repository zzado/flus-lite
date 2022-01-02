import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Button from '@mui/material/Button';

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TopNavBar(props) {
  const { appContextState } = useContext(AppContext);
  const { currentProject, projectList, currentArea, currentUser } = appContextState;
  const { AREA_RNAME } = global.config;
  const { open, toggleDrawer } = props;

  return (
    <AppBar position="absolute" open={open} >
      <Toolbar variant="dense" sx={{pr: '24px'}}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{ marginRight: '36px', ...(open && { display: 'none' }),}}>
          <MenuIcon />
        </IconButton>
        
    
        <PopupState variant="popover" >
        {(popupState) => (
        <>
          <Button variant="contained" {...bindTrigger(popupState)}>{currentProject.name || '프로젝트 선택 (클릭하세요)'}</Button>
          <Menu {...bindMenu(popupState)}>
          {projectList && projectList.map((projectObj,idx)=>
            <MenuItem key={idx} onClick={popupState.close} component={Link} to={`/p/${projectObj.id}`}>{projectObj.name}</MenuItem>
          )}
          </Menu>
        </>
        )}
        </PopupState>

        <PopupState variant="popover">
        {(popupState) => (
        <>
          <Button variant="contained" {...bindTrigger(popupState)}>{currentArea || '분야 선택 (클릭하세요)'}</Button>
          <Menu {...bindMenu(popupState)}>
          {currentProject.area && currentProject.area.map((areaAlias,idx)=>
            <MenuItem key={idx} onClick={popupState.close} component={Link} to={`/w/${currentProject.id}/${areaAlias.split('-').pop()}/step1`}>{AREA_RNAME[areaAlias.split('-').pop()]}</MenuItem>
          )}
          </Menu>
        </>
        )}
        </PopupState>
        
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

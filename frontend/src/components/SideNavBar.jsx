import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { List, ListItemIcon, ListItemText, ListItemButton} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const drawerWidth = 220;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function DashboardContent(props) {
  const { open, toggleDrawer } = props;

  return (
      
        <Drawer variant="permanent" open={open}>
          <Toolbar variant='dense'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <Divider />

      
          <List dense={true}>
            <ListItemButton component={Link} to={'/dashboard'}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='DashBoard' />
            </ListItemButton>

            <ListItemButton component={Link} to={'/p'}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary='프로젝트 관리' />
            </ListItemButton>
          </List>

          <Divider />
          <List dense={true}>
            <ListItemButton component={Link} to={'/dashboard'}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='DashBoard' />
            </ListItemButton>

            <ListItemButton component={Link} to={'/p'}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary='프로젝트 관리' />
            </ListItemButton>
          </List>
        </Drawer>
  );
}

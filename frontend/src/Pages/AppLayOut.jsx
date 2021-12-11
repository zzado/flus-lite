import SideNavBar from '../Components/SideNavBar';
import TopNavBar from '../Components/TopNavBar';

import { Outlet } from 'react-router-dom';


export default function AppLayOut({children}){
  return(
    <div id="wrapper">
      <SideNavBar/>
      <div id="content-wrapper" className="d-flex flex-column">
        <TopNavBar/>  
        <div>
        <Outlet/>
        </div>
      </div>
    </div>
  );
};
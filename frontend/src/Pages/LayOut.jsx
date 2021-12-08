import SideNavBar from '../Components/SideNavBar';
import TopNavBar from '../Components/TopNavBar';

import { Outlet } from 'react-router-dom';

export const LayOutContext = {};
  export default function LayOut({children}){
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
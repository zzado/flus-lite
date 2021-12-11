import SideNavBar from '../Components/SideNavBar';
import TopNavBar from '../Components/TopNavBar';

import { Outlet } from 'react-router-dom';


export default function AnalysisPageLayOut({children}){
  return(
    <div className="container-fluid" style={{width: '95%'}}>
      <Outlet/>
    </div>
  );
};
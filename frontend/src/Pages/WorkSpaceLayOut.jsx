import  AnalysisStepNavBar from '../Components/AnalysisStepNavBar';

import { Outlet } from 'react-router-dom';


export default function WorkSpaceLayOut({children}){
  return(
    <div className="container-fluid" style={{width: '95%'}}>
      <AnalysisStepNavBar step={1}/>
      <Outlet/>
    </div>
  );
};
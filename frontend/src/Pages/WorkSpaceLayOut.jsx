import  AnalysisStepNavBar from '../Components/AnalysisStepNavBar';

import { Outlet } from 'react-router-dom';


export default function WorkSpaceLayOut(props){
  const { step } = props;
  return(
    <div className="container-fluid" style={{width: '95%'}}>
      <AnalysisStepNavBar step={step}/>
      {props.children}
      <Outlet/>
    </div>
  );
};
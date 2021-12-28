import { Button } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';

export default function AnalysisStepNavBar(props){
    const { step } = props;
    const { projectId, areaAlias } = useParams();

    return (
      <div style={{float: 'left', width: '100%'}}>
        <ul className="nav nav-tabs">
          <li className="menu-tabs"><Button as={Link} to={`/w/${projectId}/${areaAlias}/step1`} style={ step === 1 || step === 2? {backgroundColor:'#007bff', color: 'white'} : {} } className="menu-tabs-button" ><span className="badge badge-sm">1</span> 자산 등록 <span className="badge badge-sm">2</span> 자산별 취약점 등록</Button></li>
          
          <li className="menu-tabs"><Button as={Link} to={`/w/${projectId}/${areaAlias}/step3`} style={ step === 3? {backgroundColor:'#007bff', color: 'white'} : {} } className="menu-tabs-button"><span className="badge badge-sm">3</span> 분야별 취약점 등록</Button></li>

          <li className="menu-tabs"><Button as={Link} to={`/w/${projectId}/${areaAlias}/step4`} style={ step === 4? {backgroundColor:'#007bff', color: 'white'} : {} } className="menu-tabs-button"><span className="badge badge-sm">4</span> 분야별 통계</Button></li>
          <li className="menu-tabs"><Button as={Link} to={`/w/${projectId}/${areaAlias}/step5`} style={ step === 5? {backgroundColor:'#007bff', color: 'white'} : {} } className="menu-tabs-button"><span className="badge badge-sm">5</span> 결과서</Button></li>

        </ul>
      </div>
    );
  };
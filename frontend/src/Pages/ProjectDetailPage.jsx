import { useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import { deleteProjectReq } from '../utils';
import ProjectInfoTable from '../Components/ProjectInfoTable';

export default function ProjectDetailPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { projectList, currentProject, currentArea} = appContextState;
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const projectName = () => currentProject.name || '';
  const projectCategory = () => currentProject.category || '';
  const projectCompliance = () => currentProject.compliance || '';
  const projectStartDate = () => currentProject.start_date || '';
  const projectClient = () => currentProject.client_company || '';
  const projectEndDate = () => currentProject.end_date || '';
  const projectAgency = () => currentProject.assessment_company || '';
  const projectNote = () => currentProject.note || '';
  const projectAreaList = () => currentProject.area && currentProject.area.map((areaAlias, idx) => (<span key={idx} style={{fontSize:"1rem"}}> <Badge as={Link} to={`/p/${projectId}/${areaAlias.split('-').pop()}`} key={idx} style={{textDecoration:"none"}}> {global.config.AREA_RNAME[areaAlias.split('-').pop()]} </Badge> </span>));
  const projectAssessors = () => currentProject.assessors && currentProject.assessors.map((e=>`${e}, `)) || '';


  // currentProject value set when URL direct access w
  useEffect(() => {
    if( projectList.length ) appContextDispatch({ type: 'setProject', value: projectId });
    if( currentArea.length ) appContextDispatch({ type: 'unSetArea'});
  },[projectList, projectId]);

  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">프로젝트 상세</span>
        </div>
        <div className="card-body">
          <ProjectInfoTable 
            projectName={projectName}
            projectCategory={projectCategory}
            projectCompliance={projectCompliance}
            projectAreaList={projectAreaList}
            projectAssessors={projectAssessors}
            projectStartDate={projectStartDate}
            projectClient={projectClient}
            projectEndDate={projectEndDate}
            projectAgency={projectAgency}
            projectNote={projectNote}
          />
          <div className="form-actions">
            <Button size="sm" as={Link} to={`/p/${projectId}/edit`} style={{marginLeft : '5px'}}>편집</Button>
            <Button size="sm" onClick={()=>{ (window.confirm("프로젝트를 정말 삭제 하시겠습니까?")) ? ((deleteProjectReq(projectId)) ? navigate('/p/') : navigate('/auth')): console.log('deleted cancel'); }}>삭제</Button>;

          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
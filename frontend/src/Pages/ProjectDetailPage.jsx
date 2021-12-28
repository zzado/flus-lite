import { Fragment, useContext, useRef } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import { deleteProjectReq } from '../utils';
import ProjectInfoTable from '../Components/ProjectInfoTable';

export default function ProjectDetailPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject } = appContextState;
  const { projectId } = useParams();
  const navigate = useRef(useNavigate());

  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">프로젝트 상세</span>
        </div>
        <div className="card-body">
          <ProjectInfoTable 
            projectName={currentProject.name || ''}
            projectCategory={currentProject.category || ''}
            projectCompliance={currentProject.compliance || ''}
            projectAreaList={currentProject.start_date || ''}
            projectAssessors={currentProject.assessors && currentProject.assessors.map((e=>`${e.username}, `))}
            projectStartDate={currentProject.start_date || ''}
            projectClient={currentProject.client_company || ''}
            projectEndDate={currentProject.end_date || ''}
            projectAgency={currentProject.assessment_company || ''}
            projectNote={currentProject.note || ''}
          />
          <div className="form-actions">
            <Button size="sm" as={Link} to={`/p/${projectId}/edit`} style={{marginLeft : '5px'}}>편집</Button>
            <Button size="sm" onClick={()=>{ 
              if(window.confirm("프로젝트를 정말 삭제 하시겠습니까?")){
                if(deleteProjectReq(projectId)){
                  appContextDispatch({ type: 'reset' });
                  navigate.current('/p/');
                }else{
                  navigate.current('/auth');
                }
              }
              }}>삭제</Button>

          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
import { useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Table, Button, Badge } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import { deleteProjectReq } from '../utils';

export default function ProjectDetailPage(){
  const {contextState, contextDispatch} = useContext(AppContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if(contextState.projectList.length) contextDispatch({ type: 'setProject', value: params.projectId });
  },[contextState.projectList, params]);

  const ProjectEditButton = () => {
    return (
      <Button size="sm" as={Link} to={`/p/${contextState.currentProject.id}/edit`} style={{marginLeft : '5px'}}>편집</Button>
    );
  }

  const ProjectDeleteButton = () => {
    return (
      <Button size="sm" onClick={()=>{ 
        (window.confirm("프로젝트를 정말 삭제 하시겠습니까?")) ? ((deleteProjectReq(contextState.currentProject.id)) ? navigate('/p/') : navigate('/auth')): console.log('deleted cancel'); }}>삭제</Button>
    );
  }

  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">프로젝트 상세</span>
        </div>
        <div className="card-body">
          <Table responsive="md" bordered>
            <colgroup>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
            </colgroup>
            <thead/>
            <tbody>
              <tr>
                <th colSpan={1}>프로젝트명</th>
                <td colSpan={7}>{contextState.currentProject.name || ''}</td>
                <th colSpan={1}>종합/공개용</th>
                <td colSpan={1}>{contextState.currentProject.category || ''}</td>
              </tr>
              <tr>
                <th colSpan={1}>평가기준</th>
                <td colSpan={2}>{contextState.currentProject.compliance || ''}</td>
                <th colSpan={1}>평가분야</th>
                <td colSpan={6} className="text-left">
                { contextState.currentProject.area && contextState.currentProject.area.map((areaAlias, idx) => (
                  <span key={idx} style={{fontSize:"1rem"}}> <Badge as={Link} to={`/p/${contextState.currentProject.id}/${areaAlias}`} key={idx} style={{textDecoration:"none"}}>{areaAlias}</Badge> </span>
                ))}
                </td>
              </tr>
              <tr>
                <th colSpan={1}>프로젝트 시작일</th>
                <td colSpan={2}>{contextState.currentProject.start_date || ''}</td>
                <th colSpan={1}>평가대상 기관</th>
                <td colSpan={2}>{contextState.currentProject.client_company || ''}</td>
                <th colSpan={1} rowSpan={2}>평가자</th>
                <td colSpan={3} rowSpan={2}>
                  {contextState.currentProject.assessors && contextState.currentProject.assessors.map((e=>`${e}, `)) || ''}
                </td>
              </tr>
              <tr>
                <th colSpan={1}>프로젝트 종료일</th>
                <td colSpan={2}>{contextState.currentProject.end_date || ''}</td>
                <th colSpan={1}>평가 기관</th>
                <td colSpan={2}>{contextState.currentProject.assessment_company || ''}</td>
              </tr>
              <tr>
                
              </tr>              
              <tr>
                <th colSpan={1}>비고</th>
                <td colSpan={9}>{contextState.currentProject.note || ''}</td>
              </tr>
            </tbody>
          </Table>
          <div className="form-actions">
            <ProjectEditButton/>
            <ProjectDeleteButton/>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
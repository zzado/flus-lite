import { useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { LayOutContext } from "../LayOut/layout"
import { Dropdown, DropdownButton, Table, Button } from "react-bootstrap";
import * as utils from '../../utils'

export default function ProjectDetailPage(props){
    const { selectedProject, areaAliasList } = useContext(LayOutContext);
    const navigate = useNavigate();
  
    const deleteProject = async(projectId)=>{
      const URL = `api/project/${projectId}/`;
      const OPTION = {method: 'DELETE'};
      const [result, jsonData] = await utils.APIRequest(URL, OPTION);
      if(result){
        navigate('/p/');
      }else{
        navigate('/auth');
      }
    };
  
    const StepMenuButtonGroup = () => {
      return (
        <div style={{float: 'left', width: '100%'}}>
          <ul className="nav nav-tabs">
            <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">1</span> 자산 등록</Button></li>
            <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">2</span> 취약점 등록</Button></li>
            <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">3</span> 취약점 목록</Button></li>
            <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">4</span> 분야별 통계</Button></li>
            <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">5</span> 결과서</Button></li>
          </ul>
        </div>
      );
    };
  
    const ProjectUpdateButton = () => {
      return (
        <Button size="sm" as={Link} to={`/p/${selectedProject.id}/update`}>편집</Button>
      );
    }
  
    const ProjectDeleteButton = () => {
      return (
        <Button size="sm" onClick={()=>{ if(window.confirm("프로젝트를 정말 삭제 하시겠습니까?")) deleteProject(selectedProject.id); }}>삭제</Button>
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
              <tbody>
                <tr>
                  <th>프로젝트명</th>
                  <td colSpan={2}>{selectedProject.name}</td>
                  <th>평가대상기관</th>
                  <td colSpan={2}>{selectedProject.client_company}</td>
                </tr>
                <tr>
                  <th width="12.5%">시작일</th>
                  <td width="15%">{selectedProject.start_date}</td>
                  <th width="12.5%">종료일</th>
                  <td width="15%">{selectedProject.end_date}</td>
                  <th width="12.5%">종합/공개용</th>
                  <td width="10%">{selectedProject.category}</td>
                </tr>
                <tr>
                  <th>평가기준</th>
                  <td colSpan={5}>{selectedProject.compliance}</td>
                </tr>
                <tr>
                  <th>평가분야</th>
                  <td colSpan={5} className="text-left">
                  { areaAliasList && areaAliasList.map((areaAlias, idx) => (
                    <Link to={`/p/${selectedProject.id}/${areaAlias}`} key={idx} className="badge badge-sm" style={{backgroundColor: '#50A275', color: '#FFF', fontWeight: 'bold'}}>{areaAlias}</Link>
                  ))}
                  </td>
                </tr>
                <tr>
                  <th>평가자</th>
                  <td colSpan={5}>등록안됨</td>
                </tr>
                <tr>
                  <th>비고</th>
                  <td colSpan={5} />
                </tr>
              </tbody>
            </Table>
  
            <div className="form-actions">
                <ProjectUpdateButton/>
                <ProjectDeleteButton/>
            </div>
          </div>
        </div>
      </div>
      </Fragment>
    );
}
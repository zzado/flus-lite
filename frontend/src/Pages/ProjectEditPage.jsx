import { useEffect, Fragment, useContext, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import Select from 'react-select';
import { getUserListReq, editProjectReq } from '../utils'
import '../config';

export default function ProjectEditPage(){
  const { contextState, contextDispatch } = useContext(AppContext);
  const [ areaAliasList, setAreaAliasList ] = useState([]);
  const [ allUserList, setAllUserList ] = useState([]);
  const [ projectUserList, setProjectUserList ] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  
  // currentProject value set when URL direct access
  useEffect(() => {
    if(contextState.projectList.length && Object.keys(contextState.currentProject).length === 0) contextDispatch({ type: 'setProject', value: params.projectId });
  },[contextState.projectList, params]);
  
  // areaAliasList, allUserList value set
  useEffect(() => {
    if(Object.keys(contextState.currentProject).length !== 0){
      setAreaAliasList( contextState.currentProject.area.map( (e) => { const areaName = e.split('-').pop(); return {value: areaName, label: global.config.AREA_RNAME[areaName]}}));
      getUserListReq().then( ([result, jsonData]) => {
        (result) ? setAllUserList(jsonData.map( (e) => { return {value: e.id, label: e.username}; })) : navigate('/auth');
      });
    }
  },[contextState.currentProject]);

  // projectUserList value set
  useEffect(() => {
    if(allUserList.length !== 0)
      setProjectUserList(contextState.currentProject.assessors.map( (e) => allUserList.find( (e2) => e2.value === e )));
  },[allUserList]);

  const editProject = () => {
    const payload = {
      "id": contextState.currentProject.id,
      "name": document.getElementById('projectNameEID').value,
      "category": contextState.currentProject.category,
      "start_date": document.getElementById('projectStartDateEID').value,
      "end_date": document.getElementById('projectEndDateEID').value,
      "client_company": document.getElementById('projectClientEID').value,
      "assessment_company": document.getElementById('projectAgencyEID').value,
      "note": document.getElementById('projectNoteEID').value,
      "compliance": contextState.currentProject.compliance,
      "area": areaAliasList.map( (e) => `${contextState.currentProject.compliance}-${e.value}`),
      "assessors": projectUserList.map( (e) => e.value)
    };
    editProjectReq(payload).then( ([result, jsonData]) => {
      (result) ? navigate(`/p/${contextState.currentProject.id}`) : navigate('/auth');
    });
  };

  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">프로젝트 상세</span>
        </div>
        <div className="card-body">
          <Table id="projectInfoTable" responsive="md" bordered>
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
                <td colSpan={6}><input id="projectNameEID" defaultValue={contextState.currentProject.name || ''} type="text" style={{width:'100%'}}/></td>
                <th colSpan={1}>종합/공개용</th>
                <td colSpan={2}>{contextState.currentProject.category || ''}</td>
              </tr>
              <tr>
                <th colSpan={1}>평가기준</th>
                <td colSpan={2}>{contextState.currentProject.compliance || ''}</td>
                
                <th colSpan={1}>평가분야</th>
                <td colSpan={6}>
                  <Select isMulti closeMenuOnSelect={false} hideSelectedOptions={false} 
                    onChange={e=>setAreaAliasList(e)} value={ areaAliasList }
                    options={ (contextState.currentProject.category === '공개용') ? global.config.OPEN_PROJECT_AREALIST: global.config.EFI_PROJECT_AREALIST} />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>프로젝트 시작일</th>
                <td colSpan={2}><input id="projectStartDateEID" type="date" style={{width:'100%'}} defaultValue={contextState.currentProject.start_date || ''}/></td>
                <th colSpan={1}>평가대상 기관</th>
                <td colSpan={2}><input id="projectClientEID" defaultValue={contextState.currentProject.client_company || ''} type="text" style={{width:'100%'}}/></td>
                <th colSpan={1} rowSpan={2}>평가자</th>
                <td colSpan={3} rowSpan={2}>
                  <Select isMulti closeMenuOnSelect={false} hideSelectedOptions={false} 
                  onChange={e=>setProjectUserList(e)} value={ projectUserList }
                  options={ allUserList }/>
                </td>
              </tr>
              <tr>
                <th colSpan={1}>프로젝트 종료일</th>
                <td colSpan={2}><input id="projectEndDateEID" type="date" style={{width:'100%'}} defaultValue={contextState.currentProject.end_date || ''}/></td>
                <th colSpan={1}>평가 기관</th>
                <td colSpan={2}><input id="projectAgencyEID" defaultValue={contextState.currentProject.assessment_company || ''} type="text" style={{width:'100%'}}/></td>
              </tr>            
              <tr>
                <th colSpan={1}>비고</th>
                <td colSpan={9}><textarea id="projectNoteEID" defaultValue={contextState.currentProject.note || ''} style={{width:'100%'}}/></td>
              </tr>
            </tbody>
          </Table>
          <div className="form-actions">
            <Button size="sm" onClick={editProject} style={{marginLeft : '5px'}}>저장</Button>
            <Button as={Link} to={`/p/${contextState.currentProject.id}`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
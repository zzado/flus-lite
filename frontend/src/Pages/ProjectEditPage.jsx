import { useEffect, Fragment, useContext, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import Select from 'react-select';
import { getUserListReq, editProjectReq, payloadEmptyCheck } from '../utils'
import ProjectInfoTable from '../Components/ProjectInfoTable'

export default function ProjectEditPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { projectList, currentProject} = appContextState;
  const [ projectUserList, setProjectUserList ] = useState([]);
  const [ areaAliasList, setAreaAliasList ] = useState([]);
  const [ allUserList, setAllUserList ] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // currentProject value set when URL direct access
  useEffect(() => {
    if(projectList.length && Object.keys(currentProject).length === 0) appContextDispatch({ type: 'setProject', value: projectId });
  },[projectList, projectId]);
  
  // areaAliasList, allUserList value set
  useEffect(() => {
    if(Object.keys(currentProject).length !== 0){
      setAreaAliasList( currentProject.area.map( (e) => { const areaName = e.split('-').pop(); return {value: areaName, label: global.config.AREA_RNAME[areaName]}}));
      getUserListReq().then( ([result, jsonData]) => {
        (result) ? setAllUserList(jsonData.map( (e) => { return {value: e.id, label: e.username}; })) : navigate('/auth');
      });
    }
  },[currentProject]);

  // projectUserList value set
  useEffect(() => {
    if(allUserList.length !== 0)
      setProjectUserList(currentProject.assessors.map( (e) => allUserList.find( (e2) => e2.value === e )));
  },[allUserList]);

  const projectNameForm = () => <input id="projectNameEID" defaultValue={currentProject.name || ''} type="text" style={{width:'100%'}}/>;
  const projectCategoryForm = () => currentProject.category || '';
  const projectComplianceForm = () => currentProject.compliance || '';
  const projectStartDateForm = () => <input id="projectStartDateEID" type="date" style={{width:'100%'}} defaultValue={currentProject.start_date || ''}/>;
  const projectClientForm = () => <input id="projectClientEID" defaultValue={currentProject.client_company || ''} type="text" style={{width:'100%'}}/>;
  const projectEndDateForm = () => <input id="projectEndDateEID" type="date" style={{width:'100%'}} defaultValue={currentProject.end_date || ''}/>;
  const projectAgencyForm = () => <input id="projectAgencyEID" defaultValue={currentProject.assessment_company || ''} type="text" style={{width:'100%'}}/>;
  const projectNoteForm = () => <textarea id="projectNoteEID" defaultValue={currentProject.note || ''} style={{width:'100%', height:'80px'}}/>;
  const projectAreaListForm = () => <Select isMulti closeMenuOnSelect={false} hideSelectedOptions={false} onChange={e=>setAreaAliasList(e)} value={ areaAliasList } options={ (currentProject.category === '공개용') ? global.config.OPEN_PROJECT_AREALIST: global.config.EFI_PROJECT_AREALIST} />;
  const projectAssessorsForm = () => <Select isMulti closeMenuOnSelect={false} hideSelectedOptions={false} onChange={e=>setProjectUserList(e)} value={ projectUserList } options={ allUserList }/>;
  
  const editProject = () => {
    const payload = {
      "id": projectId,
      "name": document.getElementById('projectNameEID').value,
      "category": currentProject.category,
      "start_date": document.getElementById('projectStartDateEID').value,
      "end_date": document.getElementById('projectEndDateEID').value,
      "client_company": document.getElementById('projectClientEID').value,
      "assessment_company": document.getElementById('projectAgencyEID').value,
      "note": document.getElementById('projectNoteEID').value,
      "compliance": currentProject.compliance,
      "area": areaAliasList.map( (e) => `${currentProject.compliance}-${e.value}`),
      "assessors": projectUserList.map( (e) => e.value)
    };

    const [validResult, value] = payloadEmptyCheck(payload, global.config.PROJECT_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    editProjectReq(payload).then( ([result, jsonData]) => {
      if(result){ projectList.push(jsonData); navigate(`/p/${projectId}/`); }else{ navigate('/auth');}
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
          <ProjectInfoTable 
            projectName={projectNameForm}
            projectCategory={projectCategoryForm}
            projectCompliance={projectComplianceForm}
            projectAreaList={projectAreaListForm}
            projectAssessors={projectAssessorsForm}
            projectStartDate={projectStartDateForm}
            projectClient={projectClientForm}
            projectEndDate={projectEndDateForm}
            projectAgency={projectAgencyForm}
            projectNote={projectNoteForm}
          />
          <div className="form-actions">
            <Button size="sm" onClick={editProject} style={{marginLeft : '5px'}}>저장</Button>
            <Button as={Link} to={`/p/${projectId}`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
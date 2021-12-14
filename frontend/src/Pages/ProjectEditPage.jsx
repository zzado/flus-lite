import { useEffect, Fragment, useContext, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import Select from 'react-select';
import { getUserListReq, editProjectReq, payloadEmptyCheck } from '../utils'
import ProjectInfoTable from '../Components/ProjectInfoTable'

export default function ProjectEditPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { projectList, currentProject, currentArea } = appContextState;
  const [ projectUserList, setProjectUserList ] = useState([]);
  const [ areaAliasList, setAreaAliasList ] = useState([]);
  const [ allUserList, setAllUserList ] = useState([]);
  const { projectId } = useParams();
  
  const projectNameRef = useRef(null);
  const projectStartDateRef = useRef(null);
  const projectClientRef = useRef(null);
  const projectEndDateRef = useRef(null);
  const projectAgencyRef = useRef(null);
  const projectNoteRef = useRef(null);


  const navigate = useNavigate();
  
  useEffect(() => {
    if( projectList.length ) appContextDispatch({ type: 'setProject', value: projectId });
    if( currentArea.length ) appContextDispatch({ type: 'unSetArea'});
  },[projectList, projectId]);

  
  // areaAliasList, allUserList value set
  useEffect(() => {
    if(Object.keys(currentProject).length){
      setAreaAliasList( currentProject.area.map( (e) => { const areaName = e.split('-').pop(); return {value: areaName, label: global.config.AREA_RNAME[areaName]}}));
      getUserListReq().then( ([result, jsonData]) => {
        (result) ? setAllUserList(jsonData.map( (e) => { return {value: e.id, label: e.username}; })) : navigate('/auth');
      });
    }
  },[currentProject]);

  // projectUserList value set
  useEffect(() => {
    if(allUserList.length)
      setProjectUserList(currentProject.assessors.map( (e) => allUserList.find( (e2) => e2.value === e )));
  },[allUserList]);


  const projectNameForm = () => <input ref={projectNameRef} defaultValue={currentProject.name || ''} type="text" style={{width:'100%'}}/>;
  const projectCategoryForm = () => currentProject.category || '';
  const projectComplianceForm = () => currentProject.compliance || '';
  const projectStartDateForm = () => <input ref={projectStartDateRef} type="date" style={{width:'100%'}} defaultValue={currentProject.start_date || ''}/>;
  const projectClientForm = () => <input ref={projectClientRef} defaultValue={currentProject.client_company || ''} type="text" style={{width:'100%'}}/>;
  const projectEndDateForm = () => <input ref={projectEndDateRef} type="date" style={{width:'100%'}} defaultValue={currentProject.end_date || ''}/>;
  const projectAgencyForm = () => <input ref={projectAgencyRef} defaultValue={currentProject.assessment_company || ''} type="text" style={{width:'100%'}}/>;
  const projectNoteForm = () => <textarea ref={projectNoteRef} defaultValue={currentProject.note || ''} style={{width:'100%', height:'80px'}}/>;
  const projectAreaListForm = () => <Select isMulti closeMenuOnSelect={false} onChange={e=>setAreaAliasList(e)} value={ areaAliasList } options={ (currentProject.category === '공개용') ? global.config.OPEN_PROJECT_AREALIST: global.config.EFI_PROJECT_AREALIST} />;
  const projectAssessorsForm = () => <Select isMulti closeMenuOnSelect={false} onChange={e=>setProjectUserList(e)} value={ projectUserList } options={ allUserList }/>;
  
  const editProject = () => {
    const payload = {
      id: projectId,
      name: projectNameRef.current.value || '',
      compliance: currentProject.compliance,
      area: areaAliasList.map( (e) => `${currentProject.compliance}-${e.value}`),
      category: currentProject.category,
      start_date: projectStartDateRef.current.value || '',
      end_date: projectEndDateRef.current.value || '',
      client_company: projectClientRef.current.value || '',
      assessment_company: projectAgencyRef.current.value || '',
      note: projectNoteRef.current.value || '',
      assessors: projectUserList.map( (e) => e.value) || []
    };

    const [validResult, value] = payloadEmptyCheck(payload, global.config.PROJECT_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    editProjectReq(payload).then( ([result, jsonData]) => {
      if(result){ appContextDispatch({ type: 'reset' }); navigate(`/p/${projectId}/`); }else{ navigate('/auth');}
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
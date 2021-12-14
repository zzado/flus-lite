import { useEffect, Fragment, useContext, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import Select from 'react-select';
import { getUserListReq, getComplianceListReq, payloadEmptyCheck, createProjectReq } from '../utils'
import ProjectInfoTable from '../Components/ProjectInfoTable'


export default function ProjectCreatePage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { projectList, currentProject} = appContextState;
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // state 
  const [ projectCategory, setProjectCategory ] = useState({});
  const [ projectCompliance, setProjectCompliance ] = useState({});
  const [ projectUserList, setProjectUserList ] = useState([]);
  const [ projectAreaList, setProjectAreaList ] = useState([]);
  const projectNameRef = useRef(null);
  const projectStartDateRef = useRef(null);
  const projectClientRef = useRef(null);
  const projectEndDateRef = useRef(null);
  const projectAgencyRef = useRef(null);
  const projectNoteRef = useRef(null);

  const [ allUserList, setAllUserList ] = useState([]);
  const [ allComplianceList, setAllComplianceList ] = useState([]);

  // areaAliasList, allUserList value set
  useEffect(() => {
    getUserListReq().then( ([result, jsonData]) => {
      (result) ? setAllUserList(jsonData.map( (e) => { return {value: e.id, label: e.username}; })) : navigate('/auth');
    });
    getComplianceListReq().then( ([result, jsonData]) => {
      (result) ? setAllComplianceList(jsonData.map( (e) => { return {value: e.code, label: e.code}; })) : navigate('/auth');
    });
  },[]);

  const projectNameForm = () => <input ref={projectNameRef} type="text" style={{width:'100%'}}/>;
  const projectCategoryForm = () => <Select onChange={e=>setProjectCategory(e)} options={ [ {value:'공개용', label:'공개용'}, {value:'종합', label:'종합'} ]}/>;
  const projectComplianceForm = () => <Select onChange={e=>setProjectCompliance(e)} isDisabled={(Object.keys(projectCategory).length)? false :true} options={ allComplianceList }/>;
  const projectStartDateForm = () => <input ref={projectStartDateRef} type="date" style={{width:'100%'}}/>;
  const projectClientForm = () => <input ref={projectClientRef} style={{width:'100%'}}/>;
  const projectEndDateForm = () => <input ref={projectEndDateRef} type="date" style={{width:'100%'}} />;
  const projectAgencyForm = () => <input ref={projectAgencyRef} style={{width:'100%'}} />;
  const projectNoteForm = () => <textarea ref={projectNoteRef} style={{width:'100%', height:'80px'}}/>;

  const projectAreaListForm = () => <Select isMulti closeMenuOnSelect={false}  onChange={e=>setProjectAreaList(e)} isDisabled={(Object.keys(projectCompliance).length)? false :true} options={ (Object.keys(projectCategory).length)? (projectCategory.value === '공개용') ? global.config.OPEN_PROJECT_AREALIST: global.config.EFI_PROJECT_AREALIST : []} />

  const projectAssessorsForm = () => <Select isMulti closeMenuOnSelect={false} onChange={e=>setProjectUserList(e)} options={ allUserList }/>;
  
  const createProject = () =>{
    const payload = {
      name: projectNameRef.current.value || '',
      compliance: projectCompliance.value || '',
      area: projectAreaList.map( (e) => `${projectCompliance.value}-${e.value}`),
      category: projectCategory.value || '',
      start_date: projectStartDateRef.current.value || '',
      end_date: projectEndDateRef.current.value || '',
      client_company: projectClientRef.current.value || '',
      assessment_company: projectAgencyRef.current.value || '',
      note: projectNoteRef.current.value || '',
      assessors: projectUserList.map( (e) => e.value) || []
    };
    console.log(payload);
    
    const [validResult, value] = payloadEmptyCheck(payload, global.config.PROJECT_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    createProjectReq(payload).then( ([result, jsonData]) => {
      if(result){ appContextDispatch({ type: 'reset' }); navigate(`/p/`); }else{ navigate('/auth');}
    });

  };

  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">프로젝트 생성</span>
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
            <Button size="sm" onClick={createProject} style={{marginLeft : '5px'}}>저장</Button>
            <Button as={Link} to={`/p/${projectId}`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
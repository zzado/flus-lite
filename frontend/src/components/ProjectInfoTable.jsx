import { Fragment, useMemo, useReducer, useEffect, useRef } from 'react';
import { Table, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { getUserListReq, getComplianceListReq, payloadEmptyCheck, createProjectReq, deleteProjectReq, editProjectReq } from '../utils';

import Select from 'react-select';

const stateReducer = (state, action) => {
  if(action.type === 'setProjectObj')
    return { ...state, ...action.value};
  else
    return { ...state, [action.name]: action.value};
};

const initalState = {
  name: '',
  category: '',
  compliance: '',
  area: [],
  assessors: [],
  start_date: '',
  end_date: '',
  client_company: '',
  assessment_company: '',
  note: '',
  allUserList : [],
  allComplianceList : [],
}

export default function ProjectInfoTable(props){
  const { projectObj, action, appContextDispatch } = props;
  const { PROJECT_FIELD, AREA_RNAME, PROJECT_VALID_CHECK_FIELDS } = global.config;
  const [ projectState, projectStateDispatch ] = useReducer(stateReducer, initalState);
  const navigate = useRef(useNavigate());
  
  const projectName = useMemo(()=>
    action === 'detail' ? projectObj.name : 
    action === 'create' ? <input type='text' onChange={e=>projectStateDispatch({name:'name', value:e.target.value})}/> :  
    action === 'edit' ? <input type='text' value={projectState.name} onChange={e=>projectStateDispatch({name:'name', value:e.target.value})}/> : 
    null
  ,[action, projectObj.name, projectState.name]);

  const projectCategory = useMemo(()=>
    action === 'detail' ? projectObj.category : 
    action === 'create' ? <Select onChange={e=>projectStateDispatch({name:'category', value: e.value})} options={PROJECT_FIELD.CATEGORY}/>: 
    action === 'edit' ? projectState.category :
    null
  ,[action, projectObj.category, projectState.category, PROJECT_FIELD.CATEGORY]);

  const projectCompliance = useMemo(()=>
    action === 'detail' ? projectObj.compliance : 
    action === 'create' ? <Select onChange={e=>projectStateDispatch({name:'compliance', value: e.value})} isDisabled={projectState.category.length ? false : true} options={projectState.allComplianceList}/>: 
    action === 'edit' ? projectState.compliance :
    null
  ,[action, projectObj.compliance, projectState.compliance, projectState.allComplianceList, projectState.category]);

  const projectAreaList = useMemo(()=>
    action === 'detail' ? projectObj.area && projectObj.area.map((areaAlias, idx) => (<span key={idx} style={{fontSize:"1rem"}}> <Badge as={Link} to={`/w/${projectObj.id}/${areaAlias.split('-').pop()}/step1`} style={{textDecoration:"none"}}> {AREA_RNAME[areaAlias.split('-').pop()]} </Badge> </span>)): 
    action === 'create' ? <Select onChange={e=>projectStateDispatch({name: 'area', value: e.map(e=>`${projectState.compliance}-${e.value}`)})} isDisabled={projectState.compliance ? false : true} options={projectState.compliance === '공개용' ? PROJECT_FIELD.OPEN_PROJECT_AREALIST : PROJECT_FIELD.EFI_PROJECT_AREALIST} isMulti closeMenuOnSelect={false}/>: 
    action === 'edit' ? <Select value={projectState.area && projectState.area.map(e=>({value: e.split('-').pop(),label: AREA_RNAME[e.split('-').pop()]}))} onChange={e=>projectStateDispatch({name: 'area', value: e.map(e=>`${projectState.compliance}-${e.value}`)})} options={projectState.compliance === '공개용' ? PROJECT_FIELD.OPEN_PROJECT_AREALIST : PROJECT_FIELD.EFI_PROJECT_AREALIST} isMulti closeMenuOnSelect={false}/>: 
    null
  ,[action, projectObj.area, projectState.area, projectObj.id, AREA_RNAME, projectState.compliance, PROJECT_FIELD]);

  const projectAssessors = useMemo(()=>
    action === 'detail' ? projectObj.assessors && projectObj.assessors.map((e, idx) => (<span key={idx} style={{fontSize:"1rem"}}> <Badge key={idx} style={{textDecoration:"none"}}>{e.username}</Badge> </span>)): 
    action === 'create' ? <Select onChange={e=>projectStateDispatch({name: 'assessors', value: e.map(e=>e.value)})} options={projectState.allUserList} isMulti closeMenuOnSelect={false}/>:
    action === 'edit' ? <Select value={projectState.assessors && projectState.assessors.map(e=>({value:e.id, label:e.username}))} onChange={e=>{ projectStateDispatch({name: 'assessors', value: e.map(e=>({id:e.value,username:e.label}))}); console.log(e)}} options={projectState.allUserList} isMulti closeMenuOnSelect={false}/>:
    null
  ,[action, projectObj.assessors, projectState.assessors, projectState.allUserList]);

  const projectStartDate = useMemo(()=>
    action === 'detail' ? projectObj.start_date : 
    action === 'create' ? <input type='date' onChange={e=>projectStateDispatch({name: 'start_date',value: e.target.value})}/>: 
    action === 'edit' ? <input type='date' value={projectState.start_date} onChange={e=>projectStateDispatch({name: 'start_date',value: e.target.value})}/>: 
    null
  ,[action, projectObj.start_date, projectState.start_date ]);

  const projectClient = useMemo(()=>
    action === 'detail' ? projectObj.client_company : 
    action === 'create' ? <input type='text' onChange={e=>projectStateDispatch({name:'client_company', value:e.target.value})}/>: 
    action === 'edit' ? <input type='text' value={projectState.client_company} onChange={e=>projectStateDispatch({name:'client_company', value:e.target.value})}/>: 
    null
  ,[action, projectObj.client_company, projectState.client_company]);

  const projectEndDate = useMemo(()=>
    action === 'detail' ? projectObj.end_date : 
    action === 'create' ? <input type='date' onChange={e=>projectStateDispatch({name: 'end_date',value: e.target.value})}/>: 
    action === 'edit' ? <input type='date' value={projectState.end_date} onChange={e=>projectStateDispatch({name: 'end_date',value: e.target.value})}/>:
    null
  ,[action, projectObj.end_date, projectState.end_date]);
  
  const projectAgency = useMemo(()=>
    action === 'detail' ? projectObj.assessment_company : 
    action === 'create' ? <input type='text' onChange={e=>projectStateDispatch({name:'assessment_company', value:e.target.value})}/>:
    action === 'edit' ? <input type='text' value={projectState.assessment_company} onChange={e=>projectStateDispatch({name:'assessment_company', value:e.target.value})}/>:
    null
  ,[action, projectObj.assessment_company, projectState.assessment_company]);

  const projectNote = useMemo(()=>
    action === 'detail' ? projectObj.note : 
    action === 'create' ? <textarea onChange={e=>projectStateDispatch({name:'note', value:e.target.value})} style={{ width: '100%', height: '80px' }}/> : 
    action === 'edit' ? <textarea value={projectState.note} onChange={e=>projectStateDispatch({name:'note', value:e.target.value})} style={{ width: '100%', height: '80px' }}/> : 
    null
  ,[action, projectObj.note, projectState.note]);

 
  const createProject = () => {
    const [validResult, value] = payloadEmptyCheck(projectState, PROJECT_VALID_CHECK_FIELDS);
    if (!validResult) {
      alert(`[${value}] 필드가 비어있습니다!`);
      return false;
    }
    console.log(projectState);
    createProjectReq(projectState).then(([result, jsonData]) => {
      if (result) {
        appContextDispatch({ type: 'reset' });
        navigate.current(`/p/`);
      } else {
        console.log(jsonData);
        navigate.current('/auth');
      }
    });
  };

  const editProject = () => {
    const [validResult, value] = payloadEmptyCheck(projectState, PROJECT_VALID_CHECK_FIELDS);
    if (!validResult) {
      alert(`[${value}] 필드가 비어있습니다!`);
      return false;
    }
    
    editProjectReq({...projectState, assessors: projectState.assessors.map(e=>e.id)}).then(([result, jsonData]) => {
      if (result) {
        appContextDispatch({ type: 'reset' });
        navigate.current(`/p/${projectState.id}/`);
      } else {
        console.log(jsonData);
        navigate.current('/auth');
      }
    });
  };

  useEffect(() => {
    if(action === 'create' || action === 'edit'){
      getUserListReq().then(([result, jsonData]) => {
        result
          ? projectStateDispatch({
              name: 'allUserList',
              value: jsonData.map((e) => ({ value: e.id, label: e.username })),
            })
          : navigate.current('/auth');
      });
      if(action === 'create'){
        getComplianceListReq().then(([result, jsonData]) => {
          result
            ? projectStateDispatch({
                name: 'allComplianceList',
                value: jsonData.map((e) => ({ value: e.code, label: e.code })),
              })
            : navigate.current('/auth');
        });
      }
    }
  }, [action]);

  
  useEffect(() => {
    if(projectObj !== false){
      projectStateDispatch({type:'setProjectObj', value: projectObj})
    }
  }, [projectObj]);


  return (
    <Fragment>
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
            <td colSpan={6}>{projectName}</td>
            <th colSpan={1}>종합/공개용</th>
            <td colSpan={2}>{projectCategory}</td>
          </tr>
          <tr>
            <th colSpan={1}>평가기준</th>
            <td colSpan={2}>{projectCompliance}</td>
            <th colSpan={1}>평가분야</th>
            <td colSpan={6}>{projectAreaList}</td>
          </tr>
          <tr>
            <th colSpan={1}>프로젝트 시작일</th>
            <td colSpan={2}>{projectStartDate}</td>
            <th colSpan={1}>평가대상 기관</th>
            <td colSpan={2}>{projectClient}</td>
            <th colSpan={1} rowSpan={2}>평가자</th>
            <td colSpan={3} rowSpan={2}>{projectAssessors}</td>
          </tr>
          <tr>
            <th colSpan={1}>프로젝트 종료일</th>
            <td colSpan={2}>{projectEndDate}</td>
            <th colSpan={1}>평가 기관</th>
            <td colSpan={2}>{projectAgency}</td>
          </tr>            
          <tr>
            <th colSpan={1}>비고</th>
            <td colSpan={9}>{projectNote}</td>
          </tr>
        </tbody>
      </Table>


      <div className="form-actions">
      { action === 'detail' ? 
        <>
        <Button size="sm" as={Link} to={`/p/${projectObj.id}/edit`} style={{marginLeft : '5px'}}>편집</Button>
        <Button size="sm" onClick={()=>{ 
          if(window.confirm("프로젝트를 정말 삭제 하시겠습니까?")){
            if(deleteProjectReq(projectObj.id)){
              appContextDispatch({ type: 'reset' });
              navigate.current('/p/');
            }else{
              navigate.current('/auth');
            }
          }
          }}>삭제</Button>
        </>
      : action === 'create' ? 
        <>
        <Button size='sm' onClick={createProject} style={{ marginLeft: '5px' }}>저장</Button>
        <Button as={Link} to={'/p/'} size='sm' style={{ marginLeft: '5px' }}>뒤로</Button>
        </>
      : action === 'edit'? 
        <>
        <Button size='sm' onClick={editProject} style={{ marginLeft: '5px' }}>저장</Button>
        <Button as={Link} to={`/p/${projectState.id}`} size='sm' style={{ marginLeft: '5px' }}>취소</Button>
        </>
      : null
      }
      </div>


    </Fragment>
  );
}
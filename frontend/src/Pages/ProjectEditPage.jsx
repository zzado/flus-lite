import { useEffect,Fragment,useContext,useRef, useMemo, useReducer,} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AppContext } from '../Context/AppContext';
import Select from 'react-select';
import { getUserListReq, editProjectReq, payloadEmptyCheck } from '../utils';
import ProjectInfoTable from '../Components/ProjectInfoTable';

const stateReducer = (state, action) => {
  console.log(action);
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function ProjectEditPage() {
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject } = appContextState;
  const { projectId } = useParams();
  const navigate = useRef(useNavigate());

  const [projectState, projectStateDispatch] = useReducer(stateReducer, {
    projectCategory: {},
    projectCompliance: {},
    projectUserList: [],
    projectAreaList: [],
    allUserList: [],
    allComplianceList: [],
    projectNameRef: useRef(null),
    projectStartDateRef: useRef(null),
    projectEndDateRef: useRef(null),
    projectClientRef: useRef(null),
    projectAgencyRef: useRef(null),
    projectNoteRef: useRef(null),
  });

  const {
    projectUserList,
    projectAreaList,
    allUserList,
    projectNameRef,
    projectStartDateRef,
    projectEndDateRef,
    projectClientRef,
    projectAgencyRef,
    projectNoteRef,
  } = projectState;


  //allUserList value set
  useEffect(() => {
    getUserListReq().then(([result, jsonData]) => {
      result
        ? projectStateDispatch({
            name: 'allUserList',
            value: jsonData.map((e) => ({ value: e.id, label: e.username })),
          })
        : navigate.current('/auth');
    });
  }, []);

  // areaAliasList,
  useEffect(() => {
    if (Object.keys(currentProject).length) {
      projectStateDispatch({
        name: 'projectAreaList',
        value: currentProject.area.map((e) => ({
          value: e.split('-').pop(),
          label: global.config.AREA_RNAME[e.split('-').pop()],
        })),
      });
    }
  }, [currentProject]);

  // projectUserList value set
  useEffect(() => {
    if (allUserList.length && Object.keys(currentProject).length)
      projectStateDispatch({
        name: 'projectUserList',
        value: currentProject.assessors.map((e) =>
          allUserList.find((e2) => e2.value === e)
        ),
      });
  }, [allUserList, currentProject]);

  //const projectNameForm = useCallback( () => { console.log('zz'); return (<input ref={projectNameRef} defaultValue={currentProject.name || ''} type="text" style={{width:'100%'}}/>)}, []);

  const projectNameForm = useMemo(() => (<input ref={projectNameRef} defaultValue={currentProject.name || ''} type='text' style={{ width: '100%' }}/>), [currentProject, projectNameRef]);

  const projectCategoryForm = useMemo(
    () => currentProject.category || '',
    [currentProject]
  );
  const projectComplianceForm = useMemo(
    () => currentProject.compliance || '',
    [currentProject]
  );
  const projectStartDateForm = useMemo(
    () => (
      <input
        ref={projectStartDateRef}
        type='date'
        style={{ width: '100%' }}
        defaultValue={currentProject.start_date || ''}
      />
    ),
    [projectStartDateRef, currentProject]
  );
  const projectClientForm = useMemo(
    () => (
      <input
        ref={projectClientRef}
        defaultValue={currentProject.client_company || ''}
        type='text'
        style={{ width: '100%' }}
      />
    ),
    [projectClientRef, currentProject]
  );
  const projectEndDateForm = useMemo(
    () => (
      <input
        ref={projectEndDateRef}
        type='date'
        style={{ width: '100%' }}
        defaultValue={currentProject.end_date || ''}
      />
    ),
    [projectEndDateRef, currentProject]
  );
  const projectAgencyForm = useMemo(
    () => (
      <input
        ref={projectAgencyRef}
        defaultValue={currentProject.assessment_company || ''}
        type='text'
        style={{ width: '100%' }}
      />
    ),
    [projectAgencyRef, currentProject]
  );
  const projectNoteForm = useMemo(
    () => (
      <textarea
        ref={projectNoteRef}
        defaultValue={currentProject.note || ''}
        style={{ width: '100%', height: '80px' }}
      />
    ),
    [projectNoteRef, currentProject]
  );
  const projectAreaListForm = useMemo(
    () => (
      <Select
        isMulti
        closeMenuOnSelect={false}
        onChange={(e) => projectStateDispatch({ name: 'projectAreaList', value: e })}
        value={projectAreaList}
        options={
          currentProject.category === '공개용'
            ? global.config.OPEN_PROJECT_AREALIST
            : global.config.EFI_PROJECT_AREALIST
        }
      />
    ),
    [projectAreaList, currentProject]
  );
  const projectAssessorsForm = useMemo(
    () => (
      <Select
        isMulti
        closeMenuOnSelect={false}
        onChange={(e) => projectStateDispatch({ name: 'projectUserList', value: e })}
        value={projectUserList}
        options={allUserList}
      />
    ),
    [projectUserList, allUserList]
  );

  const editProject = () => {
    const payload = {
      id: projectId,
      name: projectNameRef.current.value || '',
      compliance: currentProject.compliance,
      area: projectAreaList.map((e) => `${currentProject.compliance}-${e.value}`),
      category: currentProject.category,
      start_date: projectStartDateRef.current.value || '',
      end_date: projectEndDateRef.current.value || '',
      client_company: projectClientRef.current.value || '',
      assessment_company: projectAgencyRef.current.value || '',
      note: projectNoteRef.current.value || '',
      assessors: projectUserList.map((e) => e.value) || [],
    };

    const [validResult, value] = payloadEmptyCheck(
      payload,
      global.config.PROJECT_VALID_CHECK_FIELDS
    );
    if (!validResult) {
      alert(`[${value}] 필드가 비어있습니다!`);
      return false;
    }

    editProjectReq(payload).then(([result, jsonData]) => {
      if (result) {
        appContextDispatch({ type: 'reset' });
        navigate.current(`/p/${projectId}/`);
      } else {
        navigate.current('/auth');
      }
    });
  };

  return (
    <Fragment>
      <div className='container-fluid' style={{ width: '95%' }}>
        <div className='card shadow mb-4'>
          <div className='card-header py-3'>
            <span className='m-0 font-weight-bold search-title'>
              프로젝트 편집
            </span>
          </div>
          <div className='card-body'>
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
            <div className='form-actions'>
              <Button
                size='sm'
                onClick={editProject}
                style={{ marginLeft: '5px' }}>
                저장
              </Button>
              <Button
                as={Link}
                to={`/p/${projectId}`}
                size='sm'
                style={{ marginLeft: '5px' }}>
                취소
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

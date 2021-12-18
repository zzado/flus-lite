import { useEffect,Fragment,useContext,useRef,useMemo,useReducer } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AppContext } from '../Context/AppContext';
import { getUserListReq, getComplianceListReq, payloadEmptyCheck, createProjectReq } from '../utils';
import Select from 'react-select';
import ProjectInfoTable from '../Components/ProjectInfoTable';

const stateReducer = (state, action) => {
  console.log(action);
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default function ProjectCreatePage() {
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
    projectCategory,
    projectCompliance,
    projectUserList,
    projectAreaList,
    allUserList,
    allComplianceList,
    projectNameRef,
    projectStartDateRef,
    projectEndDateRef,
    projectClientRef,
    projectAgencyRef,
    projectNoteRef,
  } = projectState;

  const { appContextDispatch } = useContext(AppContext);
  const navigate = useRef(useNavigate());

  // areaAliasList, allUserList value set
  useEffect(() => {
    getUserListReq().then(([result, jsonData]) => {
      result
        ? projectStateDispatch({
            name: 'allUserList',
            value: jsonData.map((e) => ({ value: e.id, label: e.username })),
          })
        : navigate.current('/auth');
    });
    getComplianceListReq().then(([result, jsonData]) => {
      result
        ? projectStateDispatch({
            name: 'allComplianceList',
            value: jsonData.map((e) => ({ value: e.code, label: e.code })),
          })
        : navigate.current('/auth');
    });
  }, []);

  const projectCategoryForm = useMemo(
    () => (
      <Select
        onChange={(e) =>
          projectStateDispatch({ name: 'projectCategory', value: e })
        }
        options={[
          { value: '공개용', label: '공개용' },
          { value: '종합', label: '종합' },
        ]}
      />
    ),
    []
  );
  const projectComplianceForm = useMemo(
    () => (
      <Select
        onChange={(e) =>
          projectStateDispatch({ name: 'projectCompliance', value: e })
        }
        isDisabled={Object.keys(projectCategory).length ? false : true}
        options={allComplianceList}
      />
    ),
    [projectCategory, allComplianceList]
  );

  const projectAreaListForm = useMemo(
    () => (
      <Select
        isMulti
        closeMenuOnSelect={false}
        onChange={(e) =>
          projectStateDispatch({ name: 'projectAreaList', value: e })
        }
        isDisabled={Object.keys(projectCompliance).length ? false : true}
        options={
          Object.keys(projectCategory).length
            ? projectCategory.value === '공개용'
              ? global.config.OPEN_PROJECT_AREALIST
              : global.config.EFI_PROJECT_AREALIST
            : []
        }
      />
    ),
    [projectCompliance, projectCategory]
  );

  const projectAssessorsForm = useMemo(
    () => (
      <Select
        isMulti
        closeMenuOnSelect={false}
        onChange={(e) =>
          projectStateDispatch({ name: 'projectUserList', value: e })
        }
        options={allUserList}
      />
    ),
    [allUserList]
  );

  const projectNameForm = useMemo(
    () => <input ref={projectNameRef} type='text' style={{ width: '100%' }} />,
    [projectNameRef]
  );
  const projectStartDateForm = useMemo(
    () => (
      <input ref={projectStartDateRef} type='date' style={{ width: '100%' }} />
    ),
    [projectStartDateRef]
  );
  const projectClientForm = useMemo(
    () => <input ref={projectClientRef} style={{ width: '100%' }} />,
    [projectClientRef]
  );
  const projectEndDateForm = useMemo(
    () => (
      <input ref={projectEndDateRef} type='date' style={{ width: '100%' }} />
    ),
    [projectEndDateRef]
  );
  const projectAgencyForm = useMemo(
    () => <input ref={projectAgencyRef} style={{ width: '100%' }} />,
    [projectAgencyRef]
  );
  const projectNoteForm = useMemo(
    () => (
      <textarea
        ref={projectNoteRef}
        style={{ width: '100%', height: '80px' }}
      />
    ),
    [projectNoteRef]
  );

  const createProject = () => {
    const payload = {
      name: projectNameRef.current.value || '',
      compliance: projectCompliance.value || '',
      area: projectAreaList.map((e) => `${projectCompliance.value}-${e.value}`),
      category: projectCategory.value || '',
      start_date: projectStartDateRef.current.value || '',
      end_date: projectEndDateRef.current.value || '',
      client_company: projectClientRef.current.value || '',
      assessment_company: projectAgencyRef.current.value || '',
      note: projectNoteRef.current.value || '',
      assessors: projectUserList.map((e) => e.value) || [],
    };
    console.log(payload);

    const [validResult, value] = payloadEmptyCheck(
      payload,
      global.config.PROJECT_VALID_CHECK_FIELDS
    );
    if (!validResult) {
      alert(`[${value}] 필드가 비어있습니다!`);
      return false;
    }

    createProjectReq(payload).then(([result, jsonData]) => {
      if (result) {
        appContextDispatch({ type: 'reset' });
        navigate.current(`/p/`);
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
              프로젝트 생성
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
                onClick={createProject}
                style={{ marginLeft: '5px' }}>
                저장
              </Button>
              <Button
                as={Link}
                to={`/p/`}
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

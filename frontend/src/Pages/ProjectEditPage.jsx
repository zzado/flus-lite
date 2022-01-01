import { Fragment, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import ProjectInfoTable from '../Components/ProjectInfoTable';

export default function ProjectEditPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject } = appContextState;
  
  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">프로젝트 편집</span>
        </div>
        <div className="card-body">
          <ProjectInfoTable action={'edit'} projectObj={currentProject} appContextDispatch={appContextDispatch} />
        </div>
      </div>
    </div>
    </Fragment>
  );
}
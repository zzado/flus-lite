import { Fragment, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import ProjectInfoTable from '../Components/ProjectInfoTable';

export default function ProjectDetailPage(){
  const { appContextDispatch } = useContext(AppContext);
  
  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">프로젝트 셍상</span>
        </div>
        <div className="card-body">
          <ProjectInfoTable action={'create'} projectObj={{}} appContextDispatch={appContextDispatch} />
        </div>
      </div>
    </div>
    </Fragment>
  );
}
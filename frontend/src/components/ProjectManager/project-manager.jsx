import { useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {LayOutContext} from "../LayOut/layout"
import * as utils from '../../utils'

export default function ProjectManager(props){
  const params = useParams();
  const navigate = useNavigate();

  const { setSelectedProject, setSelectedAreaAlias, setAreaAliasList, selectedProject, selectedAreaAlias, projectList  } = useContext(LayOutContext);

  useEffect(() => {
    const projectObj = projectList.find((e) => e.id === parseInt(params.projectId));
    if(projectObj) setSelectedProject( projectObj );
  },[projectList]);


  return (params.areaAlias) ? <AreaAliasDetail/> : <ProjectDetail/>
}


function ProjectDetail(props){
  const { selectedProject } = useContext(LayOutContext);
  return (
    <Fragment>
    <div style={{float: 'left', width: '100%', marginLeft: '1rem', marginBottom: '0.5rem', padding: 0}}>
      <ol className="breadcrumb" style={{margin: 0, padding: 0, background: 'rgba(255, 255, 255, 0)'}}>
        <li className="breadcrumb-item">Nagivate</li>
      </ol>
    </div>
    <div className="container-fluid" style={{width: '95%'}}>
    ProjectDetail {selectedProject.id} 
    </div>
    </Fragment>
  );
}

function AreaAliasDetail(props){
  const { selectedProject, selectedAreaAlias } = useContext(LayOutContext);
  
  return (
    <Fragment>
    <div style={{float: 'left', width: '100%', marginLeft: '1rem', marginBottom: '0.5rem', padding: 0}}>
      <ol className="breadcrumb" style={{margin: 0, padding: 0, background: 'rgba(255, 255, 255, 0)'}}>
        <li className="breadcrumb-item">Nagivate</li>
      </ol>
    </div>
    <div className="container-fluid" style={{width: '95%'}}>
    AreaAliasDetail {selectedProject.id} {selectedAreaAlias} 
    </div>
    </Fragment>
  );
}
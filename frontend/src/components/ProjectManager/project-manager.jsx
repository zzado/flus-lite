import { useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import {LayOutContext} from "../LayOut/layout"
import * as utils from '../../utils'

export default function ProjectManager(props){
  const params = useParams();
  const navigate = useNavigate();

  const { setSelectedProject, setSelectedAreaAlias, setAreaAliasList, selectedProject  } = useContext(LayOutContext);

  useEffect(() => {
    const getProject = async()=>{
      const URL = `api/project/${params.projectId}/`;
      const OPTION = {method: 'GET'};
      const [result, jsonData] = await utils.APIRequest(URL, OPTION);
      if(result){
        setSelectedProject(jsonData);
        setAreaAliasList(selectedProject.area);
        setSelectedAreaAlias('');
      }else{
        navigate('/auth');
      }
    }
    (!selectedProject.hasOwnProperty('id')) ? getProject() : setAreaAliasList(selectedProject.area);

  },[selectedProject]);

  return (
    <Fragment>
    <div style={{float: 'left', width: '100%', marginLeft: '1rem', marginBottom: '0.5rem', padding: 0}}>
      <ol className="breadcrumb" style={{margin: 0, padding: 0, background: 'rgba(255, 255, 255, 0)'}}>
        <li className="breadcrumb-item">Nagivate</li>
      </ol>
    </div>
    <div className="container-fluid" style={{width: '95%'}}>
      proejct manager {params.projectId} 
    </div>
    </Fragment>
  );
}
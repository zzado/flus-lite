import { useEffect, Fragment, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { LayOutContext } from "../LayOut/layout"
import ProjectDetailPage from "./project-detail"
import ProjectListPage from "./project-list"

export default function ProjectManager(props){
	const params = useParams();
  
	const { setSelectedProject, setSelectedAreaAlias, setAreaAliasList, selectedProject, selectedAreaAlias, projectList  } = useContext(LayOutContext);

	useEffect(() => {
		if(params.projectId){
			const projectObj = projectList.find((e) => e.id === parseInt(params.projectId));
			if(projectObj) setSelectedProject( projectObj );
		}
		if(params.areaAlias) setSelectedAreaAlias( params.areaAlias );
	},[projectList, params]);

	return (params.projectId) ? <ProjectDetailPage/> : <ProjectListPage/>
}
import { useState,useEffect, useMemo, createContext } from 'react';
import { Outlet,useNavigate } from "react-router-dom";
import { SideBar, TopBar } from "../NavBar/navbar";
import * as utils from '../../utils'

export const LayOutContext = createContext({
  setSelectedProject: () => {},
  setSelectedAreaAlias: () => {},
  setAreaAliasList: () => {},
  selectedProject : {},
  selectedAreaAlias : {},
  currentUser : {},
  projectList : [],
  areaAliasList : [],
});

export default function LayOut(props){
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  
  const [areaAliasList, setAreaAliasList] = useState([]);
  const [selectedAreaAlias, setSelectedAreaAlias] = useState('');
  
  const [currentUser, setCurrentUser] = useState({ username: '', is_admin: '', is_manager: '' });
  const navigate = useNavigate();

  const contextValue = useMemo(() => ({ setSelectedProject, setSelectedAreaAlias, setAreaAliasList, selectedProject, selectedAreaAlias, currentUser, projectList, areaAliasList }), [setSelectedProject, setSelectedAreaAlias, setAreaAliasList, selectedProject, selectedAreaAlias, currentUser, projectList, areaAliasList ]);
  
  useEffect(() => {
    const getUserInfo = async()=>{
      const URL = 'api/auth/user/';
      const OPTION = {method: 'GET'};
      const [result, jsonData] = await utils.APIRequest(URL, OPTION);
      (result)? setCurrentUser(jsonData) : navigate('/auth');
    }
    getUserInfo();

    const getProjectInfo = async()=>{
      const URL = 'api/project/';
      const OPTION = {method: 'GET'};
      const [result, jsonData] = await utils.APIRequest(URL, OPTION);
      (result)? setProjectList(jsonData) : navigate('/auth');
    }
    getProjectInfo();
  },[]);

  return(
    <LayOutContext.Provider value={contextValue}>
    <div id="wrapper">
      <SideBar/>
      <div id="content-wrapper" className="d-flex flex-column">
        <TopBar/>  
        <div>
        <Outlet/>
        </div>
      </div>
    </div>
    </LayOutContext.Provider>
    );
};
import { useState,useEffect, useMemo, createContext, useContext} from 'react';
import { Outlet,useNavigate, useParams } from "react-router-dom";
import { SideBar, TopBar } from "../NavBar/navbar";
import * as utils from '../../utils'

import { AppContext } from '../../Context/AppContext'
export const LayOutContext = {};
export default function LayOut({children}){
  const {contextState, contextDispatch} = useContext(AppContext);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   contextDispatch({ type: 'effectProject' });
  // },[contextState.projectList]);

  useEffect(() => {
    const getUserInfo = async()=>{
      const URL = 'api/auth/user/';
      const OPTION = {method: 'GET'};
      const [result, jsonData] = await utils.APIRequest(URL, OPTION);
      (result)? contextDispatch({ type: 'setUser', value: jsonData }) : navigate('/auth');
    }
    getUserInfo();

    const getProjectInfo = async()=>{
      const URL = 'api/project/';
      const OPTION = {method: 'GET'};
      const [result, jsonData] = await utils.APIRequest(URL, OPTION);
      (result)? contextDispatch({ type: 'setProjectList', value: jsonData }) : navigate('/auth');
    }
    getProjectInfo();
  },[]);

  return(
    <div id="wrapper">
      <SideBar/>
      <div id="content-wrapper" className="d-flex flex-column">
        <TopBar/>  
        <div>
        {children}
        </div>
      </div>
    </div>
    );
};
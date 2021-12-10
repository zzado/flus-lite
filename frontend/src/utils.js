import {React } from 'react';
import { Navigate } from 'react-router-dom';
import './config';

export const PrivateRoute = ({ children }) => {
  return localStorage.getItem('Token') ? children : <Navigate to="/auth" />;
}

export async function APIRequest(URL, OPTION){
  URL = `http://127.0.0.1:8000/${URL}`;
  OPTION.headers = {};
  OPTION.headers['Content-Type'] = 'application/json';
  
  const AUTH_TOKEN = localStorage.getItem('Token');
  if(AUTH_TOKEN !== null) OPTION.headers['Authorization'] = `Token ${AUTH_TOKEN}`;
  
  const responseObj = await fetch(URL, OPTION);
  if(responseObj.ok){
      return [true, await responseObj.json()]
  }else{
      return [false, await responseObj.json()]
  }
}

export const deleteProjectReq = async(projectId)=>{
  const URL = `api/project/${projectId}/`;
  const OPTION = {method: 'DELETE'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return result;
};

export const getUserInfoReq = async()=>{
  const URL = 'api/auth/user/';
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const getUserListReq = async()=>{
  const URL = 'api/user/';
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const getProjectListReq = async()=>{
  const URL = 'api/project/';
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const editProjectReq = async(payload)=>{
  const URL = `api/project/${payload.id}/`;
  const OPTION = {method: 'PUT', body: JSON.stringify(payload),};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const getComplianceListReq = async()=>{
  const URL = `api/compliance/`;
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const createProjectReq = async(payload)=>{
  const URL = `api/project/`;
  const OPTION = {method: 'POST', body: JSON.stringify(payload),};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const getAssetListReq = async(payload)=>{
  const URL = `api/asset-by-project/<int:projectId>/<str:areaAlias>/`;
  const OPTION = {method: 'GET', body: JSON.stringify(payload),};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}


export const payloadEmptyCheck = (payload, fields) =>{
  for(let _ in payload){
    if(fields.hasOwnProperty(_)){
      if(payload[_].length === 0){
        return [false, fields[_]];
      }
    }
  }
  return [true, null];
}




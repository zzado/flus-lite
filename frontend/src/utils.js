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

export const deleteAssetReq = async(asetId)=>{
  const URL = `api/asset/${asetId}/`;
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

export const createAssetReq = async(payload)=>{
  const URL = `api/asset/`;
  const OPTION = {method: 'POST', body: JSON.stringify(payload),};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const getAssetListByAreaAliasReq = async(projectid, areaAlias)=>{
  const URL = `api/asset-by-project/${projectid}/${areaAlias}/`;
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const getAssetReq = async(assetId)=>{
  const URL = `api/asset/${assetId}/`;
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const getVulReq = async(vulId)=>{
  const URL = `api/vulnerability/${vulId}/`;
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}


export const editVulReq = async(vulId, payload)=>{
  console.log(payload)
  const URL = `api/vulnerability/${vulId}/`;
  const OPTION = {method: 'PUT', body: JSON.stringify(payload),};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}


export const getPlatformListReq = async(compliance, areaAlias)=>{
  const URL = `api/platform/${compliance}/${areaAlias}/`;
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const editAssetReq = async(assetId, payload)=>{
  const URL = `api/asset/${assetId}/`;
  const OPTION = {method: 'PUT', body: JSON.stringify(payload),};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}


export const saveAssetGridDataReq = async(payload, projectId, areaAlias)=>{
  const URL = `api/realgrid/asset/${projectId}/${areaAlias}/`;
  const OPTION = {method: 'POST', body: JSON.stringify(payload),};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const getVulListByAssetReq = async(assetId)=>{
  const URL = `api/vuls-by-asset/${assetId}/`;
  const OPTION = {method: 'GET'};
  const [result, jsonData] = await APIRequest(URL, OPTION);
  return [result, jsonData];
}

export const payloadEmptyCheck = (payload, fields) =>{
  for(let _ in payload){
    if(fields.hasOwnProperty(_)){
      if(payload[_] === '' || payload[_] === null || payload[_] === undefined || payload[_].length === 0)
        return [false, fields[_]];
    }
  }
  return [true, null];
}




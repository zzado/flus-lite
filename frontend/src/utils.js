import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  return localStorage.getItem('Token') ? children : <Navigate to="/auth" />;
}


export async function APIRequest(URL, OPTION){
  URL = `http://127.0.0.1:8000/${URL}`;
  OPTION.headers = {};
  OPTION.headers['Content-Type'] = 'application/json';
  
  const AUTH_TOKEN = localStorage.getItem('Token');
  if(AUTH_TOKEN !== null){ 
    OPTION.headers['Authorization'] = `Token ${AUTH_TOKEN}`;
  }
  
  const responseObj = await fetch(URL, OPTION);
  if(responseObj.ok){
      return [true, await responseObj.json()]
  }else{
      return [false, await responseObj.json()]
  }
}




    // const jsonData = await fetch(URL, OPTION).then((responseObj)=>{
    //         if(responseObj.ok){
    //             return [true, await responseObj.json()]
    //         }else{
    //             return [false, await responseObj.json()]
    //         }
    //     }).then((jsonData) => jsonData);
    // return jsonData;

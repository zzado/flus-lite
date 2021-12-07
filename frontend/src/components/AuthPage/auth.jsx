import { Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as utils from '../../utils'

import { AppContext } from '../../Context/AppContext'

export default function AuthPage() {


  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');
  const navigate = useNavigate();

  const updateInputID = e => {
      setInputID(e.target.value);
  };

  const updateInputPW = e => {
      setInputPW(e.target.value);
  };

  const signIn = async(e) => {
    const URL = "api/auth/signin/";
    const OPTION = {method: 'POST', body: JSON.stringify({'username':inputID, 'password': inputPW}),};

    const [result, jsonData] = await utils.APIRequest(URL, OPTION);
    if(result){
      localStorage.setItem('Token', jsonData.Token);
      navigate('/dashboard');
    }else{
      alert(jsonData);
    }
  }

  const signUp = async(e) => {
    const URL = "api/auth/signup/";
    const OPTION = {method: 'POST', body: JSON.stringify({'username':inputID, 'password':inputPW}),};

    const [result, jsonData] = await utils.APIRequest(URL, OPTION);
    if(result){
      alert('signup success');
    }else{
      alert(jsonData);
    }
  }
  
  return(
      <div>
          <h2>Login</h2>
          <div>
              <label>ID : </label>
              <input type='text' name='input_id' value={inputID} onChange={updateInputID} />
          </div>
          <div>
              <label>PW : </label>
              <input type='password' name='input_pw' value={inputPW} onChange={updateInputPW} />
          </div>
          <div>
              <Button onClick={signIn}>Login</Button>
              <Button onClick={signUp}>SignUp</Button>
          </div>
      </div>
  );
}
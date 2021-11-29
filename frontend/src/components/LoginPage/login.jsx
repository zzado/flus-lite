import { Button } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as utils from '../../utils'


export default function LoginPage() {
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');

  const updateInputID = e => {
      setInputID(e.target.value);
  };

  const updateInputPW = e => {
      setInputPW(e.target.value);
  };

  const signIn = e => {
    const URL = "http://127.0.0.1:8000/api/auth/signin/";
    const OPTION = {
      method: 'POST',
      body: JSON.stringify({'username':inputID, 'password': inputPW}),
      headers:{
        'Content-Type': 'application/json'
      }
    };

    const jsonData = utils.APIRequest(URL, OPTION);
    console.log(jsonData);
    
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
          </div>
      </div>
  );
}
import { useEffect, Fragment, useContext, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { payloadEmptyCheck, getPlatformListReq, getAssetReq, editAssetReq } from '../utils'
import { AppContext } from '../Context/AppContext';
import { WorkSpaceContext } from '../Context/WorkSpaceContext';

export default function VulEditPage(props){
  console.log(props);
  const loc= useLocation();

  console.log(loc);
  
  useEffect(() => {
  },[]);


  return (
    <Fragment>
      <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">컁컁</span>
        </div>
        <div className="card-body">
          
          <div className="form-actions">
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

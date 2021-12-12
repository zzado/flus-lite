import { useEffect, Fragment, useContext, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import Select from 'react-select';
import { getUserListReq, getComplianceListReq, payloadEmptyCheck, createProjectReq } from '../utils'


export default function AssetCreatePage(){
  const { projectId, areaAlias } = useParams();
  const navigate = useNavigate();

  const assetNameForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetCodeForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetAssessorsForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetNoteForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetHostnameForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetSwitchBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetExternalBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetPWDCycleForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetURLForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetIsFinancialBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetIsHttpsBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetVersionForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;

  const assetPlatformForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  const assetProductModelForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  
  const assetValueForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  
  const assetOperatorForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  
  const assetAnalysisDoneBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  
  const assetIsTestBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  
  const assetIsServerBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  
  const assetIsNewBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  
  
  return (
    <Fragment>
      <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">자산 생성 {`[${projectId}]-${areaAlias}`}</span>
        </div>
        <div className="card-body">
          <AssetInfoTable
            projectId = {projectId}
            areaAlias = {areaAlias}
            assetName={assetNameForm}
            assetCode = {assetCodeForm}
            assetNote = {assetNoteForm}
            assetHostname = {assetHostnameForm}
            assetSwitchBool = {assetSwitchBoolForm}
            assetExternalBool = {assetExternalBoolForm}
            assetPWDCycle = {assetPWDCycleForm}
            assetURL = {assetURLForm}
            assetIsFinancialBool = {assetIsFinancialBoolForm}
            assetIsHttpsBool = {assetIsHttpsBoolForm}
            assetVersion = {assetVersionForm}

            assetAssessors = {assetAssessorsForm}
            assetPlatform = {assetPlatformForm}
            assetProductModel = {assetProductModelForm}
            assetValue = {assetValueForm}
            assetOperator = {assetOperatorForm}
            assetAnalysisDoneBool = {assetAnalysisDoneBoolForm}
            assetIsTestBool = {assetIsTestBoolForm}
            assetIsServerBool = {assetIsServerBoolForm}
            assetIsNewBool = {assetIsNewBoolForm}
            />
          <div className="form-actions">
            <Button>편집</Button>
            <Button>취소</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

// {
//   "id": 1,
//   "num": 1,
//   "area_alias": "SRV",
//   "code": "S01",
//   "name": "ㅋㅋㄹㄴ",
//   "assessors": "김개똥",
//   "note": "",
//   "hostname": "test-host",
//   "is_switch": true,
//   "is_external": false,
//   "backup_cycle": 0,
//   "pwd_change_cycle": 0,
//   "ip_url": "1",
//   "is_financial": false,
//   "is_https": false,
//   "version": "",
//   "platform": "WINDOWS",
//   "platform_t": "ㄹ",
//   "product_model": "",
//   "asset_value": 5,
//   "operator": "",
//   "progress": 1,
//   "is_test": false,
//   "is_server": false,
//   "is_new": false,
//   "manual_done": false,
//   "project": 25
// }
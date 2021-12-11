import { useEffect, Fragment, useContext, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import Select from 'react-select';
import { getUserListReq, getComplianceListReq, payloadEmptyCheck, createProjectReq } from '../utils'

//import { AnalysisContext } from '../Context/AnalysisContext';

import { getAssetListByAreaAliasReq } from '../utils'

export default function AssetDetailPage(){
  const { projectId, areaAlias } = useParams();
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">프로젝트 상세</span>
        </div>
        <div className="card-body">
          <AssetInfoTable
            areaAlias = {areaAlias}
            assetName='zzado'/>
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
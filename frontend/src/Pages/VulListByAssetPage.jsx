import { Fragment, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Link, useParams,useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import VulInfoTable from '../Components/VulInfoTable';
import { getVulListByAssetReq, getAssetReq } from '../utils'

export default function VulListByAssetPage(){
  const { projectId, areaAlias, assetId } = useParams();

  const [vulResultFilter, setVulResultFilter] = useState(false);
  const [vulList, setVulList] = useState([]);
  const [assetObj, setAssetObj] = useState({});
  const navigate = useRef(useNavigate());

  useEffect(() => {
    getVulListByAssetReq(assetId).then( ([result, jsonData])=> setVulList(jsonData));
    getAssetReq(assetId).then( ([result, jsonData])=> setAssetObj(jsonData));
  },[assetId]);

  const SubMenuBox = () => {
    return (
      <Fragment>
      <div className="card-header py-3">
        <Button size="sm" onClick={()=> navigate.current(`/w/${projectId}/${areaAlias}/step2`)}>뒤로</Button>
      </div>
      </Fragment>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <SubMenuBox />
        <div className="card-body">
        <AssetInfoTable
          areaAlias = {areaAlias}
          assetName={assetObj.name}
          assetNum = {assetObj.code}
          assetNote = {assetObj.note}
          assetHostname = {assetObj.hostname}
          assetSwitchBool = {assetObj.is_switch? 'true': 'false'}
          assetExternalBool = {assetObj.is_external? 'true': 'false'}
          assetBackUpCycle = {assetObj.backup_cycle}
          assetPWDCycle = {assetObj.pwd_change_cycle}
          assetURL = {assetObj.ip_url}
          assetIsFinancialBool = {assetObj.is_financial? 'true': 'false'}
          assetIsHttpsBool = {assetObj.is_https? 'true': 'false'}
          assetVersion = {assetObj.version}
          assetAssessors = {assetObj.assessors}
          assetPlatform = {assetObj.platform === '[[OTHER]]' ? `기타 (${assetObj.platform_t})` : assetObj.platform }
          assetProductModel = {assetObj.product_model}
          assetValue = {assetObj.asset_value}
          assetOperator = {assetObj.operator}
          assetAnalysisDoneBool = {assetObj.manual_done? 'true': 'false'}
          assetIsTestBool = { assetObj.is_test? 'true': 'false'}
          assetIsServerBool = {assetObj.is_server? 'true': 'false'}
          assetIsNewBool = {assetObj.is_new? 'true': 'false'}
        />

        <div className="card-header py-3">
          <span className="font-weight-bold">평가항목 목록</span>
          <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
            <input name="vulResult" type="radio" onChange={(e)=>setVulResultFilter(false)}/>전체
          </div>
          <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
            <input name="vulResult" type="radio" onChange={(e)=>setVulResultFilter('Y')}/>취약
          </div>
          <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
            <input name="vulResult" type="radio" onChange={(e)=>setVulResultFilter('N')}/>양호
          </div>
          <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
            <input name="vulResult" type="radio" onChange={(e)=>setVulResultFilter('NA')}/>N/A
          </div>
          <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
            <input name="vulResult" type="radio" onChange={(e)=>setVulResultFilter('')}/>미정
          </div>
        </div>

        <Table responsive="md" >
          <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>번호</th>
              <th>취약점ID</th>
              <th>항목명 (취약항목 갯수)</th>
              <th>평가결과</th>
              <th>신규여부</th>
              <th>전달</th>
              <th>조치</th>
              <th>위험도</th>
            </tr>
          </thead>
          <tbody>
          { vulList && vulList.map( (vulObj, idx) => { 
            if(vulResultFilter === false){
              return (
                <><tr>
                  <td><input type="checkbox" /></td>
                  <td>{idx}</td>
                  <td>{vulObj.vulnerability_item.code || ''}</td>
                  <Link to={`/v/${vulObj.id}/`} state={{vulObj:vulObj, zzado:'a'}}><td>{vulObj.vulnerability_item.name || ''}</td></Link>
                  <td>{vulObj.result === '' ? '미점검' : vulObj.result}</td>
                  <td>{vulObj.is_new ? '신규' : '기존'}</td>
                  <td>{vulObj.is_reported ? '전달' : ''}</td>
                  <td>{vulObj.is_patched ? '조치' : ''}</td>
                  <td>{vulObj.vulnerability_item.risk || ''}</td>
                </tr>
                </>
                )
            }else{
              if(vulResultFilter === vulObj.result ){
                return (
                  <><tr>
                    <td><input type="checkbox"/></td>
                    <td>{idx}</td>
                    <td>{vulObj.vulnerability_item.code || ''}</td>
                    <td>{vulObj.vulnerability_item.name || ''}</td>
                    <td>{vulObj.result === '' ? '미점검' : vulObj.result}</td>
                    <td>{vulObj.is_new ? '신규' : '기존'}</td>
                    <td>{vulObj.is_reported ? '전달' : ''}</td>
                    <td>{vulObj.is_patched ? '조치' : ''}</td>
                    <td>{vulObj.vulnerability_item.risk || ''}</td>
                  </tr>
                  </>
                  )
              }else{
                return null
              }
            }
          })}
          </tbody>
        </Table>
        
        </div>
        
      </div>
    </Fragment>
  );
}

// {
//   "id": 12177,
//   "status": "예) (작성예시 - markdown)\n* 발견된 취약점 내용\n\n            취약점 목록 또는 코드\n\n※ 캡쳐화면은 등록된 순서대로 결과서에 출력됨. 단 캡쳐화면의 위치를 자유롭게 변경하고 싶은 경우, 현재상태 기재 시에 아래와 같이 표기\n=> ![캡쳐화면](파일명)\n=> 예시) ![캡쳐화면](W1-WEB-SER-001_1.png)",
//   "auto_result": "",
//   "auto_result_reason": "",
//   "result": "",
//   "check_method": "",
//   "sampling": "",
//   "is_reported": false,
//   "is_patched": false,
//   "new_description": "",
//   "new_solution": "",
//   "gathering_data": "",
//   "is_test": false,
//   "needs_login": false,
//   "is_new": true,
//   "project": 19,
//   "asset": 312,
//   "vulnerability_item": "EFI-202101-MOB-SER-IOS-001"
// },
import { Fragment, useEffect, useState, useRef } from 'react';
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import { getVulListByAssetReq, getAssetReq } from '../utils'
import { GridView, LocalDataProvider } from 'realgrid';
import { loadVulsGridData, saveVulRealGrid, exportXlsx, importVulXlsx } from '../Services/realGrid';


export default function VulListByAssetPage(){
  const { state } = useLocation();
  const { projectId, areaAlias, assetId } = useParams();

  const [vulResultFilter, setVulResultFilter] = useState(false);
  
  const [vulList, setVulList] = useState([]);
  const [assetObj, setAssetObj] = useState(() => state ? state.assetObj : {});
  
  const navigate = useRef(useNavigate());

  const [isGridView, setIsGridView] = useState(false);
  const isFileUploadRef = useRef(false);
  const [gridView, setGridView] = useState(null);
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    if(Object.keys(assetObj).length===0) getAssetReq(assetId).then( ([result, jsonData])=> setAssetObj(jsonData));

    getVulListByAssetReq(assetId).then( ([result, jsonData])=> setVulList(jsonData));
  },[assetId]);

  const gridInit =() => {
    if(gridView === null && dataProvider === null){
      const tempObj1 = new GridView(document.getElementById('realgrid'));
      const tempObj2 = new LocalDataProvider(false);
      setGridView(tempObj1);
      setDataProvider(tempObj2);
      loadVulsGridData(tempObj1, tempObj2, assetObj, vulList);
    }else{
      loadVulsGridData(gridView, dataProvider, assetObj, vulList, areaAlias);
    }
  };

  const saveGrid = () => {
    if(gridView && dataProvider){
      if(saveVulRealGrid(gridView, dataProvider, projectId, areaAlias)){
        alert('저장 완료');
        setIsGridView(false);
      }
    }
  };

  const SubMenuBox = () => {
    return (
      <Fragment>
      <div className="card-header py-3">
        <span className='m-0 font-weight-bold search-title'>자산 별 취약점</span>
        <Button size="sm" onClick={() => { setIsGridView(!isGridView); gridInit();}} >뒤로</Button>
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
          { (!isGridView)? (
          <Button size="sm" onClick={() => { setIsGridView(!isGridView); gridInit();}} style={{marginLeft : '5px'}}>일괄 등록</Button>
          ) : (
          <>
          <Button size="sm" onClick={() => { saveGrid(); setIsGridView(!isGridView);}} style={{marginLeft : '5px'}}>저장</Button>
          <Button size="sm" onClick={()=> exportXlsx(gridView, `[취약점] ${areaAlias}.xlsx`, '취약점')} style={{marginLeft : '5px'}}>Export</Button>
          <Button size="sm" onClick={() => isFileUploadRef.current.click() } style={{marginLeft : '5px'}}>Import</Button>
          <input type="file" onChange={(e)=> importVulXlsx(gridView, dataProvider, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/>
          <Button size="sm" onClick={() => { setIsGridView(!isGridView);}} >뒤로</Button>
          </>
          )}
        </div>

        <Table responsive="md" style={ {display : (isGridView)? 'none' : ''} }>
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
          { vulList && vulList.map( (vulObj, idx) => 
            (vulResultFilter === false)?
              (
                <tr key={idx}>
                  <td><input type="checkbox" /></td>
                  <td>{idx}</td>
                  <td>{vulObj.vulnerability_item.code || ''}</td>
                  <td><Link to={`/v/${projectId}/${areaAlias}/${assetId}/${vulObj.id}/`} state={{ vulObj:vulObj }}>{vulObj.vulnerability_item.name || ''}</Link> { vulObj.pocs.length }</td>
                  <td>{vulObj.result === '' ? '미점검' : vulObj.result}</td>
                  <td>{vulObj.is_new ? '신규' : '기존'}</td>
                  <td>{vulObj.is_reported ? '전달' : ''}</td>
                  <td>{vulObj.is_patched ? '조치' : ''}</td>
                  <td>{vulObj.vulnerability_item.risk || ''}</td>
                </tr>
                )
            : (vulResultFilter === vulObj.result )?
                (
                  <tr key={idx}>
                    <td><input type="checkbox"/></td>
                    <td>{idx}</td>
                    <td>{vulObj.vulnerability_item.code || ''}</td>
                    <td><Link to={`/v/${projectId}/${areaAlias}/${assetId}/${vulObj.id}/`} state={{ vulObj:vulObj }}>{vulObj.vulnerability_item.name || ''}</Link></td>
                    <td>{vulObj.result === '' ? '미점검' : vulObj.result}</td>
                    <td>{vulObj.is_new ? '신규' : '기존'}</td>
                    <td>{vulObj.is_reported ? '전달' : ''}</td>
                    <td>{vulObj.is_patched ? '조치' : ''}</td>
                    <td>{vulObj.vulnerability_item.risk || ''}</td>
                  </tr>
                ) : null
              )}
          </tbody>
        </Table>
        <div id='realgrid' style={{display : (isGridView)? '' : 'none'}}></div>
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
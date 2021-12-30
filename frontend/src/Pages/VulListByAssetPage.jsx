import { Fragment, useState, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import { VulsByAssetContext } from '../Context/VulsByAssetContext';

export default function VulListByAssetPage(){
  const { projectId, areaAlias, assetId } = useParams();

  const { VulsByAssetContextState } = useContext(VulsByAssetContext);
  const { vulList, assetObj } = VulsByAssetContextState;
  
  const [vulResultFilter, setVulResultFilter] = useState(false);
  

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className='m-0 font-weight-bold search-title'>자산 별 취약점</span>
          <Button size="sm" as={Link} to={`/w/${projectId}/${areaAlias}/step1`} >뒤로</Button>
        </div>
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
            <span className="font-weight-bold">평가항목</span>
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
            
            { (areaAlias !== 'FISM')? 
              <Button size="sm" as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetId}/vul-grid`} style={{marginLeft : '5px'}}>일괄 등록</Button>
            : null}
          </div>

          <Table responsive="md">
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
        </div>
      </div>
    </Fragment>
  );
}


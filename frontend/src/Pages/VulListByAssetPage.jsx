import { Fragment, useState, useContext, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import { VulsByAssetContext } from '../Context/VulsByAssetContext';
import VulListTable from '../Components/VulListTable';
import VulFilterBar from '../Components/VulFilterBar';

export default function VulListByAssetPage(){
  const { projectId, areaAlias, assetId } = useParams();

  const { VulsByAssetContextState } = useContext(VulsByAssetContext);
  const { vulList, assetObj } = VulsByAssetContextState;
  
  const [vulResultFilter, setVulResultFilter] = useState(false);
  
  const vulTable = useMemo(()=><VulListTable asseCodeDisplay={false} vulList={vulList} vulResultFilter={vulResultFilter}/>, [vulList, vulResultFilter]);

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
            <VulFilterBar vulResultFilter={vulResultFilter} setVulResultFilter={setVulResultFilter} serachable={true}/>
            
            { (areaAlias !== 'FISM')? 
              <Button size="sm" as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetId}/vul-grid`} style={{marginLeft : '5px'}}>일괄 등록</Button>
            : null}
          </div>

          { vulTable }

        </div>
      </div>
    </Fragment>
  );
}


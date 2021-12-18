import { useEffect, Fragment, useContext, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import { getAssetReq, deleteAssetReq } from '../utils'
import { AppContext } from '../Context/AppContext';
import { WorkSpaceContext } from '../Context/WorkSpaceContext';

export default function AssetDetailPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { WorkSpaceContextDispatch } = useContext(WorkSpaceContext);

  const { projectList, currentArea } = appContextState;
  
  const { projectId, areaAlias, assetId } = useParams();
  const [ assetObj, setAssetObj ] = useState({});
  const navigate = useRef(useNavigate());

  useEffect(() => {
    if( projectList.length) appContextDispatch({ type: 'setProject', value: projectId });
    if( areaAlias !== currentArea ) appContextDispatch({ type: 'setArea', value: areaAlias });
  },[projectList, projectId, assetId]);

  useEffect(() => {
    getAssetReq(assetId).then( ([result, jsonData]) => {
      (result) ? setAssetObj(jsonData) : navigate.current('/auth');
    });
  },[assetId]);

  const deleteAsset = ()=>{
    if(window.confirm("자산을 정말 삭제 하시겠습니까?")){
      deleteAssetReq(assetId).then( (result) => {
        if(result){
          WorkSpaceContextDispatch({type:'resetAsset'});
          navigate.current(`/w/${projectId}/${areaAlias}/step1`);
        }
      });
    }//(() ? navigate.current('/p/') : navigate.current('/auth')): console.log('delete canceled')
  };

  return (
    <Fragment>
      <div className="container-fluid" style={{width: '95%'}}>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">자산 상세</span>
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
            assetIsNewBool = {assetObj.is_new? 'true': 'false'}/>
          <div className="form-actions">
          <Button as={Link} to={`/a/${projectId}/${areaAlias}/${assetId}/edit`} size="sm" style={{marginLeft : '5px'}}>편집</Button>
          <Button onClick={deleteAsset} size="sm" style={{marginLeft : '5px'}}>삭제</Button>
          <Button as={Link} to={`/w/${projectId}/${areaAlias}/step1`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

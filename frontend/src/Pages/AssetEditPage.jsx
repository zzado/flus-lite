import { useEffect, Fragment, useContext, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { payloadEmptyCheck, getPlatformListReq, getAssetReq, editAssetReq } from '../utils'
import { AppContext } from '../Context/AppContext';
import { WorkSpaceContext } from '../Context/WorkSpaceContext';

export default function AssetEditPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { projectList, currentProject, currentArea } = appContextState;

  const { WorkSpaceContextState, WorkSpaceContextDispatch } = useContext(WorkSpaceContext);

  const { projectId, areaAlias, assetId } = useParams();
  const navigate = useNavigate();

  const [ assetObj, setAssetObj ] = useState({});
  
  const [platformList, setPlatformList] = useState([]);

  const [newAssetCode, setNewAssetCode] = useState(1);

  const [isSwitch, setIsSwitch] = useState({});
  const [isExternal, setIsExternal] = useState({});
  const [isFinancial, setIsFinancial] = useState({});
  const [isHttps, setIsHttps] = useState({});
  const [isTest, setIsTest] = useState({});
  const [isServer, setIsServer] = useState({});
  const [isNew, setIsNew] = useState({});
  const [assetValue, setAssetValue] = useState({});
  const [assetPlatform, setAssetPlatform] = useState({});


  useEffect(() => {
    if( projectList.length && currentProject.id !== parseInt(projectId)) appContextDispatch({ type: 'setProject', value: projectId });
    if( currentArea !== areaAlias ) appContextDispatch({ type: 'setArea', value: areaAlias });
  },[projectList]);

  useEffect(() => {
    if(Object.keys(currentProject).length) getPlatformListReq(currentProject.compliance, areaAlias).then( ([result, jsonData]) => (result)? setPlatformList(jsonData) : navigate('/auth'));
  },[currentProject]);

  useEffect(() => {
    getAssetReq(assetId).then( ([result, jsonData]) => { result ? setAssetObj(jsonData) : navigate('/auth');});
  },[]);

  useEffect(() => {
    if(Object.keys(assetObj).length){
      (assetObj.paltform==='[[OTHER]]') ? setAssetPlatform({ value: assetObj.paltform_t, label: assetObj.paltform_t, __isNew__ : true}) : setAssetPlatform({ value: assetObj.platform, label: assetObj.platform}) ;
      assetObj.is_switch === true ? setIsSwitch({value: assetObj.is_switch, label: '스위치'}) : setIsSwitch({value: assetObj.is_switch, label: '라우터'}) ;
      assetObj.is_external === true ? setIsExternal({value: assetObj.is_switch, label: '대외연결'}) : setIsExternal({value: assetObj.is_switch, label: '대내연결'}) ;
      assetObj.is_financial === true ? setIsFinancial({value: assetObj.is_switch, label: '전자금융서비스'}) : setIsFinancial({value: assetObj.is_switch, label: '일반서비스'}) ;
      assetObj.is_https === true ? setIsHttps({value: assetObj.is_switch, label: '스위치'}) : setIsHttps({value: assetObj.is_switch, label: '라우터'}) ;
      assetObj.is_test === true ? setIsTest({value: assetObj.is_switch, label: '테스트'}) : setIsTest({value: assetObj.is_switch, label: '운영'}) ;
      assetObj.is_server === true ? setIsServer({value: assetObj.is_switch, label: '서버측 점검'}) : setIsServer({value: assetObj.is_switch, label: '서버측 미점검'}) ;
      assetObj.is_new === true ? setIsNew({value: assetObj.is_switch, label: '신규'}) : setIsNew({value: assetObj.is_switch, label: '기존'}) ;
      setAssetValue({value: assetObj.asset_value, label: assetObj.asset_value});
    }
  },[assetObj]);


  const assetNameForm = () => <input id="assetNameEID" type="text" defaultValue={assetObj.name} style={{width:'100%'}} required/>;
  const assetAssessorsForm = () => <input id="assetAssessorsEID" defaultValue={assetObj.assessors} type="text" style={{width:'100%'}}/>;
  const assetOperatorForm = () => <input id="assetOperatorEID" defaultValue={assetObj.operator} type="text" style={{width:'100%'}}/>;
  const assetHostnameForm = () => <input id="assetHostNameEID" defaultValue={assetObj.hostname} type="text" style={{width:'100%'}}/>;
  const assetURLForm = () => <input id="assetURLEID" type="text" defaultValue={assetObj.ip_url} style={{width:'100%'}}/>;
  const assetVersionForm = () => <input id="assetVersionEID" type="text" defaultValue={assetObj.version} style={{width:'100%'}}/>;
  const assetProductModelForm = () => <input id="assetProductModelEID" type="text" defaultValue={assetObj.product_model} style={{width:'100%'}}/>;

  const assetPlatformForm = () => <CreatableSelect onChange={e=>setAssetPlatform(e)} value={ assetPlatform } options={ platformList } />
  const assetSwitchBoolForm = () => <Select onChange={e=>setIsSwitch(e)} value={isSwitch} options={ [ {value:true, label:'스위치'}, {value:false, label:'라우터'} ] }/>;
  const assetExternalBoolForm = () => <Select onChange={e=>setIsExternal(e)} value={isExternal} options={ [ {value:true, label:'대외연결'}, {value:false, label:'대내연결'} ] }/>;
  const assetIsFinancialBoolForm = () => <Select onChange={e=>setIsFinancial(e)} value={isFinancial} options={ [ {value:true, label:'전자금융서비스'}, {value:false, label:'일반서비스'} ] }/>;
  const assetIsHttpsBoolForm = () => <Select onChange={e=>setIsHttps(e)} value={isHttps} options={ [ {value:true, label:'HTTPS'}, {value:false, label:'HTTP'} ] }/>;
  const assetIsTestBoolForm = () => <Select onChange={e=>setIsTest(e)} value={isTest} options={ [ {value:true, label:'테스트'}, {value:false, label:'운영'} ] }/>;
  const assetIsServerBoolForm = () => <Select onChange={e=>setIsServer(e)} value={isServer} options={ [ {value:true, label:'서버측 점검'}, {value:false, label:'서버측 미점검'} ] }/>;
  const assetIsNewBoolForm = () => <Select onChange={e=>setIsNew(e)} value={isNew} options={ [ {value:true, label:'신규'}, {value:false, label:'기존'} ] }/>;
  const assetValueForm = () => <Select onChange={e=>setAssetValue(e)} value={assetValue} options={ [5, 4, 3, 2, 1].map(e => { return { value:e, label: e } } ) }/>;

  const assetCodeForm = () => <div key={newAssetCode}><input id="assetCodeEID" type="number" min="1" defaultValue={assetObj.num} style={{width:'100%'}}/></div>;
  const assetPWDCycleForm = () => <input id="assetPWDCycleEID" type="number" min="0"  defaultValue={assetObj.pwd_change_cycle} style={{width:'100%'}}/>;
  const assetBackUpCycleForm = () => <input id="assetBackUpCycleEID" type="number" min="0" defaultValue={assetObj.backup_cycle} style={{width:'100%'}}/>;

  const assetNoteForm = () => <textarea id="assetNoteEID" defaultValue={assetObj.note} style={{width:'100%', height:'80px'}}/>;

  const assetAnalysisDoneBoolForm = () => <input id="projectNameEID" type="text" style={{width:'100%'}}/>;
  
  const createAsset = () => {
    const payload = {
      area_alias: areaAlias,
      project: parseInt(projectId),
      num : document.getElementById('assetCodeEID').value,
      name: document.getElementById('assetNameEID').value,
      assessors: document.getElementById('assetOperatorEID').value,
      operator: document.getElementById('assetAssessorsEID').value,
      is_new: isNew.value ? isNew.value : true,
      note: document.getElementById('assetNoteEID').value,
      hostname: document.getElementById('assetHostNameEID') ? document.getElementById('assetHostNameEID').value : '',
      ip_url: document.getElementById('assetURLEID') ? document.getElementById('assetURLEID').value : '',
      version: document.getElementById('assetVersionEID') ? document.getElementById('assetVersionEID').value : '',
      product_model: document.getElementById('assetProductModelEID') ? document.getElementById('assetProductModelEID').value : '',
      platform: assetPlatform.value ? ((assetPlatform.__isNew__)? '[[OTHER]]': assetPlatform.value) : 'NONE',
      platform_t : assetPlatform.__isNew__ ? assetPlatform.value : '',
      is_switch: isSwitch.value ? isSwitch.value : true,
      is_external: isExternal.value ? isExternal.value : false,
      is_financial: isFinancial.value ? isFinancial.value : false,
      is_https: isHttps.value ? isHttps.value: false,
      is_test: isTest.value ? isTest.value : false,
      is_server: isServer.value ? isServer.value : false,
      asset_value: assetValue.value ? assetValue.value : 5,
      pwd_change_cycle: document.getElementById('assetPWDCycleEID') ? document.getElementById('assetPWDCycleEID').value : 0,
      backup_cycle: document.getElementById('assetBackUpCycleEID') ? document.getElementById('assetBackUpCycleEID').value : 0,
    };
    console.log(payload);
    if( ['SRV', 'DBM', 'MOB', 'ISS', 'NET'].includes(areaAlias) && payload.platform === 'NONE') payload.platform = '';
  
    const [validResult, value] = payloadEmptyCheck(payload, global.config.ASSET_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    editAssetReq(assetId, payload).then( ([result, jsonData]) => {
       if(result){ WorkSpaceContextDispatch({ type:'resetAsset' }); navigate(`/a/${projectId}/${areaAlias}/${assetId}`); }else{ navigate('/auth');}
    });
  };

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
            assetBackUpCycle = {assetBackUpCycleForm}
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
            <Button size="sm" onClick={createAsset} style={{marginLeft : '5px'}}>저장</Button>
            <Button as={Link} to={`/a/${projectId}/${areaAlias}/${assetId}`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

import { useEffect, Fragment, useContext, useState, useRef, useMemo } from 'react';
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

  const { WorkSpaceContextDispatch } = useContext(WorkSpaceContext);

  const { projectId, areaAlias, assetId } = useParams();
  const navigate = useRef(useNavigate());

  const [ assetObj, setAssetObj ] = useState({});
  
  const [platformList, setPlatformList] = useState([]);

  const [isSwitch, setIsSwitch] = useState({});
  const [isExternal, setIsExternal] = useState({});
  const [isFinancial, setIsFinancial] = useState({});
  const [isHttps, setIsHttps] = useState({});
  const [isTest, setIsTest] = useState({});
  const [isServer, setIsServer] = useState({});
  const [isNew, setIsNew] = useState({});
  const [assetValue, setAssetValue] = useState({});
  const [assetPlatform, setAssetPlatform] = useState({});

  const assetNameRef = useRef(null);
  const assetNumRef = useRef(null);
  const assetAssessorsRef = useRef(null);
  const assetOperatorRef = useRef(null);
  const assetHostnameRef = useRef(null);
  const assetURLRef = useRef(null);
  const assetVersionRef = useRef(null);
  const assetProductModelRef = useRef(null);
  const assetPWDCycleRef = useRef(null);
  const assetBackUpCycleRef = useRef(null);
  const assetNoteRef = useRef(null);
  const assetAnalysisDoneRef = useRef(null);

  useEffect(() => {
    if( projectList.length && currentProject.id !== parseInt(projectId)) appContextDispatch({ type: 'setProject', value: projectId });
    if( currentArea !== areaAlias ) appContextDispatch({ type: 'setArea', value: areaAlias });
  },[projectList]);

  useEffect(() => {
    if(Object.keys(currentProject).length) getPlatformListReq(currentProject.compliance, areaAlias).then( ([result, jsonData]) => (result)? setPlatformList(jsonData) : navigate.current('/auth'));
  },[currentProject, areaAlias]);

  useEffect(() => {
    getAssetReq(assetId).then( ([result, jsonData]) => { result ? setAssetObj(jsonData) : navigate.current('/auth');});
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


  const assetNameForm = useMemo(() => <input ref={assetNameRef} type="text" defaultValue={assetObj.name} style={{width:'100%'}}/>, [assetObj]);
  const assetAssessorsForm = useMemo(() => <input ref={assetAssessorsRef} defaultValue={assetObj.assessors} type="text" style={{width:'100%'}}/>, [assetObj]);
  const assetOperatorForm = useMemo(() => <input ref={assetOperatorRef} defaultValue={assetObj.operator} type="text" style={{width:'100%'}}/>, [assetObj]);
  const assetHostnameForm = useMemo(() => <input ref={assetHostnameRef} defaultValue={assetObj.hostname} type="text" style={{width:'100%'}}/>, [assetObj]);
  const assetURLForm = useMemo(() => <input ref={assetURLRef} type="text" defaultValue={assetObj.ip_url} style={{width:'100%'}}/>, [assetObj]);
  const assetVersionForm = useMemo(() => <input ref={assetVersionRef} type="text" defaultValue={assetObj.version} style={{width:'100%'}}/>, [assetObj]);
  const assetProductModelForm = useMemo(() => <input ref={assetProductModelRef} type="text" defaultValue={assetObj.product_model} style={{width:'100%'}}/>, [assetObj]);

  const assetPlatformForm = useMemo(() => <CreatableSelect onChange={e=>setAssetPlatform(e)} value={ assetPlatform } options={ platformList } />, [assetPlatform, platformList]);
  const assetSwitchBoolForm = useMemo(() => <Select onChange={e=>setIsSwitch(e)} value={isSwitch} options={ [ {value:true, label:'스위치'}, {value:false, label:'라우터'} ] }/>, [isSwitch]);
  const assetExternalBoolForm = useMemo(() => <Select onChange={e=>setIsExternal(e)} value={isExternal} options={ [ {value:true, label:'대외연결'}, {value:false, label:'대내연결'} ] }/>, [isExternal]);
  const assetIsFinancialBoolForm = useMemo(() => <Select onChange={e=>setIsFinancial(e)} value={isFinancial} options={ [ {value:true, label:'전자금융서비스'}, {value:false, label:'일반서비스'} ] }/>, [isFinancial]);
  const assetIsHttpsBoolForm = useMemo(() => <Select onChange={e=>setIsHttps(e)} value={isHttps} options={ [ {value:true, label:'HTTPS'}, {value:false, label:'HTTP'} ] }/>, [isHttps]);
  const assetIsTestBoolForm = useMemo(() => <Select onChange={e=>setIsTest(e)} value={isTest} options={ [ {value:true, label:'테스트'}, {value:false, label:'운영'} ] }/>, [isTest]);
  const assetIsServerBoolForm = useMemo(() => <Select onChange={e=>setIsServer(e)} value={isServer} options={ [ {value:true, label:'서버측 점검'}, {value:false, label:'서버측 미점검'} ] }/>, [isServer]);
  const assetIsNewBoolForm = useMemo(() => <Select onChange={e=>setIsNew(e)} value={isNew} options={ [ {value:true, label:'신규'}, {value:false, label:'기존'} ] }/>, [isNew]);
  const assetValueForm = useMemo(() => <Select onChange={e=>setAssetValue(e)} value={assetValue} options={ [5, 4, 3, 2, 1].map(e => { return { value:e, label: e } } ) }/>, [assetValue]);

  const assetNumForm = useMemo(() => <input ref={assetNumRef} type="number" min="1" defaultValue={assetObj.num} style={{width:'100%'}}/>, [assetObj]);
  const assetPWDCycleForm = useMemo(() => <input ref={assetPWDCycleRef} type="number" min="0"  defaultValue={assetObj.pwd_change_cycle} style={{width:'100%'}}/>, [assetObj]);
  const assetBackUpCycleForm = useMemo(() => <input ref={assetBackUpCycleRef} type="number" min="0" defaultValue={assetObj.backup_cycle} style={{width:'100%'}}/>, [assetObj]);
  const assetNoteForm = useMemo(() => <textarea ref={assetNoteRef} defaultValue={assetObj.note} style={{width:'100%', height:'80px'}}/>, [assetObj]);
  const assetAnalysisDoneBoolForm = useMemo(() => <input ref={assetAnalysisDoneRef} type="text" style={{width:'100%'}}/>, []);
  
  const editAsset = () => {
    const payload = {
      area_alias: areaAlias,
      project: parseInt(projectId),
      num : assetNumRef.current ? assetNumRef.current.value : 0,
      name: assetNameRef.current ? assetNameRef.current.value : '',
      assessors: assetAssessorsRef.current ? assetAssessorsRef.current.value : '',
      operator: assetOperatorRef.current ? assetOperatorRef.current.value : '',
      note: assetNoteRef.current ? assetNoteRef.current.value : '',
      hostname: assetHostnameRef.current ? assetHostnameRef.current.value : '',
      ip_url: assetURLRef.current ? assetURLRef.current.value : '',
      version: assetVersionRef.current ? assetVersionRef.current.value : '',
      product_model: assetProductModelRef.current ? assetProductModelRef.current.value : '',

      platform: assetPlatform.value ? ((assetPlatform.__isNew__)? '[[OTHER]]': assetPlatform.value) : 'NONE',
      platform_t : assetPlatform.__isNew__ ? assetPlatform.value : '',

      is_new: isNew.value ? isNew.value : true,
      is_switch: isSwitch.value ? isSwitch.value : true,
      is_external: isExternal.value ? isExternal.value : false,
      is_financial: isFinancial.value ? isFinancial.value : false,
      is_https: isHttps.value ? isHttps.value: false,
      is_test: isTest.value ? isTest.value : false,
      is_server: isServer.value ? isServer.value : false,
      asset_value: assetValue.value ? assetValue.value : 5,
      pwd_change_cycle: assetPWDCycleRef.current ? assetPWDCycleRef.current.value : 0,
      backup_cycle: assetBackUpCycleRef.current ? assetBackUpCycleRef.current.value : 0,
    };
    console.log(payload);
    if( ['SRV', 'DBM', 'MOB', 'ISS', 'NET'].includes(areaAlias) && payload.platform === 'NONE') payload.platform = '';
  
    const [validResult, value] = payloadEmptyCheck(payload, global.config.ASSET_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    editAssetReq(assetId, payload).then( ([result, jsonData]) => {
       if(result){ WorkSpaceContextDispatch({ type:'resetAsset' }); navigate.current(`/a/${projectId}/${areaAlias}/${assetId}`); }else{ navigate.current('/auth');}
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
            assetNum = {assetNumForm}
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
            <Button size="sm" onClick={editAsset} style={{marginLeft : '5px'}}>저장</Button>
            <Button as={Link} to={`/a/${projectId}/${areaAlias}/${assetId}`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

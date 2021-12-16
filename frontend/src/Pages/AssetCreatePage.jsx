import { useEffect, Fragment, useContext, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { payloadEmptyCheck, getAssetListByAreaAliasReq, getPlatformListReq, createAssetReq } from '../utils'
import { WorkSpaceContext } from '../Context/WorkSpaceContext';
import { AppContext } from '../Context/AppContext';

export default function AssetCreatePage(){
  const { WorkSpaceContextState, WorkSpaceContextDispatch } = useContext(WorkSpaceContext);
  const { assetList } = WorkSpaceContextState;

  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { projectList, currentProject, currentArea } = appContextState;

  const { projectId, areaAlias } = useParams();
  const navigate = useNavigate();

  const [platformList, setPlatformList] = useState([]);
  const [assetNum, setAssetNum] = useState(1);

  const [isSwitch, setIsSwitch] = useState({value:true, label:'스위치'});
  const [isExternal, setIsExternal] = useState({value:false, label:'대내연결'});
  const [isFinancial, setIsFinancial] = useState({value:false, label:'비전자금융서비스'});
  const [isHttps, setIsHttps] = useState({value:false, label:'HTTP'});
  const [isTest, setIsTest] = useState({value:false, label:'운영'});
  const [isServer, setIsServer] = useState({value:true, label:'서버측 점검'});
  const [isNew, setIsNew] = useState({value:true, label:'신규'});
  const [assetValue, setAssetValue] = useState({value:5, label:5});
  const [assetPlatform, setAssetPlatform] = useState({});

  const assetNameRef = useRef(null);
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
    if( projectList.length && currentProject.id !== parseInt(projectId) ) appContextDispatch({ type: 'setProject', value: projectId });
    if( currentArea !== areaAlias ) appContextDispatch({ type: 'setArea', value: areaAlias });
  },[projectList]);

  useEffect(() => {
    if(Object.keys(currentProject).length) getPlatformListReq(currentProject.compliance, areaAlias).then( ([result, jsonData]) => (result)? setPlatformList(jsonData) : navigate('/auth'));
  },[currentProject]);

  useEffect(() => {
    getAssetListByAreaAliasReq(projectId, areaAlias).then( ([result, jsonData]) => (result)? WorkSpaceContextDispatch({ type: 'setAssetList', value: jsonData }) : navigate('/auth'));
  },[]);

  useEffect(() => {
    if(assetList.length) setAssetNum( assetList[assetList.length-1].num +1 );
  },[assetList]);

  const assetNameForm = useMemo(() => <input ref={assetNameRef} type="text" style={{width:'100%'}}/>, []);
  const assetAssessorsForm = useMemo(() => <input ref={assetAssessorsRef} type="text" style={{width:'100%'}}/>, []);
  const assetOperatorForm = useMemo(() => <input ref={assetOperatorRef} type="text" style={{width:'100%'}}/>, []);
  const assetHostnameForm = useMemo(() => <input ref={assetHostnameRef} type="text" style={{width:'100%'}}/>, []);
  const assetURLForm = useMemo(() => <input ref={assetURLRef} style={{width:'100%'}}/>, []);
  const assetVersionForm = useMemo(() => <input ref={assetVersionRef} style={{width:'100%'}}/>, []);
  const assetProductModelForm = useMemo(() => <input ref={assetProductModelRef} style={{width:'100%'}}/>, []);
  const assetPlatformForm = useMemo(() => <CreatableSelect onChange={e=>setAssetPlatform(e)} options={ platformList } />, [platformList]);
  const assetSwitchBoolForm = useMemo(() => <Select onChange={e=>setIsSwitch(e)} value={isSwitch} options={ [ {value:true, label:'스위치'}, {value:false, label:'라우터'} ] }/>, [isSwitch]);
  const assetExternalBoolForm = useMemo(() => <Select onChange={e=>setIsExternal(e)} value={isExternal} options={ [ {value:true, label:'대외연결'}, {value:false, label:'대내연결'} ] }/>, [isExternal]);;
  const assetIsFinancialBoolForm = useMemo(() => <Select onChange={e=>setIsFinancial(e)} value={isFinancial} options={ [ {value:true, label:'전자금융서비스'}, {value:false, label:'비전자금융서비스'} ] }/>, [isFinancial]);
  const assetIsHttpsBoolForm = useMemo(() => <Select onChange={e=>setIsHttps(e)} value={isHttps} options={ [ {value:true, label:'HTTPS'}, {value:false, label:'HTTP'} ] }/>, [isHttps]);
  const assetIsTestBoolForm = useMemo(() => <Select onChange={e=>setIsTest(e)} value={isTest} options={ [ {value:true, label:'테스트'}, {value:false, label:'운영'} ] }/>, [isTest]);
  const assetIsServerBoolForm = useMemo(() => <Select onChange={e=>setIsServer(e)} value={isServer} options={ [ {value:true, label:'서버측 점검'}, {value:false, label:'서버측 미점검'} ] }/>, [isServer]);
  const assetIsNewBoolForm = useMemo(() => <Select onChange={e=>setIsNew(e)} value={isNew} options={ [ {value:true, label:'신규'}, {value:false, label:'기존'} ] }/>, [isNew]);
  const assetValueForm = useMemo(() => <Select onChange={e=>setAssetValue(e)} value={assetValue} options={ [5, 4, 3, 2, 1].map(e => { return { value:e, label: e } } ) }/>, [assetValue]);

  const assetNumForm = useMemo(() => <input type="number" onChange={e=>setAssetNum(e)} min="1" value={assetNum} style={{width:'100%'}}/>, [assetNum]);
  const assetPWDCycleForm = useMemo(() => <input ref={assetPWDCycleRef} type="number" min="0"  defaultValue="0" style={{width:'100%'}}/>, []);
  const assetBackUpCycleForm = useMemo(() => <input ref={assetBackUpCycleRef} type="number" min="0" defaultValue="0" style={{width:'100%'}}/>, []);
  const assetNoteForm = useMemo(() => <textarea ref={assetNoteRef} style={{width:'100%', height:'80px'}}/>, []);

  // 나중에 쓰자..
  const assetAnalysisDoneBoolForm = useMemo(() => <input ref={assetAnalysisDoneRef} type="text" style={{width:'100%'}}/>, []);
  
  const createAsset = () => {
    const payload = {
      area_alias: areaAlias,
      project: parseInt(projectId),
      num : assetNum ? assetNum : 0,
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
    
    if( ['SRV', 'DBM', 'MOB', 'ISS', 'NET'].includes(areaAlias) && payload.platform === 'NONE') payload.platform = '';
  
    const [validResult, value] = payloadEmptyCheck(payload, global.config.ASSET_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    createAssetReq(payload).then( ([result, jsonData]) => {
      if(result){ WorkSpaceContextDispatch({ type:'resetAsset' }); navigate(`/w/${projectId}/${areaAlias}/`); }else{ navigate('/auth');}
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
            <Button size="sm" onClick={createAsset} style={{marginLeft : '5px'}}>저장</Button>
            <Button as={Link} to={`/w/${projectId}/${areaAlias}/step1`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

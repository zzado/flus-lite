import { Fragment, useReducer, useRef, useMemo, useEffect } from 'react';
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { payloadEmptyCheck, getPlatformListReq, createAssetReq, deleteAssetReq, editAssetReq } from '../utils'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const stateReducer = (state, action) => {
  console.log(action)
  if(action.type === 'setAssetObj')
    return { ...state, ...action.value};
  else
    return { ...state, [action.name]: action.value};
};

const initalState = {
  num : 1,
  name: '',
  assessors: '',
  operator: '',
  note: '',
  hostname: '',
  ip_url: '',
  version: '',
  product_model: '',
  platform: 'NONE',
  platform_t : '',
  is_new: true,
  is_switch: true,
  is_external: false,
  is_financial: true,
  is_https: false,
  is_test: false,
  is_server: true,
  asset_value: 3,
  pwd_change_cycle: 0,
  backup_cycle: 0,
  platformList:[],
}

export default function AssetInfoTable(props){
  
  const { action, assetObj, areaAlias, assetList, projectObj, AssetContextDispatch } = props;
  const { ASSET_FIELD, ASSET_VALID_CHECK_FIELDS } = global.config;
  const [ assetState, assetStateDispatch ] = useReducer(stateReducer, initalState);
  //const [ platformSelector, setPlatformSelector] = useState({label:'NONE', value:'NONE'})
  const projectId = projectObj && projectObj.id;
  const navigate = useRef(useNavigate());
  console.log(assetState)

  const assetName = useMemo(()=>
    action === 'detail' ? assetState.name : 
    action === 'create' || action === 'edit' ? <input type="text" value={assetState.name} onChange={e=>assetStateDispatch({name:'name', value:e.target.value})}/> :  
    action === 'component' ? assetState.name : null
  ,[action, assetState.name]);

  const assetNum = useMemo(()=>
    action === 'detail' ? assetState.num : 
    action === 'create' || action === 'edit' ? <input type="number" value={assetState.num} onChange={e=>assetStateDispatch({name:'num', value:e.target.value})} min="1"/> :  
    action === 'component' ? assetState.num : null
  ,[action, assetState.num]);

  const assetNote = useMemo(()=>
    action === 'detail' ? assetState.note : 
    action === 'create' || action === 'edit' ? <textarea value={assetState.note} onChange={e=>assetStateDispatch({name:'note', value:e.target.value})} style={{width:'100%', height:'80px'}}/> :  
    action === 'component' ? assetState.note : null
  ,[action, assetState.note]);

  const assetHostname = useMemo(()=>
    action === 'detail' ? assetState.hostname : 
    action === 'create' || action === 'edit' ? <input type="text" value={assetState.hostname} onChange={e=>assetStateDispatch({name:'hostname', value:e.target.value})}/> :  
    action === 'component' ? assetState.hostname : null
  ,[action, assetState.hostname]);

  const assetPWDCycle = useMemo(()=>
    action === 'detail' ? assetState.pwd_change_cycle : 
    action === 'create' || action === 'edit' ? <input type="number" value={assetState.pwd_change_cycle} onChange={e=>assetStateDispatch({name:'pwd_change_cycle', value:e.target.value})} min="0" defaultValue="0"/> :  
    action === 'component' ? assetState.pwd_change_cycle : null
  ,[action, assetState.pwd_change_cycle]);

  const assetURL = useMemo(()=>
    action === 'detail' ? assetState.ip_url : 
    action === 'create' || action === 'edit' ? <input type="text" value={assetState.ip_url} onChange={e=>assetStateDispatch({name:'ip_url', value:e.target.value})}/> :  
    action === 'component' ? assetState.ip_url : null
  ,[action, assetState.ip_url]);

  const assetVersion = useMemo(()=>
    action === 'detail' ? assetState.version : 
    action === 'create' || action === 'edit' ? <input type="text" value={assetState.version} onChange={e=>assetStateDispatch({name:'version', value: e.target.value})}/> :  
    action === 'component' ? assetState.version : null
  ,[action, assetState.version]);

  const assetAssessors = useMemo(()=>
    action === 'detail' ? assetState.assessors : 
    action === 'create' || action === 'edit' ? <input type="text" value={assetState.assessors} onChange={e=>assetStateDispatch({name:'assessors', value: e.target.value})}/> :  
    action === 'component' ? assetState.assessors : null
  ,[action, assetState.assessors]);

  const assetProductModel = useMemo(()=>
    action === 'detail' ? assetState.product_model : 
    action === 'create' || action === 'edit' ? <input type="text" value={assetState.product_model} onChange={e=>assetStateDispatch({name:'product_model', value: e.target.value})}/> :  
    action === 'component' ? assetState.product_model : null
  ,[action, assetState.product_model]);

  const assetOperator = useMemo(()=>
    action === 'detail' ? assetState.operator : 
    action === 'create' || action === 'edit' ? <input type="text" value={assetState.operator} onChange={e=>assetStateDispatch({name:'operator', value: e.target.value})}/> :   
    action === 'component' ? assetState.operator : null
  ,[action, assetState.operator]);

  const assetBackUpCycle = useMemo(()=>
    action === 'detail' ? assetState.backup_cycle : 
    action === 'create' || action === 'edit' ? <input type="number" value={assetState.backup_cycle} onChange={e=>assetStateDispatch({name:'backup_cycle', value:e.target.value})} min="0" defaultValue="0"/> :  
    action === 'component' ? assetState.backup_cycle : null
  ,[action, assetState.backup_cycle]);

  const assetSwitchBool = useMemo(()=>
    action === 'detail' ? assetState.is_switch : 
    action === 'create' || action === 'edit' ? <Select value={ASSET_FIELD.IS_SWITCH.find(e=>e.value === assetState.is_switch)} onChange={e=>assetStateDispatch({name:'is_switch', value:e.value})} options={ASSET_FIELD.IS_SWITCH}/> :  
    action === 'component' ? assetState.is_switch : null
  ,[action, assetState.is_switch, ASSET_FIELD]);

  const assetExternalBool = useMemo(()=>
    action === 'detail' ? assetState.is_external : 
    action === 'create' || action === 'edit' ? <Select value={ASSET_FIELD.IS_EXTERNAL.find(e=>e.value === assetState.is_external)} onChange={e=>assetStateDispatch({name:'is_external', value:e.value})} options={ASSET_FIELD.IS_EXTERNAL}/> :  
    action === 'component' ? assetState.is_external : null
  ,[action, assetState.is_external, ASSET_FIELD]);

  const assetIsFinancialBool = useMemo(()=>
    action === 'detail' ? assetState.is_financial : 
    action === 'create' || action === 'edit' ? <Select value={ASSET_FIELD.IS_FINANCIAL.find(e=>e.value === assetState.is_financial)} onChange={e=>assetStateDispatch({name:'is_financial', value:e.value})} options={ASSET_FIELD.IS_FINANCIAL}/> :  
    action === 'component' ? assetState.is_financial : null
  ,[action, assetState.is_financial, ASSET_FIELD]);

  const assetIsHttpsBool = useMemo(()=>
    action === 'detail' ? assetState.is_https : 
    action === 'create' || action === 'edit' ? <Select value={ASSET_FIELD.IS_HTTPS.find(e=>e.value === assetState.is_https)} onChange={e=>assetStateDispatch({name:'is_https', value:e.value})} options={ASSET_FIELD.IS_HTTPS}/> :  
    action === 'component' ? assetState.is_https : null
  ,[action, assetState.is_https, ASSET_FIELD]);

  const assetPlatform = useMemo(()=>
    action === 'detail' ? assetState.platform : 
    action === 'create' ? <CreatableSelect onChange={e=>assetStateDispatch({name:'platform', value:e.value})} options={ assetState.platformList } /> :  
    action === 'edit' ? <CreatableSelect value={{value: assetState.platform, label: assetState.platform}} onChange={e=>assetStateDispatch({name:'platform', value:e.value})} options={ assetState.platformList } /> :  
    action === 'component' ? assetState.platform : null
  ,[action, assetState.platform, assetState.platformList]);

  const assetValue = useMemo(()=>
    action === 'detail' ? assetState.asset_value : 
    action === 'create' || action === 'edit' ? <Select value={{value: assetState.asset_value, label: assetState.asset_value}} onChange={e=>assetStateDispatch(e.value)} options={ [5, 4, 3, 2, 1].map(e => { return { value:e, label: e } })}/> : 
    action === 'component' ? assetState.asset_value : null
  ,[action, assetState.asset_value]);

  const assetIsTestBool = useMemo(()=>
    action === 'detail' ? assetState.is_test : 
    action === 'create' || action === 'edit' ? <Select value={ASSET_FIELD.IS_TEST.find(e=>e.value === assetState.is_test)} onChange={e=>assetStateDispatch({name:'is_test', value: e.value})} options={ASSET_FIELD.IS_TEST}/> :  
    action === 'component' ? assetState.is_test : null
  ,[action, assetState.is_test, ASSET_FIELD]);

  const assetIsServerBool = useMemo(()=>
    action === 'detail' ? assetState.is_server : 
    action === 'create' || action === 'edit' ? <Select value={ASSET_FIELD.IS_SERVER.find(e=>e.value === assetState.is_server)} onChange={e=>assetStateDispatch({name:'is_server', value: e.value})} options={ ASSET_FIELD.IS_SERVER }/> :  
    action === 'component' ? assetState.is_server : null
  ,[action, assetState.is_server, ASSET_FIELD]);

  const assetIsNewBool = useMemo(()=>
    action === 'detail' ? assetState.is_new : 
    action === 'create' || action === 'edit' ? <Select value={ASSET_FIELD.IS_NEW.find(e=>e.value === assetState.is_new)} onChange={e=>assetStateDispatch({name:'is_new', value: e.value})} options={ ASSET_FIELD.IS_NEW }/> : 
    action === 'component' ? assetState.is_new : null
  ,[action, assetState.is_new, ASSET_FIELD]);



 
  useEffect(() => {
    if((action === 'create' || action === 'edit') && projectObj.compliance)
      getPlatformListReq(projectObj.compliance, areaAlias).then( ([result, jsonData]) => (result)? assetStateDispatch({name:'platformList' ,value:jsonData}) : console.log('fetch failed'));
  }, [action, projectObj, areaAlias]);

  useEffect(() => {
    if(action === 'create' && assetList.length)
      assetStateDispatch({name:'num' ,value:assetList[assetList.length-1].num +1})
  }, [action, assetList]);

  useEffect(() => {
    if(assetObj !== false)
      assetStateDispatch({type:'setAssetObj', value: assetObj})
  }, [assetObj]);


  const createAsset = () => {
    let payload = {...assetState, area_alias: areaAlias, project: projectId };
    if( ['SRV', 'DBM', 'MOB', 'ISS', 'NET'].includes(areaAlias) && payload.platform === 'NONE'){
      alert(`[자산종류] 필드가 비어있습니다!`); 
      return false;
    }

    if(!assetState.platformList.find(e=>e.value===payload.platform)){
      payload.platform_t = payload.platform;
      payload.platform = '[[OTHER]]';
    }

    const [validResult, value] = payloadEmptyCheck(payload, ASSET_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    createAssetReq(payload).then( ([result, jsonData]) => {
      if(result){ 
        AssetContextDispatch({ type:'reset' });
        navigate.current(`/w/${projectId}/${areaAlias}/step1`); 
      }else{ console.log(jsonData); navigate.current('/auth');}
    });
  };

  const deleteAsset = ()=>{
    if(window.confirm("자산을 정말 삭제 하시겠습니까?")){
      deleteAssetReq(assetObj.id).then( (result) => {
        if(result){
          AssetContextDispatch({type:'reset'});
          navigate.current(`/w/${projectId}/${areaAlias}/step1`);
        }
      });
    }//(() ? navigate.current('/p/') : navigate.current('/auth')): console.log('delete canceled')
  };

  const editAsset = () => {
    let payload = {...assetState };
    console.log(payload);
    
    if( ['SRV', 'DBM', 'MOB', 'ISS', 'NET'].includes(areaAlias) && payload.platform === 'NONE'){
      alert(`[자산종류] 필드가 비어있습니다!`); 
      return false;
    }

    if(!assetState.platformList.find(e=>e.value===payload.platform)){
      payload.platform_t = payload.platform;
      payload.platform = '[[OTHER]]';
    }

    const [validResult, value] = payloadEmptyCheck(payload, global.config.ASSET_VALID_CHECK_FIELDS);
    if (!validResult){ alert(`[${value}] 필드가 비어있습니다!`); return false;}

    editAssetReq(assetObj.id, payload).then( ([result, jsonData]) => {
       if(result){ AssetContextDispatch({ type:'reset' }); navigate.current(`/a/${projectId}/${areaAlias}/${assetObj.id}`); }else{ navigate.current('/auth');}
    });
  };

  const tableRowsByAreaAlias = () => {
    let fragment = null;
    if (global.config.INFRA_DEVICE_AREA_LIST.includes(areaAlias)){
      fragment = (
        <Fragment>
        <tr>
          <th colSpan={2} rowSpan={ (areaAlias === 'NET') ? 3 : 2}>자산종류</th>
          <td colSpan={4} rowSpan={ (areaAlias === 'NET') ? 3 : 2}>{assetPlatform}</td>
          <th colSpan={2}>호스트명</th>
          <td colSpan={6}>{assetHostname}</td>
          <th colSpan={2}>버전</th>
          <td colSpan={4}>{assetVersion}</td>
        </tr>
        </Fragment>
      )
      if(areaAlias === 'SRV' || areaAlias === 'DBM'){
        fragment = (
          <Fragment>
          {fragment}
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={6}>{assetURL}</td>
            <th colSpan={3}>테스트/운영</th>
            <td colSpan={3}>{assetIsTestBool}</td>
          </tr>
          </Fragment>
        )
      }else{ // NET, ISS
        fragment = (
          <Fragment>
          {fragment}
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={2}>{assetURL}</td>
            <th colSpan={2}>제조사</th>
            <td colSpan={4}>{assetProductModel}</td>
            <th colSpan={2}>테스트/운영</th>
            <td colSpan={2}>{assetIsTestBool}</td>
          </tr>
          </Fragment>
        )
        if(areaAlias === 'NET'){
          fragment = (
            <Fragment>
            {fragment}
            <tr>
            <th colSpan={2}>스위치 여부</th>
            <td colSpan={2}>{assetSwitchBool}</td>
            <th colSpan={2}>연결여부(대외)</th>
            <td colSpan={2}>{assetExternalBool}</td>
            <th colSpan={2}>백업주기</th>
            <td colSpan={1}>{assetBackUpCycle}</td>
            <th colSpan={2}>PWD 변경주기</th>
            <td colSpan={1}>{assetPWDCycle}</td>
          </tr>
            </Fragment>
          )
        }
      }
    }else if(areaAlias === 'WEB'){
      fragment = (
        <Fragment>
        <tr>
          <th colSpan={2}>URL</th>
          <td colSpan={6}>{assetURL}</td>
          <th colSpan={2}>전자금융여부</th>
          <td colSpan={2}>{assetIsFinancialBool}</td>
          <th colSpan={2}>https여부</th>
          <td colSpan={2}>{assetIsHttpsBool}</td>
          <th colSpan={2}>테스트/운영</th>
          <td colSpan={2}>{assetIsTestBool}</td>
        </tr>
        </Fragment>
      )
    }else if (areaAlias === 'MOB'){
      fragment = (
        <Fragment>
        <tr>
          <th colSpan={2}>자산종류</th>
          <td colSpan={4}>{assetPlatform}</td>
          <th colSpan={2}>전자금융여부</th>
          <td colSpan={3}>{assetIsFinancialBool}</td>
          <th colSpan={2}>서버측 여부</th>
          <td colSpan={3}>{assetIsServerBool}</td>
          <th colSpan={2}>테스트/운영</th>
          <td colSpan={2}>{assetIsTestBool}</td>
        </tr>
        </Fragment>
      )
    }else if(areaAlias === 'HTS') {
      fragment = (
        <Fragment>
        <tr>
          <th colSpan={2}>전자금융여부</th>
          <td colSpan={3}>{assetIsFinancialBool}</td>
          <th colSpan={2}>테스트/운영</th>
          <td colSpan={2}>{assetIsTestBool}</td>
        </tr>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <tr>
        <th colSpan={2} rowSpan={2}>자산번호</th>
        <td colSpan={2} rowSpan={2}>{assetNum}</td>
        <th colSpan={2}>자산명</th>
        <td colSpan={8}>{assetName}</td>
        <th colSpan={2}>담당자</th>
        <td colSpan={4}>{assetOperator}</td>
      </tr>

      <tr>
        <th colSpan={2}>신규여부</th>
        <td colSpan={3}>{assetIsNewBool}</td>
        <th colSpan={2}>자산가치</th>
        <td colSpan={3}>{assetValue}</td>
        <th colSpan={2}>평가자</th>
        <td colSpan={4}>{assetAssessors}</td>
      </tr>
        {fragment}
      <tr>
        <th colSpan={2}>비고</th>
        <td colSpan={18}>{assetNote}</td>
      </tr>
      </Fragment>
    );
  };


  return (
    <Fragment>
      { action !== 'component' ? 
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold search-title">
            { action === 'detail' ? '자산 정보':
              action === 'create' ? '자산 생성':
              action === 'edit' ? '자산 편집':
              null
            }</span>
        </div>
      : null }
        <div className="card-body">
        <Table responsive="md" bordered>
          <colgroup>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
            <col width="5%"/>
          </colgroup>
          <tbody>
            {tableRowsByAreaAlias()}
          </tbody>
        </Table>
        <div className="form-actions">
        { action === 'detail' ? 
        <>
          <Button as={Link} to={`/a/${projectId}/${areaAlias}/${assetObj.id}/edit`} state={{assetObj: assetObj}}size="sm" style={{marginLeft : '5px'}}>편집</Button>
          <Button onClick={deleteAsset} size="sm" style={{marginLeft : '5px'}}>삭제</Button>
          <Button as={Link} to={`/w/${projectId}/${areaAlias}/step1`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
        </> 
        : action === 'create' ?
          <>
          <Button size="sm" onClick={createAsset} style={{marginLeft : '5px'}}>저장</Button>
          <Button as={Link} to={`/w/${projectId}/${areaAlias}/step1`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </> 
        : action === 'edit' ?
          <>
          <Button size="sm" onClick={editAsset} style={{marginLeft : '5px'}}>저장</Button>
          <Button as={Link} to={`/a/${projectId}/${areaAlias}/${assetObj.id}`} size="sm" style={{marginLeft : '5px'}}>취소</Button>
          </> 
        : null
        }
        </div>
      </div>
    </Fragment>
  );
}
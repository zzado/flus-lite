import { Fragment, useMemo } from 'react';
import { FormHelperText, FormControl, InputLabel, MenuItem, Select, TextField, TableContainer, Table, TableRow, TableBody, TableCell } from '@mui/material'
import { styled } from '@mui/system';
import CreatableSelect from 'react-select/creatable';

const TableStyle = styled('div')(
  ({ theme }) => `
  table {
    border: 1px solid rgba(224, 224, 224, 1),
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #E0E3E7;
    text-align: left;
    padding: 10px;
  }
  th {
    background-color: #E7EBF0;
    font-weight : bold
  }
  `,
);

export default function AssetInfoTable(props){
  
  const { action, assetState, assetStateDispatch, areaAlias } = props;
  const { ASSET_FIELD } = global.config;

  const assetName = useMemo(()=>
    action === 'detail' ? assetState.name : 
    action === 'create' || action === 'edit' ? 
    <TextField label="자산 이름" variant="outlined" size='small' fullWidth error={assetState.name?false : true} helperText={assetState.name? '' : '⛔입력해주세요'} value={assetState.name} onChange={e=>assetStateDispatch({name:'name', value:e.target.value})}/> : null
  ,[action, assetState.name, assetStateDispatch]);

  const assetNum = useMemo(()=>
    action === 'detail' ? assetState.num : 
    action === 'create' || action === 'edit' ? <input type="number" value={assetState.num} onChange={e=>assetStateDispatch({name:'num', value:e.target.value})} min="1"/> : null
  ,[action, assetState.num, assetStateDispatch]);

  const assetNote = useMemo(()=>
    action === 'detail' ? assetState.note : 
    action === 'create' || action === 'edit' ? <TextField size='small' fullWidth multiline rows={3} label="비고" value={assetState.note} onChange={e=>assetStateDispatch({name:'note', value:e.target.value})}/>: null
  ,[action, assetState.note, assetStateDispatch]);

  const assetHostname = useMemo(()=>
    action === 'detail' ? assetState.hostname : 
    action === 'create' || action === 'edit' ? <TextField size='small' fullWidth label="호스트명" value={assetState.hostname} helperText={assetState.hostname? '' : '⚠️필수는 아니지만 자동 점검을 위해 필요한 필드입니다'} onChange={e=>assetStateDispatch({name:'hostname', value:e.target.value})}/> : null
  ,[action, assetState.hostname, assetStateDispatch]);

  const assetPWDCycle = useMemo(()=>
    action === 'detail' ? assetState.pwd_change_cycle : 
    action === 'create' || action === 'edit' ? <input type="number" value={assetState.pwd_change_cycle} onChange={e=>assetStateDispatch({name:'pwd_change_cycle', value:e.target.value})} min="0" defaultValue="0"/> : null
  ,[action, assetState.pwd_change_cycle, assetStateDispatch]);

  const assetURL = useMemo(()=>
    action === 'detail' ? assetState.ip_url : 
    action === 'create' || action === 'edit' ? <TextField size='small' fullWidth label="IP/URL" value={assetState.ip_url} onChange={e=>assetStateDispatch({name:'ip_url', value:e.target.value})}/> : null
  ,[action, assetState.ip_url, assetStateDispatch]);

  const assetVersion = useMemo(()=>
    action === 'detail' ? assetState.version : 
    action === 'create' || action === 'edit' ? <TextField size='small' fullWidth label="버전" value={assetState.version} onChange={e=>assetStateDispatch({name:'version', value: e.target.value})}/> : null
  ,[action, assetState.version, assetStateDispatch]);

  const assetAssessors = useMemo(()=>
    action === 'detail' ? assetState.assessors : 
    action === 'create' || action === 'edit' ? <TextField size='small' fullWidth label="평가자" value={assetState.assessors} onChange={e=>assetStateDispatch({name:'assessors', value: e.target.value})}/> : null
  ,[action, assetState.assessors, assetStateDispatch]);

  const assetProductModel = useMemo(()=>
    action === 'detail' ? assetState.product_model : 
    action === 'create' || action === 'edit' ? <TextField size='small' fullWidth label="제조사" value={assetState.product_model} onChange={e=>assetStateDispatch({name:'product_model', value: e.target.value})}/> : null
  ,[action, assetState.product_model, assetStateDispatch]);

  const assetOperator = useMemo(()=>
    action === 'detail' ? assetState.operator : 
    action === 'create' || action === 'edit' ? <TextField size='small' fullWidth label="담당자" value={assetState.operator} onChange={e=>assetStateDispatch({name:'operator', value: e.target.value})}/> : null
  ,[action, assetState.operator, assetStateDispatch]);

  const assetBackUpCycle = useMemo(()=>
    action === 'detail' ? assetState.backup_cycle : 
    action === 'create' || action === 'edit' ? <input type="number" value={assetState.backup_cycle} onChange={e=>assetStateDispatch({name:'backup_cycle', value:e.target.value})} min="0" defaultValue="0"/> :  
    null
  ,[action, assetState.backup_cycle, assetStateDispatch]);

  const assetSwitchBool = useMemo(()=>
    action === 'detail' ? ASSET_FIELD.IS_SWITCH.find(e=> e.value === assetState.is_switch).label : 
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>스위치/라우터</InputLabel>
      <Select value={assetState.is_switch} label="스위치/라우터" onChange={e=>assetStateDispatch({name:'is_switch', value:e.target.value})}>
      { ASSET_FIELD.IS_SWITCH.map(e=>
        <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
        )
      }
      </Select>
    </FormControl> : null
  ,[action, assetState.is_switch, ASSET_FIELD.IS_SWITCH, assetStateDispatch]);

  const assetExternalBool = useMemo(()=>
    action === 'detail' ? ASSET_FIELD.IS_EXTERNAL.find(e=> e.value === assetState.is_external).label : 
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>외부망 연결여부</InputLabel>
      <Select value={assetState.is_external} label="외부망 연결여부" onChange={e=>assetStateDispatch({name:'is_external', value:e.target.value})}>
      { ASSET_FIELD.IS_EXTERNAL.map(e=>
        <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
        )
      }
      </Select>
    </FormControl> : null
  ,[action, assetState.is_external, ASSET_FIELD.IS_EXTERNAL, assetStateDispatch]);

  const assetIsFinancialBool = useMemo(()=>
    action === 'detail' ? ASSET_FIELD.IS_FINANCIAL.find(e=> e.value === assetState.is_financial).label : 
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>비/전자금융서비스</InputLabel>
      <Select value={assetState.is_financial} label="비/전자금융서비스" onChange={e=>assetStateDispatch({name:'is_financial', value:e.target.value})}>
      { ASSET_FIELD.IS_FINANCIAL.map(e=>
        <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
        )
      }
      </Select>
    </FormControl> : null
  ,[action, assetState.is_financial, ASSET_FIELD.IS_FINANCIAL, assetStateDispatch]);

  const assetIsHttpsBool = useMemo(()=>
    action === 'detail' ? ASSET_FIELD.IS_HTTPS.find(e=> e.value === assetState.is_https).label : 
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>HTTPS/HTTP</InputLabel>
      <Select value={assetState.is_https} label="HTTPS/HTTP" onChange={e=>assetStateDispatch({name:'is_https', value:e.target.value})}>
      { ASSET_FIELD.IS_HTTPS.map(e=>
        <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
        )
      }
      </Select>
    </FormControl> : null
  ,[action, assetState.is_https, ASSET_FIELD.IS_HTTPS, assetStateDispatch]);

  const assetPlatform = useMemo(()=>
    action === 'detail' ? assetState.platform === '[[OTHER]]' ? `${assetState.platform_t}(기타 자산)` : assetState.platform : 
    action === 'create' || action === 'edit' ?
    <FormControl fullWidth>
      <CreatableSelect styles={{menu: provided => ({ ...provided, zIndex: 9999 })}} value={{value: assetState.platform, label: assetState.platform}} onChange={e=>assetStateDispatch({name:'platform', value:e.value})} options={ assetState.platformList } /> 
      { assetState.platform ? null : <FormHelperText>⛔선택해주세요</FormHelperText> }
    </FormControl>
    : null
  ,[action, assetState.platform, assetState.platformList, assetState.platform_t, assetStateDispatch]);

  const assetValue = useMemo(()=>
    action === 'detail' ? assetState.asset_value : 
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>자산 가치</InputLabel>
      <Select value={assetState.asset_value} label="자산 가치" onChange={e=>assetStateDispatch({name:'asset_value', value:e.target.value})}>
      { [5, 4, 3, 2, 1].map(e=>
        <MenuItem key={e} value={e}>{e}</MenuItem>
        )
      }
      </Select>
    </FormControl> : null
  ,[action, assetState.asset_value, assetStateDispatch]);

  const assetIsTestBool = useMemo(()=>
    action === 'detail' ? ASSET_FIELD.IS_TEST.find(e=> e.value === assetState.is_test).label :  
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>평가 환경</InputLabel>
      <Select value={assetState.is_test} label="테스트/운영" onChange={e=>assetStateDispatch({name:'is_test', value:e.target.value})}>
      { ASSET_FIELD.IS_TEST.map(e=>
        <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
        )
      }
      </Select>
    </FormControl> : null
  ,[action, assetState.is_test, ASSET_FIELD.IS_TEST, assetStateDispatch]);

  const assetIsServerBool = useMemo(()=>
    action === 'detail' ? ASSET_FIELD.IS_SERVER.find(e=> e.value === assetState.is_server).label :  
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>서버점검 여부</InputLabel>
      <Select value={assetState.is_server} label="서버점검 여부" onChange={e=>assetStateDispatch({name:'is_server', value:e.target.value})}>
      { ASSET_FIELD.IS_SERVER.map(e=>
        <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
        )
      }
      </Select>
    </FormControl> : null
  ,[action, assetState.is_server, ASSET_FIELD.IS_SERVER, assetStateDispatch]);

  const assetIsNewBool = useMemo(()=>
    action === 'detail' ? ASSET_FIELD.IS_NEW.find(e=> e.value === assetState.is_new).label :
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>신규/기존</InputLabel>
      <Select value={assetState.is_new} label="신규/기존" onChange={e=>assetStateDispatch({name:'is_new', value:e.target.value})}>
      { ASSET_FIELD.IS_NEW.map(e=>
        <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
        )
      }
      </Select>
    </FormControl> : null
  ,[action, assetState.is_new, ASSET_FIELD.IS_NEW, assetStateDispatch]);


  const tableRowsByAreaAlias = () => {
    let fragment = null;
    if (global.config.INFRA_DEVICE_AREA_LIST.includes(areaAlias)){
      fragment = (
        <Fragment>
        <TableRow>
          <TableCell component="th" colSpan={2} rowSpan={ (areaAlias === 'NET') ? 3 : 2}>자산종류</TableCell>
          <TableCell component="td" colSpan={4} rowSpan={ (areaAlias === 'NET') ? 3 : 2}>{assetPlatform}</TableCell>
          <TableCell component="th" colSpan={2}>호스트명</TableCell>
          <TableCell component="td" colSpan={6}>{assetHostname}</TableCell>
          <TableCell component="th" colSpan={2}>버전</TableCell>
          <TableCell component="td" colSpan={4}>{assetVersion}</TableCell>
        </TableRow>
        </Fragment>
      )
      if(areaAlias === 'SRV' || areaAlias === 'DBM'){
        fragment = (
          <Fragment>
          {fragment}
          <TableRow>
            <TableCell component="th" colSpan={2}>IP/URL</TableCell>
            <TableCell component="td" colSpan={6}>{assetURL}</TableCell>
            <TableCell component="th" colSpan={3}>평가 환경</TableCell>
            <TableCell component="td" colSpan={3}>{assetIsTestBool}</TableCell>
          </TableRow>
          </Fragment>
        )
      }else{ // NET, ISS
        fragment = (
          <Fragment>
          {fragment}
          <TableRow>
            <TableCell component="th" colSpan={2}>IP/URL</TableCell>
            <TableCell component="td" colSpan={2}>{assetURL}</TableCell>
            <TableCell component="th" colSpan={2}>제조사</TableCell>
            <TableCell component="td" colSpan={4}>{assetProductModel}</TableCell>
            <TableCell component="th" colSpan={2}>평가 환경</TableCell>
            <TableCell component="td" colSpan={2}>{assetIsTestBool}</TableCell>
          </TableRow>
          </Fragment>
        )
        if(areaAlias === 'NET'){
          fragment = (
            <Fragment>
            {fragment}
            <TableRow>
            <TableCell component="th" colSpan={2}>스위치 여부</TableCell>
            <TableCell component="td" colSpan={2}>{assetSwitchBool}</TableCell>
            <TableCell component="th" colSpan={2}>대외 연결여부</TableCell>
            <TableCell component="td" colSpan={2}>{assetExternalBool}</TableCell>
            <TableCell component="th" colSpan={2}>백업주기</TableCell>
            <TableCell component="td" colSpan={1}>{assetBackUpCycle}</TableCell>
            <TableCell component="th" colSpan={2}>PWD 변경주기</TableCell>
            <TableCell component="td" colSpan={1}>{assetPWDCycle}</TableCell>
          </TableRow>
            </Fragment>
          )
        }
      }
    }else if(areaAlias === 'WEB'){
      fragment = (
        <Fragment>
        <TableRow>
          <TableCell component="th" colSpan={2}>IP/URL</TableCell>
          <TableCell component="td" colSpan={6}>{assetURL}</TableCell>
          <TableCell component="th" colSpan={2}>전자금융서비스 여부</TableCell>
          <TableCell component="td" colSpan={2}>{assetIsFinancialBool}</TableCell>
          <TableCell component="th" colSpan={2}>HTTPS/HTTP</TableCell>
          <TableCell component="td" colSpan={2}>{assetIsHttpsBool}</TableCell>
          <TableCell component="th" colSpan={2}>평가 환경</TableCell>
          <TableCell component="td" colSpan={2}>{assetIsTestBool}</TableCell>
        </TableRow>
        </Fragment>
      )
    }else if (areaAlias === 'MOB'){
      fragment = (
        <Fragment>
        <TableRow>
          <TableCell component="th" colSpan={2}>자산종류</TableCell>
          <TableCell component="td" colSpan={4}>{assetPlatform}</TableCell>
          <TableCell component="th" colSpan={2}>전자금융서비스 여부</TableCell>
          <TableCell component="td" colSpan={3}>{assetIsFinancialBool}</TableCell>
          <TableCell component="th" colSpan={2}>서버점검 여부</TableCell>
          <TableCell component="td" colSpan={3}>{assetIsServerBool}</TableCell>
          <TableCell component="th" colSpan={2}>평가 환경</TableCell>
          <TableCell component="td" colSpan={2}>{assetIsTestBool}</TableCell>
        </TableRow>
        </Fragment>
      )
    }else if(areaAlias === 'HTS') {
      fragment = (
        <Fragment>
        <TableRow>
          <TableCell component="th" colSpan={2}>전자금융서비스 여부</TableCell>
          <TableCell component="td" colSpan={3}>{assetIsFinancialBool}</TableCell>
          <TableCell component="th" colSpan={2}>평가 환경</TableCell>
          <TableCell component="td" colSpan={2}>{assetIsTestBool}</TableCell>
        </TableRow>
        </Fragment>
      )
    }
    return (
      <Fragment>
      <TableRow>
        <TableCell component="th" colSpan={2} rowSpan={2}>자산번호</TableCell>
        <TableCell component="td" colSpan={2} rowSpan={2}>{assetNum}</TableCell>
        <TableCell component="th" colSpan={2}>자산명</TableCell>
        <TableCell component="td" colSpan={8}>{assetName}</TableCell>
        <TableCell component="th" colSpan={2}>담당자</TableCell>
        <TableCell component="td" colSpan={4}>{assetOperator}</TableCell>
      </TableRow>
  
      <TableRow>
        <TableCell component="th" colSpan={2}>신규여부</TableCell>
        <TableCell component="td" colSpan={3}>{assetIsNewBool}</TableCell>
        <TableCell component="th" colSpan={2}>자산가치</TableCell>
        <TableCell component="td" colSpan={3}>{assetValue}</TableCell>
        <TableCell component="th" colSpan={2}>평가자</TableCell>
        <TableCell component="td" colSpan={4}>{assetAssessors}</TableCell>
      </TableRow>
        {fragment}
      <TableRow>
        <TableCell component="th" colSpan={2}>비고</TableCell>
        <TableCell component="td" sx={{height:'80px'}}colSpan={18}>{assetNote}</TableCell>
      </TableRow>
      </Fragment>
    );
  };


  return (
    <Fragment>
      <TableStyle>
        <TableContainer>
          <Table>
            
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
           
            <TableBody>
              {tableRowsByAreaAlias()}
            </TableBody>
          </Table>
        </TableContainer>
      </TableStyle>
      
    </Fragment>
  );
}
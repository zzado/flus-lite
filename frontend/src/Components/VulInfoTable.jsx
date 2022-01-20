import { Fragment, useState } from 'react';
import { FormControl, Select, MenuItem, TextField, TableContainer, Table, TableRow, TableBody, TableCell } from '@mui/material'
import { styled } from '@mui/system';

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


export default function VulInfoTable(props){
  const { vulObj, vulObjDispatch } = props;
  const { VUL_FIELD } = global.config;
  const [ hideField, setHideField ] = useState();

  return (
    <Fragment>
      <TableStyle>
        <TableContainer>
          <Table>
            <colgroup>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
              <col width="10%"/>
            </colgroup>
            <TableBody>
              <TableRow>
                <TableCell component="th" colSpan={1}>취약점코드</TableCell>
                <TableCell component="td" colSpan={1}>{vulObj.vulnerability_item && vulObj.vulnerability_item.code}</TableCell>
                <TableCell component="th" colSpan={1}>항목명</TableCell>
                <TableCell component="td" colSpan={5}>{vulObj.vulnerability_item && vulObj.vulnerability_item.name}</TableCell>
                <TableCell component="th" colSpan={1}>평가결과</TableCell>
                <TableCell component="td" colSpan={1}>
                <FormControl fullWidth >
                  <Select displayEmpty value={VUL_FIELD.RESULT.find(e=> e.value === vulObj.result).value} onChange={e=>vulObjDispatch( {name: 'result', value: e.target.value })}>
                  { VUL_FIELD.RESULT.map(e=>
                    <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                  )}
                  </Select>
                </FormControl>
              </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" colSpan={1}>현재상태</TableCell>
                <TableCell component="td" colSpan={9}>
                  <TextField size='small' fullWidth multiline rows={3} label="현재상태" value={vulObj.status} onChange={e=>vulObjDispatch( {name: 'status', value: e.target.value })}/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" colSpan={1}>정보수집결과</TableCell>
                <TableCell component="td" colSpan={9}>
                  <TextField size='small' fullWidth multiline rows={3} label="정보수집결과" value={vulObj.gathering_data} onChange={e=>vulObjDispatch( {name: 'gathering_data', value: e.target.value })}/>
                </TableCell>
              </TableRow>

              { (hideField) ? 
              (
                <Fragment>
                <TableRow>
                    <TableCell component="th" colSpan={1}>개별 상세설명</TableCell>
                    <TableCell component="td" colSpan={9}>
                      <TextField size='small' fullWidth multiline rows={3} label="개별 상세설명" value={vulObj.new_description} onChange={e=>vulObjDispatch( {name: 'new_description', value: e.target.value })}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" colSpan={1}>개별 조치방법</TableCell>
                    <TableCell component="td" colSpan={9}>
                      <TextField size='small' fullWidth multiline rows={3} label="개별 조치방법" value={vulObj.new_solution} onChange={e=>vulObjDispatch( {name: 'new_solution', value: e.target.value })}/>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ) : null }

              <TableRow>
                <TableCell component="td" onClick={()=>setHideField(!hideField)} style={{cursor: 'pointer', backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign:'center'}} colSpan={10}>
                  {hideField ? '접기' : '펼치기'}
                </TableCell> 
              </TableRow>
              <TableRow>
                <TableCell component="th" colSpan={1}>전달</TableCell>
                <TableCell component="td" colSpan={2}>
                  <FormControl fullWidth >
                    <Select value={VUL_FIELD.IS_REPROTED.find(e=> e.value === vulObj.is_reported).value} onChange={e=>vulObjDispatch( {name: 'is_reported', value: e.target.value })}>
                    { VUL_FIELD.IS_REPROTED.map(e=>
                      <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                    )}
                    </Select>
                  </FormControl>
                  
                </TableCell>
                <TableCell component="th" colSpan={1}>조치</TableCell>
                <TableCell component="td" colSpan={2}>
                  <FormControl fullWidth >
                    <Select value={VUL_FIELD.IS_PATCHED.find(e=> e.value === vulObj.is_patched).value} onChange={e=>vulObjDispatch( {name: 'is_patched', value: e.target.value })}>
                    { VUL_FIELD.IS_PATCHED.map(e=>
                      <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                    )}
                    </Select>
                  </FormControl>
                  
                </TableCell>
                <TableCell component="th" colSpan={1}>신규취약점</TableCell>
                <TableCell component="td" colSpan={2}>
                  <FormControl fullWidth >
                    <Select value={VUL_FIELD.IS_NEW.find(e=> e.value === vulObj.is_new).value} onChange={e=>vulObjDispatch( {name: 'is_new', value: e.target.value })}>
                    { VUL_FIELD.IS_NEW.map(e=>
                      <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
                    )}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TableStyle>
    </Fragment>
  );
}
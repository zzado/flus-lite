import { Fragment, useMemo } from 'react';
import { Box, IconButton, Checkbox, TableHead, Select, TextField, TableContainer, Table, TableRow, TableBody, TableCell } from '@mui/material'
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const TableStyle = styled('div')(
  ({ theme }) => `
  table {
    border: 1px solid rgba(224, 224, 224, 1),
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    text-align: center;
  }
  th {
    background-color: #E7EBF0;
    font-weight : bold
  }
  `,
);

export default function POCInfoTable(props){
  const { pocListDispatch, pocList, vulId } = props;
  const { VUL_FIELD } = global.config;
  
  const currentDate = useMemo(()=>{ const temp = new Date(); return `${temp.getFullYear()}-${temp.getMonth()+1}-${temp.getDate()}` },[]);
  const newPocData = useMemo( ()=> ({id:0, result: 'Y', auto_result: 'Y', found_date: currentDate, is_reported: false, is_new: true, is_patched: false, note:'', point: '', reported_date: undefined, patched_date: undefined, vulnerability: vulId}), [vulId, currentDate]);



  
  return (
    <Fragment>
      <Box>

        
      </Box>
      <TableStyle>
        <TableContainer>
          <Table>
            <TableHead>

              <TableCell component="th" padding="checkbox">
                <IconButton onClick={ ()=> pocListDispatch({type:'append', value: newPocData })}>
                  <AddIcon/>
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row" >취약항목</TableCell>
              <TableCell component="th" scope="row" >발견일</TableCell>
              <TableCell component="th" scope="row" >전달</TableCell>
              <TableCell component="th" scope="row" >조치확인</TableCell>
              <TableCell component="th" scope="row" >신규/기존</TableCell>
              <TableCell component="th" scope="row" >비고</TableCell>
              <TableCell component="th" scope="row" >삭제</TableCell>
            </TableHead>
            <TableBody>
            { pocList.map( (pocObj, idx) => 
              <TableRow key = {idx}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>

                <TableCell>
                  <TextField size='small' fullWidth multiline rows={3} label="취약항목" value={pocObj.point} onChange={e=>pocListDispatch({type:'update', idx: idx, name: 'point', value: e.target.value })}/>
                </TableCell>

                <TableCell>
                  <input type="date" value={pocObj.found_date || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'found_date',value: e.target.value })} style={{width:'100%'}}/>
                </TableCell>

                <TableCell>
                  <Checkbox color="primary" size="small" style={{width:'10%'}} checked={pocObj.is_reported || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'is_reported', value: e.target.checked })}/>
                  
                  <input type="date" disabled={!pocObj.is_reported} value={pocObj.reported_date || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'reported_date', value: e.target.value })} style={{width:'85%'}}/>
                </TableCell>

                <TableCell>
                  <Checkbox color="primary" size="small" style={{width:'10%'}} checked={pocObj.is_patched || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'is_patched', value: e.target.checked })}/>

                  <input type="date" disabled={!pocObj.is_patched} name="patched_date" value={pocObj.patched_date || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'patched_date', value: e.target.value })} style={{width:'85%'}}/>
                </TableCell>

                <TableCell>
                  <Select value={VUL_FIELD.IS_NEW.filter(e=> e.value === pocObj.is_new)} onChange={(e)=> pocListDispatch( {type: 'update', idx: idx, name: "is_new", value: e.value })} options={ VUL_FIELD.IS_NEW }/>
                </TableCell>

                <TableCell>
                  <textarea value={pocObj.note} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'note', value: e.target.value })} style={{width:'100%'}}/>
                </TableCell>
                
                <TableCell>
                  <IconButton sx={{mr:2}} onClick={()=> pocListDispatch({type:'delete', value: idx })}>
                    <DeleteIcon sx={{ fontSize: 40 }}/>
                  </IconButton>
                  </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableStyle>
    </Fragment>
  );
}
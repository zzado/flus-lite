import { Fragment, useMemo } from 'react';
import { Table } from "react-bootstrap";
import Select from 'react-select';
import { Button } from "react-bootstrap";

export default function POCInfoTable(props){
  const { pocListDispatch, pocList, vulId } = props;
  const { VUL_FIELD } = global.config;
  
  const currentDate = useMemo(()=>{ const temp = new Date(); return `${temp.getFullYear()}-${temp.getMonth()+1}-${temp.getDate()}` },[]);
  const newPocData = useMemo( ()=> ({id:0, result: 'Y', auto_result: 'Y', found_date: currentDate, is_reported: false, is_new: true, is_patched: false, note:'', point: '', reported_date: undefined, patched_date: undefined, vulnerability: vulId}), [vulId, currentDate]);

  return (
    <Fragment>
      <div className="card-header py-3">
        <span className="m-0 font-weight-bold">취약항목</span>
        <Button size="sm" onClick={ ()=> pocListDispatch({type:'append', value: newPocData })} style={{marginRight: '5px', marginLeft: '15px', float: 'none'}}>추가</Button>
      </div>
      <Table responsive="md" hover >
        <thead>
          <tr>
            <th style={{minWidth: '40px', width: '4%'}}><input type="checkbox" /></th>
            <th style={{minWidth: '60px', width: '8%'}}>번호</th>
            <th style={{minWidth: '60px', width: '26%'}}>취약항목</th>
            <th style={{minWidth: '144px', width: '10%'}}>발견일</th>
            <th style={{minWidth: '144px', width: '10%'}}>전달</th>
            <th style={{minWidth: '144px', width: '10%'}}>조치확인</th>
            <th style={{minWidth: '60px', width: '10%'}}>신규/기존</th>
            <th style={{minWidth: '60px', width: '16.5%'}}>비고</th>
            <th style={{minWidth: '30px', width: '5%'}}>삭제</th>
          </tr>
        </thead>
        <tbody>
        { pocList.map( (pocObj, idx) => 
          <tr key = {idx}>
            <td></td>
            <td>{idx+1}</td>
            <td><textarea value={pocObj.point || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'point', value: e.target.value })} style={{width:'100%'}}/></td>
            <td><input type="date" value={pocObj.found_date || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'found_date',value: e.target.value })} style={{width:'100%'}}/></td>
            <td>
              <input type="checkbox" checked={pocObj.is_reported || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'is_reported', value: e.target.checked })} style={{width:'10%'}}/>
              <input type="date" disabled={!pocObj.is_reported} value={pocObj.reported_date || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'reported_date', value: e.target.value })} style={{width:'85%'}}/>
            </td>
            <td>
              <input type="checkbox" name="is_patched" checked={pocObj.is_patched} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'is_patched', value: e.target.checked })} style={{width:'10%'}}/>
              <input type="date" disabled={!pocObj.is_patched} name="patched_date" value={pocObj.patched_date || ''} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'patched_date', value: e.target.value })} style={{width:'85%'}}/>
            </td>
            <td><Select value={VUL_FIELD.IS_NEW.filter(e=> e.value === pocObj.is_new)} onChange={(e)=> pocListDispatch( {type: 'update', idx: idx, name: "is_new", value: e.value })} options={ VUL_FIELD.IS_NEW }/></td>
            <td><textarea value={pocObj.note} onChange={(e)=> pocListDispatch({type:'update', idx: idx, name: 'note', value: e.target.value })} style={{width:'100%'}}/></td>
            
            <td><Button size="sm" onClick={()=> pocListDispatch({type:'delete', value: idx })} style={{float: 'none'}}>X</Button></td>
          </tr>
        )}
        </tbody>
      </Table>
    </Fragment>
  );
}
import { Fragment, useState, useRef } from 'react';
import { faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FileUploader } from "react-drag-drop-files";
import { Table, Button } from "react-bootstrap";
import Select from 'react-select';
import { createScreenshotReq } from '../utils'

export default function VulInfoTable(props){
  const { vulObj, vulObjDispatch } = props;
  const { VUL_FIELD } = global.config;
  const [ hideField, setHideField ] = useState();

  return (
    <Fragment>
      <Table responsive="md" bordered>
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
        <tbody>
          <tr>
            <th colSpan={1}>취약점코드</th>
            <td colSpan={1}>{vulObj.vulnerability_item && vulObj.vulnerability_item.code}</td>
            <th colSpan={1}>항목명</th>
            <td colSpan={5}>{vulObj.vulnerability_item && vulObj.vulnerability_item.name}</td>
            <th colSpan={1}>평가결과</th>
            <td colSpan={1}><Select value={ VUL_FIELD.RESULT.filter(e=> e.value === vulObj.result) } onChange={(e)=> vulObjDispatch( {name: 'result', value: e.value }) } options={ VUL_FIELD.RESULT }/></td>
          </tr>
          <tr>
            <th colSpan={1}>현재상태</th>
            <td colSpan={9}><textarea onChange={(e)=> vulObjDispatch( {name: 'status', value: e.target.value })} rows={8} value={vulObj.status} style={{width: '100%', padding: 0, margin: 0}}/></td>
          </tr>
          <tr>
            <th colSpan={1}>정보수집결과</th>
            <td colSpan={9}><textarea onChange={(e)=> vulObjDispatch( {name: 'gathering_data', value: e.target.value })} rows={8} value={vulObj.gathering_data} style={{ width: '100%', padding: 0, margin: 0 }} /></td>
          </tr>

          { (hideField) ? 
          (
            <Fragment>
            <tr>
                <th colSpan={1}>개별 상세설명</th>
                <td colSpan={9}><textarea onChange={(e)=> vulObjDispatch( {name: 'new_description', value: e.target.value })} cols={40} rows={10} style={{ width: '100%', padding: 0, margin: 0 }} value={vulObj.new_description} /></td>
            </tr>
            <tr>
                <th colSpan={1}>개별 조치방법</th>
                <td colSpan={9}><textarea onChange={(e)=> vulObjDispatch( {name: 'new_solution', value: e.target.value })} cols={40} rows={10} style={{ width: '100%', padding: 0, margin: 0 }} value={vulObj.new_solution} /></td>
              </tr>
            </Fragment>
          ) : null }

          <tr>
            <td onClick={()=>setHideField(!hideField)} style={{cursor: 'pointer', backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign:'center'}} colSpan={10}>
              {hideField ? '접기' : '펼치기'}
              {hideField ? (<FontAwesomeIcon icon={faCaretSquareUp} />) : (<FontAwesomeIcon icon={faCaretSquareDown} />) } 
            </td> 
          </tr>
          <tr>
            <th colSpan={1}>전달</th>
            <td colSpan={2}><Select value={VUL_FIELD.IS_REPROTED.filter(e=> e.value === vulObj.is_reported)} onChange={(e)=> vulObjDispatch( {name: 'is_reported', value: e.value }) } options={ VUL_FIELD.IS_REPROTED }/></td>
            <th colSpan={1}>조치</th>
            <td colSpan={2}><Select value={VUL_FIELD.IS_PATCHED.filter(e=> e.value === vulObj.is_patched)} onChange={(e)=> vulObjDispatch( {name: 'is_patched', value: e.value }) } options={ VUL_FIELD.IS_PATCHED }/></td>
            <th colSpan={1}>신규취약점</th>
            <td colSpan={2}><Select value={VUL_FIELD.IS_NEW.filter(e=> e.value === vulObj.is_new)} onChange={(e)=> vulObjDispatch( {nname: 'is_new', value: e.value }) } options={ VUL_FIELD.IS_NEW }/></td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
}
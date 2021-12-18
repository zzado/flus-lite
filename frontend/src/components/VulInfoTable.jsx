import { Fragment } from 'react';
import { Table } from "react-bootstrap";

export default function VulInfoTable(props){
  return (
    <Fragment>

      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{width: '10%'}}>취약점코드</th>
            <td style={{width: '10%'}}><span className="label">S1-SRV-001</span></td>
            <th style={{width: '10%'}}>항목명</th>
            <td colSpan={5} style={{textAlign: 'left', wordBreak: 'break-all'}}>SNMP Community 스트링 설정 미흡&nbsp;&nbsp;<a onclick="javascript:detail_vulnerability_item('EFI-202101-SRV-AIX-001');"><i className="fas fa-info-circle" style={{color: '#999'}} /></a></td>
            <th style={{width: '10%'}}>평가결과</th>
            <td style={{width: '10%'}}><input id="hidden_vul_result" type="hidden" defaultValue /><select name="vul_result" className="form-control form-control-user select" style={{maxWidth: '100%', minWidth: '80px', margin: '0px', padding: '0px'}} id="id_vul_result"> <option value="X" selected="selected">미정(선택안함)</option> <option value="Y">취약</option> <option value="N">양호</option> <option value="NA">NA</option> </select>
            </td>
          </tr>
          <tr>
            <th style={{width: '10%'}}>현재상태</th>
            <td colSpan={9} className="vul_status" style={{textAlign: 'left'}}><textarea name="status" cols={40} rows={10} className="form-control form-control-user" style={{maxWidth: '100%', padding: 0, margin: 0}} id="id_status" defaultValue={"예) * SNMP community string이 public, private 또는 복잡도가 낮게 설정되어 있음"} /></td>
          </tr>
          <tr>
            <th style={{width: '10%'}}>정보수집결과</th>
            <td colSpan={9} className="vul_gathering_data" style={{textAlign: 'left'}}><textarea name="gathering_data" cols={40} rows={10} className="form-control form-control-user" style={{maxWidth: '100%', padding: 0, margin: 0}} id="id_gathering_data" defaultValue={""} /></td>
          </tr>
          <tr id="tr_new_description" style={{display: 'none'}}>
            <th style={{width: '10%'}}>개별 상세설명</th>
            <td colSpan={9} className="vul_new_description" style={{textAlign: 'left'}}><textarea name="new_description" cols={40} rows={10} className="form-control form-control-user" style={{maxWidth: '100%', padding: 0, margin: 0}} id="id_new_description" defaultValue={""} /></td>
          </tr>
          <tr id="tr_new_solution" style={{display: 'none'}}>
            <th style={{width: '10%'}}>개별 조치방법</th>
            <td colSpan={9} className="vul_new_solution" style={{textAlign: 'left'}}><textarea name="new_solution" cols={40} rows={10} className="form-control form-control-user" style={{maxWidth: '100%', padding: 0, margin: 0}} id="id_new_solution" defaultValue={""} /></td>
          </tr>
          <tr>
            <td onclick="moreArea(this);" style={{cursor: 'pointer', backgroundColor: '#f5f5f5', fontWeight: 'bold'}} colSpan={10}>펼치기<i className="fas fa-caret-square-down" /></td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}
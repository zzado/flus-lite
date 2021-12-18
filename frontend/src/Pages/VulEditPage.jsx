import { useEffect, Fragment, useContext, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Select from 'react-select';
import { getVulReq } from '../utils'
import { Table } from "react-bootstrap";
import { faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function VulEditPage(props){
  const { state } = useLocation();
  const { projectId, areaAlias, assetId, vulId } = useParams();
  const [ vulObj, setVulObj ] = useState(() => state ? state.vulObj : null);
  const [ showHiddenField, setShowHiddenField ] = useState(false);
  
  useEffect(() => {
    if(vulObj === null) getVulReq(vulId).then( ([result, jsonData])=> (result)? setVulObj(jsonData) : console.log(1));
  },[vulId, vulObj]);

  const SubMenuBox = () => {
    return (
      <div className="card-header py-3">
        <span className='m-0 font-weight-bold search-title'>취약점 상세</span>
        <Button size="sm" as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetId}`}>뒤로</Button>
      </div>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
      <SubMenuBox/>
        <div className="card-body">
          <Table responsive="md" bordered>
            <thead>
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
            </thead>
            <tbody>
              <tr>
                <th>취약점코드</th>
                <td>{vulObj && vulObj.vulnerability_item.code}</td>
                <th>항목명</th>
                <td colSpan={5}>{vulObj && vulObj.vulnerability_item.name}</td>
                <th>평가결과</th>
                <td><Select onChange={(e) => e} options={[{value: 'Y',label:'취약'},{value: 'N',label:'양호'},{value: 'NA',label:'NA'},{value: '',label:'미정'}]}/></td>
              </tr>
              <tr>
                <th>현재상태</th>
                <td colSpan={9}><textarea rows={10} defaultValue={vulObj && vulObj.status} style={{width: '100%', padding: 0, margin: 0}}/></td>
              </tr>
              <tr>
                <th>정보수집결과</th>
                <td colSpan={9}><textarea rows={10} defaultValue={vulObj && vulObj.gathering_data} style={{ width: '100%', padding: 0, margin: 0 }} /></td>
              </tr>

              { (showHiddenField) ? 
              (
                <Fragment>
                <tr>
                    <th>개별 상세설명</th>
                    <td colSpan={9}><textarea cols={40} rows={10} style={{ width: '100%', padding: 0, margin: 0 }} defaultValue={vulObj && vulObj.new_description} /></td>
                </tr>
                <tr>
                    <th>개별 조치방법</th>
                    <td colSpan={9}><textarea cols={40} rows={10} style={{ width: '100%', padding: 0, margin: 0 }} defaultValue={vulObj && vulObj.new_solution} /></td>
                  </tr>
                </Fragment>
              ) : null }

              <tr>
                <td onClick={()=>setShowHiddenField(!showHiddenField)} style={{cursor: 'pointer', backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign:'center'}} colSpan={10}>
                  {showHiddenField ? '접기' : '펼치기'}
                  {showHiddenField ? (<FontAwesomeIcon icon={faCaretSquareUp} />) : (<FontAwesomeIcon icon={faCaretSquareDown} />) } 
                </td> 
              </tr>
            </tbody>
          </Table>

          <Table responsive="md" bordered>
            <tbody>
              <tr>
                <th style={{width: '10%'}}>전달</th>
                <td><Select onChange={(e) => e} options={[{value: 'Y',label:'전달'},{value: 'N',label:'미전달'}]}/></td>
                <th style={{width: '10%'}}>조치</th>
                <td><Select onChange={(e) => e} options={[{value: 'Y',label:'조치'},{value: 'N',label:'미조치'}]}/></td>
                <th style={{width: '10%'}}>신규취약점</th>
                <td><Select onChange={(e) => e} options={[{value: 'Y',label:'신규'},{value: 'N',label:'기존'}]}/></td>
              </tr>
              <tr>
                <th>첨부파일</th>
                <td colSpan={9}>
                  <div style={{width: '100%', float: 'left'}}>
                    <label><input type="file" id="btn-upload_referfile" name="referfile" multiple /></label>
                  </div>
                  <div className="reference_files">
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="card-header py-3">
            <span className="m-0 font-weight-bold">취약항목</span>
            <button type="button" id="addButton" className="btn btn-sm btn-dark" style={{marginRight: '5px', marginLeft: '15px', float: 'none', height: '25px', fontSize: '0.5rem', padding: '5px 10px 5px 10px'}}>추가</button>
            <button type="button" id="multiRemoveButton" className="btn btn-sm btn-dark" style={{marginRight: '5px', marginLeft: '0px', float: 'none', height: '25px', fontSize: '0.5rem', padding: '5px 10px 5px 10px'}}>선택삭제</button>
          </div>
          <div className="error-box" />
          <Table responsive="md" hover >
            <thead>
              <tr>
                <th style={{minWidth: '40px', width: '4%'}}><input type="checkbox" id="checkall2" /></th>
                <th style={{minWidth: '60px', width: '8%'}}>번호</th>
                <th style={{minWidth: '60px', width: '26%'}}>취약항목</th>
                <th style={{minWidth: '144px', width: '10%'}}>발견일</th>
                <th style={{minWidth: '144px', width: '10%'}}>전달</th>
                <th style={{minWidth: '144px', width: '10%'}}>조치확인</th>
                <th style={{minWidth: '60px', width: '8%'}}>신규/기존</th>
                <th style={{minWidth: '60px', width: '16.5%'}}>비고</th>
                <th style={{minWidth: '60px', width: '6%'}}>삭제</th>
              </tr>
            </thead>
            <tbody id="poc_tbody">
            </tbody>
          </Table>
 
          <div className="form-actions">
          </div>
        </div>
      </div>
    </Fragment>
  );
}

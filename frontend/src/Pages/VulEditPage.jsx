import { useEffect, Fragment, useContext, useState, useRef, useMemo, useReducer } from 'react';
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Select from 'react-select';
import { getVulReq } from '../utils'
import { Table } from "react-bootstrap";
import { faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FileUploader } from "react-drag-drop-files";



const stateReducer = (state, action) => {
  if(action.type){
    switch(action.type) {
      case 'pocListAppend':
        return { 
          ...state,
          pocList: [...state.pocList, action.value] 
        }
      case 'pocListDelete':
        return { 
          ...state,
          pocList: state.pocList.filter((e, idx) => idx !== action.value)
        }
      case 'pocListUpdate':
        state.pocList[action.idx][action.value.name] = action.value.value
        return { 
          ...state,
          pocList: state.pocList
        }
      
      default:
        return state;
    }
  }else{
    return {
      ...state,
      [action.name]: action.value,
    }
  }
    
};

export default function VulEditPage(props){
  const { state } = useLocation();
  const { projectId, areaAlias, assetId, vulId } = useParams();

  const [ vulObj, setVulObj ] = useState(() => state ? state.vulObj : {});

  const { VUL_FIELD } = global.config;
  
  const [ pageState, pageStateDispatch ] = useReducer(stateReducer, {
    vulResult: {},
    vulReported: {},
    vulPatched : {},
    vulNew: {},
    vulStatus: useRef(null),
    vulCollectedData: useRef(null),
    vulDescription: useRef(null),
    vulSolution: useRef(null),
    showHiddenField: false,
    pocList : [],
  });

  const {
    vulResult,
    vulStatus,
    vulCollectedData,
    vulDescription,
    vulSolution,
    vulReported,
    vulPatched,
    vulNew,
    showHiddenField,
    pocList
  } = pageState;

  useEffect(() => {
    if(Object.keys(vulObj).length === 0){
      getVulReq(vulId).then( ([result, jsonData])=> (result)? setVulObj(jsonData) : console.log('error'));
    }else{
      pageStateDispatch({name: 'vulResult', value: VUL_FIELD.STATE.filter(e=> e.value === vulObj.result )});
      pageStateDispatch({name: 'vulReported', value: VUL_FIELD.REPROTED.filter(e=> e.value === vulObj.is_reported )});
      pageStateDispatch({name: 'vulPatched', value: VUL_FIELD.PATCHED.filter(e=> e.value === vulObj.is_patched )});
      pageStateDispatch({name: 'vulNew', value: VUL_FIELD.NEW.filter(e=> e.value === vulObj.is_new )});
      pageStateDispatch({name: 'vulNew', value: VUL_FIELD.NEW.filter(e=> e.value === vulObj.is_new )});
      pageStateDispatch({name: 'pocList', value: vulObj.pocs});
    }
  },[vulId, vulObj]);

  const saveVulObj = () =>{


  }

  const SubMenuBox = () => {
    return (
      <div className="card-header py-3">
        <span className='m-0 font-weight-bold search-title'>취약점 상세</span>
        <Button size="sm" as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetId}`}>뒤로</Button>
        <Button size="sm" onClick={saveVulObj}>저장</Button>
      </div>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
      <SubMenuBox/>
        <div className="card-body">
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
                <td colSpan={1}><Select value={vulResult} onChange={(e) => pageStateDispatch( {name: 'vulResult', value: e }) } options={ VUL_FIELD.STATE }/></td>
              </tr>
              <tr>
                <th colSpan={1}>현재상태</th>
                <td colSpan={9}><textarea ref={vulStatus} rows={8} defaultValue={vulObj && vulObj.status} style={{width: '100%', padding: 0, margin: 0}}/></td>
              </tr>
              <tr>
                <th colSpan={1}>정보수집결과</th>
                <td colSpan={9}><textarea ref={vulCollectedData} rows={8} defaultValue={vulObj && vulObj.gathering_data} style={{ width: '100%', padding: 0, margin: 0 }} /></td>
              </tr>

              { (showHiddenField) ? 
              (
                <Fragment>
                <tr>
                    <th colSpan={1}>개별 상세설명</th>
                    <td colSpan={9}><textarea ref={vulDescription} cols={40} rows={10} style={{ width: '100%', padding: 0, margin: 0 }} defaultValue={vulObj && vulObj.new_description} /></td>
                </tr>
                <tr>
                    <th colSpan={1}>개별 조치방법</th>
                    <td colSpan={9}><textarea ref={vulSolution} cols={40} rows={10} style={{ width: '100%', padding: 0, margin: 0 }} defaultValue={vulObj && vulObj.new_solution} /></td>
                  </tr>
                </Fragment>
              ) : null }

              <tr>
                <td onClick={()=>pageStateDispatch({name: 'showHiddenField', value: !showHiddenField})} style={{cursor: 'pointer', backgroundColor: '#f5f5f5', fontWeight: 'bold', textAlign:'center'}} colSpan={10}>
                  {showHiddenField ? '접기' : '펼치기'}
                  {showHiddenField ? (<FontAwesomeIcon icon={faCaretSquareUp} />) : (<FontAwesomeIcon icon={faCaretSquareDown} />) } 
                </td> 
              </tr>
              <tr>
                <th colSpan={1}>전달</th>
                <td colSpan={2}><Select value={vulReported} onChange={(e) => pageStateDispatch( {name: 'vulReported', value: e }) } options={ VUL_FIELD.REPROTED }/></td>
                <th colSpan={1}>조치</th>
                <td colSpan={2}><Select value={vulPatched} onChange={(e) => pageStateDispatch( {name: 'vulPatched', value: e }) } options={ VUL_FIELD.PATCHED }/></td>
                <th colSpan={1}>신규취약점</th>
                <td colSpan={2}><Select value={vulNew} onChange={(e) => pageStateDispatch( {name: 'vulNew', value: e }) } options={ VUL_FIELD.NEW }/></td>
              </tr>
              <tr>
                <th colSpan={1}>첨부파일</th>
                <td colSpan={9}>
                  <FileUploader name="file" types={["JPG", "PNG", "GIF"]} />
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="card-header py-3">
            <span className="m-0 font-weight-bold">취약항목</span>
            <Button size="sm" onClick={ ()=> pageStateDispatch({type:'pocListAppend', value: {point:'zzado'} })} style={{marginRight: '5px', marginLeft: '15px', float: 'none'}}>추가</Button>
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
                <th style={{minWidth: '60px', width: '8%'}}>신규/기존</th>
                <th style={{minWidth: '60px', width: '16.5%'}}>비고</th>
                <th style={{minWidth: '60px', width: '6%'}}>삭제</th>
              </tr>
            </thead>
            <tbody>
            { pocList.map( (pocObj, idx) => 
              <tr key = {idx}>
                <td><input type="checkbox" /></td>
                <td>{idx+1}</td>
                <td><input type="text" name="point" value={pocObj.point} onChange={(e)=> pageStateDispatch({type:'pocListUpdate', idx: idx, value: e.target })} style={{width:'100%'}}/></td>
                <td><input type="date" name="found_date" value={pocObj.found_date} onChange={(e)=> pageStateDispatch({type:'pocListUpdate', idx: idx, value: e.target })} style={{width:'100%'}}/></td>
                <td><input type="date"  name="reported_date" value={pocObj.reported_date} onChange={(e)=> pageStateDispatch({type:'pocListUpdate', idx: idx, value: e.target })} style={{width:'100%'}}/></td>
                <td><input type="date" name="patched_date" value={pocObj.patched_date} onChange={(e)=> pageStateDispatch({type:'pocListUpdate', idx: idx, value: e.target })} style={{width:'100%'}}/></td>
                <td><Select options={ VUL_FIELD.NEW }/></td>
                <td>{pocObj.note}</td>
                <td><Button size="sm" onClick={()=> pageStateDispatch({type:'pocListDelete', value: idx })} style={{float: 'none'}}>X</Button></td>
              </tr>
            )}
            </tbody>
          </Table>
 
          <div className="form-actions">
          </div>
        </div>
      </div>
    </Fragment>
  );
}

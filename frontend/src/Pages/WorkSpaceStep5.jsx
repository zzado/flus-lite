import { Fragment, useContext, useState, useRef, useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { AssetContext } from '../Context/AssetContext';
import { exportHtmlReporttReq } from '../utils';
import FileSaver from 'file-saver';

export default function WorkSpaceStep5(){
  const { AssetContextState, AssetContextDispatch } = useContext(AssetContext);
  const { assetList } = AssetContextState;
  const { projectId, areaAlias } = useParams();


  const exportHtml = useCallback(()=> exportHtmlReporttReq(projectId, areaAlias).then(([result, resData])=> (result)? FileSaver.saveAs(resData, `[${areaAlias}] 취약점 목록.html`) : alert('error')), [projectId, areaAlias])

  const exportDocx = useCallback(()=> exportHtmlReporttReq(projectId, areaAlias).then(([result, resData])=> (result)? FileSaver.saveAs(resData, `[${areaAlias}] 취약점 목록.html`) : alert('error')), [projectId, areaAlias])

  const exportXlsx = useCallback(()=> exportHtmlReporttReq(projectId, areaAlias).then(([result, resData])=> (result)? FileSaver.saveAs(resData, `[${areaAlias}] 취약점 목록.html`) : alert('error')), [projectId, areaAlias])

  const SubMenuBox = () => {
    return(
      <Fragment>
      <div className="card-header py-3">
        <Button size="sm" onClick={()=> exportDocx()} style={{marginLeft : '5px'}}>분야별 결과서(DOCX)</Button>
        <Button size="sm" onClick={()=> exportHtml()} style={{marginLeft : '5px'}}>취약점 목록(HTML)</Button>
        <Button size="sm" onClick={()=> exportXlsx()} style={{marginLeft : '5px'}}>취약점 목록(XLSX)</Button>
      </div>
      </Fragment>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <SubMenuBox />
        <div className="card-body">
        <Table responsive="md" hover >
          <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>번호</th>
              <th>자산코드</th>
              <th>업무명/용도</th>
              <th>평가자</th>
              <th>담당자</th>
              <th>진행상황</th>
            </tr>
          </thead>
          <tbody>
            { assetList && assetList.map( (assetObj, idx) => (
            <tr key={idx}>
              <td><input type="checkbox"/></td>
              <td>{idx}</td>
              <td><span className="label">{assetObj.code}</span></td>
              <td>{assetObj.name}</td>
              <td ><span className="label">{assetObj.assessors}</span></td>
              <td ><span className="label">{assetObj.operator}</span></td>
              <td><span className="label label-secondary">{assetObj.manual_done ? '완료' : '진행중'}</span></td>
            </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </Fragment>
  );
}

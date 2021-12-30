import { Fragment, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { AssetContext } from '../Context/AssetContext';

export default function WorkSpaceStep1(){
  const { AssetContextState } = useContext(AssetContext);
  const { assetList } = AssetContextState;
  const { projectId, areaAlias } = useParams();


  const SubMenuBox = () => {
    return (
      <div className="card-header py-3">
        <Button size="sm" as={Link} to={`/a/${projectId}/${areaAlias}/create`} style={{marginLeft : '5px'}}>자산 등록</Button>
        <Button size="sm" as={Link} to={`/w/${projectId}/${areaAlias}/asset-grid`} style={{marginLeft : '5px'}}>일괄 등록</Button>
      </div>
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
              <th>분석</th>
            </tr>
          </thead>
          <tbody>
            { assetList && assetList.map( (assetObj, idx) => (
            <tr key={idx}>
              <td><input type="checkbox"/></td>
              <td>{idx}</td>
              <td><span className="label">{assetObj.code}</span></td>
              <td><Link to={`/a/${projectId}/${areaAlias}/${assetObj.id}`} state={{assetObj: assetObj}}>{assetObj.name}</Link></td>
              <td ><span className="label">{assetObj.assessors}</span></td>
              <td ><span className="label">{assetObj.operator}</span></td>
              <td><span className="label label-secondary">{assetObj.manual_done ? '완료' : '진행중'}</span></td>
              <td style={{padding:'0'}}><Button as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetObj.id}`} state={{assetObj: assetObj}} size="sm" style={{float:"none"}}>점검</Button></td>
            </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </Fragment>
  );
}

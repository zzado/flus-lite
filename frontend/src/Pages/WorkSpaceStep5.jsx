import { Fragment, useContext, useState, useRef, useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { AssetContext } from '../Context/AssetContext';
import { loadAssetGridData, saveAssetRealGrid, exportAssetXlsx, importAssetXlsx } from '../Services/assetGridFunc';
import { GridView, LocalDataProvider } from 'realgrid';


export default function WorkSpaceStep5(){
  const { AssetContextState, AssetContextDispatch } = useContext(AssetContext);
  const { assetList } = AssetContextState;
  const { projectId, areaAlias } = useParams();

  const [isGridView, setIsGridView] = useState(false);
  const isFileUploadRef = useRef(false);

  const [gridView, setGridView] = useState(null);
  const [dataProvider, setDataProvider] = useState(null);


  const gridInit = useCallback(() => {
    if(gridView === null && dataProvider === null){
      const tempObj1 = new GridView(document.getElementById('realgrid'));
      const tempObj2 = new LocalDataProvider(false);
      setGridView(tempObj1);
      setDataProvider(tempObj2);
      loadAssetGridData(tempObj1, tempObj2, assetList, areaAlias);
    }else{
      loadAssetGridData(gridView, dataProvider, assetList, areaAlias);
    }
  },[gridView, dataProvider, assetList, areaAlias]);

  const saveGrid = () => {
    if(gridView && dataProvider){
      if(saveAssetRealGrid(gridView, dataProvider, projectId, areaAlias)){
        AssetContextDispatch({ type:'reset' });
        alert('저장 완료');
        setIsGridView(false);
      }
    }
  };
  
  const SubMenuBox = () => {
    return(
      <Fragment>
      <div className="card-header py-3">
        <Button size="sm" onClick={()=> alert(1)} style={{marginLeft : '5px'}}>분야별 결과서(DOCX)</Button>
        <Button size="sm" onClick={()=> alert(1)} style={{marginLeft : '5px'}}>취약점 목록(HTML)</Button>
        <Button size="sm" onClick={()=> alert(1)} style={{marginLeft : '5px'}}>취약점 목록(XLSX)</Button>
      </div>
      </Fragment>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <SubMenuBox />
        <div className="card-body" style={ {display : (isGridView)? 'none' : ''} }>
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
        <div id='realgrid' style={{display : (isGridView)? '' : 'none'}}></div>
      </div>
    </Fragment>
  );
}

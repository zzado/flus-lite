import { Fragment, useContext, useState, useRef, useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { AssetContext } from '../Context/AssetContext';
import { loadAssetGridData, saveAssetRealGrid, exportAssetXlsx, importAssetXlsx } from '../Services/assetGridFunc';
import { GridView, LocalDataProvider } from 'realgrid';


export default function WorkSpaceStep2(){
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
    return (isGridView) ? (
      <Fragment>
      <div className="card-header py-3">
        <Button size="sm" onClick={()=> loadAssetGridData(gridView, dataProvider, assetList, areaAlias)} style={{marginLeft : '5px'}}>Reload</Button>
        <Button size="sm" onClick={saveGrid} style={{marginLeft : '5px'}}>Save</Button>
        <Button size="sm" onClick={()=> exportAssetXlsx(gridView, `[자산] ${areaAlias}.xlsx`, '자산')} style={{marginLeft : '5px'}}>Export</Button>
        <Button size="sm" onClick={() => isFileUploadRef.current.click() } style={{marginLeft : '5px'}}>Import</Button>
        <Button size="sm" onClick={()=> setIsGridView(!isGridView)} style={{marginLeft : '5px'}}>뒤로</Button>
        <input type="file" onChange={(e)=> importAssetXlsx(gridView, dataProvider, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/>
      </div>
      </Fragment>
    ) : 
     (
      <div className="card-header py-3">
        <Button size="sm" as={Link} to={`/a/${projectId}/${areaAlias}/create`} style={{marginLeft : '5px'}}>자산 등록</Button>
        <Button size="sm" onClick={() => { setIsGridView(!isGridView); gridInit();}} style={{marginLeft : '5px'}}>일괄 등록</Button>
      </div>
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
        <div id='realgrid' style={{display : (isGridView)? '' : 'none'}}></div>
      </div>
    </Fragment>
  );
}

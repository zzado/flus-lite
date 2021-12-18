import { Fragment, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import { WorkSpaceContext } from '../Context/WorkSpaceContext';
import { loadGridData, saveGridData, exportXlsx, importXlsx } from '../Services/realGrid';
import { GridView, LocalDataProvider } from 'realgrid';


export default function WorkSpaceStep1(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { WorkSpaceContextState, WorkSpaceContextDispatch } = useContext(WorkSpaceContext);
  const { assetList } = WorkSpaceContextState;
  const { projectList } = appContextState;
  const { projectId, areaAlias } = useParams();

  const [isGridView, setIsGridView] = useState(false);
  const isFileUploadRef = useRef(false);

  const [gridView, setGridView] = useState(null);
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    if( projectList.length )appContextDispatch({ type: 'setProject', value: projectId });
  },[projectList, projectId]);

  useEffect(() => {
    appContextDispatch({ type: 'setArea', value: areaAlias });
    setIsGridView(false);
  },[areaAlias]);

  const realGridInit = useCallback(() => {
    if(gridView === null && dataProvider === null){
      const tempObj1 = new GridView(document.getElementById('realgrid'));
      const tempObj2 = new LocalDataProvider(false);
      setGridView(tempObj1);
      setDataProvider(tempObj2);
      loadGridData(tempObj1, tempObj2, assetList, areaAlias);
    }else{
      loadGridData(gridView, dataProvider, assetList, areaAlias);
    }
  },[gridView, dataProvider, assetList, areaAlias]);

  const saveRealGrid = useCallback(() => {
    if(gridView && dataProvider){
      if(saveGridData(gridView, dataProvider, projectId, areaAlias)){
        WorkSpaceContextDispatch({ type:'resetAsset' });
        alert('저장 완료');
        setIsGridView(false);
      }
    }
  },[gridView, dataProvider, assetList, areaAlias]);

  const SubMenuBox = () => {
    return (isGridView) ? (
      <Fragment>
      <div className="card-header py-3">
        <Button size="sm" onClick={()=> loadGridData(gridView, dataProvider, assetList, areaAlias)} style={{marginLeft : '5px'}}>Reload</Button>
        <Button size="sm" onClick={saveRealGrid} style={{marginLeft : '5px'}}>Save</Button>
        <Button size="sm" onClick={()=> exportXlsx(gridView)} style={{marginLeft : '5px'}}>Export</Button>
        <Button size="sm" onClick={() => isFileUploadRef.current.click() } style={{marginLeft : '5px'}}>Import</Button>
        <Button size="sm" onClick={()=> setIsGridView(!isGridView)} style={{marginLeft : '5px'}}>뒤로</Button>
        <input type="file" onChange={(e)=> importXlsx(gridView, dataProvider, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/>
      </div>
      </Fragment>
    ) : 
     (
      <div className="card-header py-3">
        <Button size="sm" as={Link} to={`/a/${projectId}/${areaAlias}/create`} style={{marginLeft : '5px'}}>자산 등록</Button>
        <Button size="sm" onClick={() => { setIsGridView(!isGridView); realGridInit();}} style={{marginLeft : '5px'}}>일괄 등록</Button>
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
              <th>-</th>
              <th>-</th>
              <th>분석go!</th>
            </tr>
          </thead>
          <tbody>
            { assetList && assetList.map( (assetObj, idx) => (
            <tr key={idx}>
              <td><input type="checkbox"/></td>
              <td>{idx}</td>
              <td><span className="label">{assetObj.code}</span></td>
              <td>{assetObj.name}</td>
              <td >-</td>
              <td >-</td>
              <td><Button as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetObj.id}`} size="sm">Go</Button></td>
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

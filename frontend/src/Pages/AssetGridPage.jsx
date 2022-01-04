import { Fragment, useContext, useState, useRef, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AssetContext } from '../Context/AssetContext';
import { loadAssetGridData, saveAssetRealGrid, exportAssetXlsx, importAssetXlsx } from '../Services/assetGridFunc';
import { GridView, LocalDataProvider } from 'realgrid';


export default function AssetGridPage(){
  const { AssetContextState, AssetContextDispatch } = useContext(AssetContext);
  const { assetList } = AssetContextState;
  const { projectId, areaAlias } = useParams();
  const gridRef = useRef();
  const [gridMaxSize, setGridMaxSize] = useState(false);
  const isFileUploadRef = useRef(false);

  const [gridView, setGridView] = useState(null);
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    if(gridView === null && dataProvider === null){
      const tempObj1 = new GridView(gridRef.current);
      const tempObj2 = new LocalDataProvider(false);
      setGridView(tempObj1);
      setDataProvider(tempObj2);
      loadAssetGridData(tempObj1, tempObj2, assetList, areaAlias);
    }else{
      loadAssetGridData(gridView, dataProvider, assetList, areaAlias);
    }
  },[assetList]);


  const saveGrid = () => {
    if(gridView && dataProvider){
      if(saveAssetRealGrid(gridView, dataProvider, projectId, areaAlias)){
        AssetContextDispatch({ type:'reset' });
        alert('저장 완료');
      }
    }
  };
  
  const SubMenuBox = () => {
    return (
      <Fragment>
      <div className="card-header py-3">
        {/* <Button size="sm" onClick={()=> loadAssetGridData(gridView, dataProvider, assetList, areaAlias)} style={{marginLeft : '5px'}}>Reload</Button> */}
        <Button size="sm" onClick={()=> setGridMaxSize(!gridMaxSize) } style={{marginLeft : '5px'}}>{gridMaxSize ? '최소화' : '최대화'}</Button>
        <Button size="sm" onClick={ saveGrid } style={{marginLeft : '5px'}}>Save</Button>
        <Button size="sm" onClick={()=> exportAssetXlsx(gridView, `[자산] ${areaAlias}.xlsx`, '자산')} style={{marginLeft : '5px'}}>Export</Button>
        <Button size="sm" onClick={() => isFileUploadRef.current.click() } style={{marginLeft : '5px'}}>Import</Button>
        <Button size="sm" as={Link} to={`/w/${projectId}/${areaAlias}/step1`} style={{marginLeft : '5px'}}>뒤로</Button>
        <input type="file" onChange={(e)=> importAssetXlsx(gridView, dataProvider, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/>
      </div>
      </Fragment>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <div style={ gridMaxSize ? {'width':'100%', 'height':'100%', 'position':'fixed', 'top': 0, 'left': 0, 'zIndex':9999, 'backgroundColor': 'white'} : {'width':'100%', 'height':'700px'}}>
          <SubMenuBox />
          <div ref={gridRef} style={{'width':'100%', 'height':'100%'}}/>
        </div>
      </div>
    </Fragment>
  );
}

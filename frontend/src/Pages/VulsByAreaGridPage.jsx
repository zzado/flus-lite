import { Fragment, useEffect, useState, useRef, useContext } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { GridView, LocalDataProvider } from 'realgrid';
import { loadVulsGridData, saveVulRealGrid, exportVulXlsx, importVulXlsx } from '../Services/vulGridFunc';
import { VulsByAreaContext } from '../Context/VulsByAreaContext';

export default function VulsByAssetGridPage(){
  const { projectId, areaAlias } = useParams();
  const { VulsByAreaContextState } = useContext(VulsByAreaContext);
  const { vulList } = VulsByAreaContextState;
  
  const [gridView, setGridView] = useState(null);
  const [gridMaxSize, setGridMaxSize] = useState(false);
  const [dataProvider, setDataProvider] = useState(null);

  const isFileUploadRef = useRef(false);
  const gridRef = useRef();
  const navigate = useRef(useNavigate());

  useEffect(() => {
    if(gridView === null && dataProvider === null){
      const tempObj1 = new GridView(gridRef.current);
      const tempObj2 = new LocalDataProvider(false);
      setGridView(tempObj1);
      setDataProvider(tempObj2);
      if(vulList.length) loadVulsGridData(tempObj1, tempObj2, vulList, areaAlias);
    }else{
      if(vulList.length) loadVulsGridData(gridView, dataProvider, vulList, areaAlias);
    }
  },[vulList, areaAlias]);
  
  const saveGrid = () => {
    if(gridView && dataProvider){
      if(saveVulRealGrid(gridView, dataProvider, projectId, areaAlias)){
        alert('저장 완료');
      }
    }
  };

  const SubMenuBox = () => {
    return (
      <div className="card-header py-3">
        <Button size="sm" onClick={() => saveGrid()} style={{marginLeft : '5px'}}>저장</Button>
        <Button size="sm" as={Link} to={`/w/${projectId}/${areaAlias}/step3`} style={{marginLeft : '5px'}}>뒤로</Button>
        <Button size="sm" onClick={()=> exportVulXlsx(gridView, `[취약점] ${areaAlias}.xlsx`, '취약점')} style={{marginLeft : '5px'}}>Export</Button>
        
        <Button size="sm" onClick={() => isFileUploadRef.current.click() } style={{marginLeft : '5px'}}>Import</Button>
        
        <input type="file" onChange={(e)=> importVulXlsx(gridView, dataProvider, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/>
        
        <Button size="sm" onClick={()=> setGridMaxSize(!gridMaxSize)} >{gridMaxSize? '최소화' : '최대화'}</Button>
      </div>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <div style={ gridMaxSize ? {'width':'100%', 'height':'100%', 'position':'fixed', 'top': 0, 'left': 0, 'zIndex':1, 'backgroundColor': 'white'} : {'width':'100%', 'height':'700px'}}>
          <SubMenuBox/>
            <div ref={gridRef} style={{'width':'100%', 'height':'100%'}}/>
        </div>
      </div>
    </Fragment>
  );
}

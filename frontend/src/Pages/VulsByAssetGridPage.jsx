import { Fragment, useEffect, useState, useRef } from 'react';
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import { GridView, LocalDataProvider } from 'realgrid';
import { loadVulsGridData, saveVulRealGrid, exportVulXlsx, importVulXlsx } from '../Services/vulGridFunc';
import { VulsByAssetContext } from '../Context/VulsByAssetContext';
import { useContext } from 'react';

export default function VulsByAssetGridPage(){

  const { projectId, areaAlias, assetId } = useParams();

  const { VulsByAssetContextState, VulsByAssetContextDispatch } = useContext(VulsByAssetContext);
  const { vulList, assetObj } = VulsByAssetContextState;
  

  const [gridView, setGridView] = useState(null);
  const [gridMaxSize, setGridMaxSize] = useState(false);
  const [dataProvider, setDataProvider] = useState(null);

  const isFileUploadRef = useRef(false);
  const gridRef = useRef();
  
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
      if(saveVulRealGrid(gridView, dataProvider, projectId, areaAlias, assetId)){
        VulsByAssetContextDispatch({type:'reset'});
        alert('저장 완료');
      }
    }
  };

  const SubMenuBox = () => {
    return (
      <div className="card-header py-3">
        <Button size="sm" onClick={() => { saveGrid();}} style={{marginLeft : '5px'}}>저장</Button>
        <Button size="sm" as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetId}`} >뒤로</Button>
        <Button size="sm" onClick={()=> exportVulXlsx(gridView, `[취약점] ${areaAlias}.xlsx`, '취약점')} style={{marginLeft : '5px'}}>Export</Button>
        <Button size="sm" onClick={() => isFileUploadRef.current.click() } style={{marginLeft : '5px'}}>Import</Button>
        <input type="file" onChange={(e)=> importVulXlsx(gridView, dataProvider, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/>
        <Button size="sm" onClick={()=>setGridMaxSize(!gridMaxSize)} >{gridMaxSize? '최소화' : '최대화'}</Button>
      </div>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className='m-0 font-weight-bold search-title'>자산 별 취약점</span>
          <Button size="sm" as={Link} to={`/w/${projectId}/${areaAlias}/step1`} >뒤로</Button>
        </div>
        <div className="card-body">
          <AssetInfoTable
            areaAlias = {areaAlias}
            assetName={assetObj.name}
            assetNum = {assetObj.code}
            assetNote = {assetObj.note}
            assetHostname = {assetObj.hostname}
            assetSwitchBool = {assetObj.is_switch? 'true': 'false'}
            assetExternalBool = {assetObj.is_external? 'true': 'false'}
            assetBackUpCycle = {assetObj.backup_cycle}
            assetPWDCycle = {assetObj.pwd_change_cycle}
            assetURL = {assetObj.ip_url}
            assetIsFinancialBool = {assetObj.is_financial? 'true': 'false'}
            assetIsHttpsBool = {assetObj.is_https? 'true': 'false'}
            assetVersion = {assetObj.version}
            assetAssessors = {assetObj.assessors}
            assetPlatform = {assetObj.platform === '[[OTHER]]' ? `기타 (${assetObj.platform_t})` : assetObj.platform }
            assetProductModel = {assetObj.product_model}
            assetValue = {assetObj.asset_value}
            assetOperator = {assetObj.operator}
            assetAnalysisDoneBool = {assetObj.manual_done? 'true': 'false'}
            assetIsTestBool = { assetObj.is_test? 'true': 'false'}
            assetIsServerBool = {assetObj.is_server? 'true': 'false'}
            assetIsNewBool = {assetObj.is_new? 'true': 'false'}
          />

          <div style={ gridMaxSize ? {'width':'100%', 'height':'100%', 'position':'fixed', 'top': 0, 'left': 0, 'zIndex':1, 'backgroundColor': 'white'} : {'width':'100%', 'height':'500px'}}>
            <SubMenuBox/>
            <div ref={gridRef} style={{'width':'100%', 'height':'100%'}}/>
          </div>
        </div>
        
      </div>
    </Fragment>
  );
}

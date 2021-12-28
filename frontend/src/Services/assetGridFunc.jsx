import { saveAssetGridDataReq } from '../utils'
import { setGridViewCommonConfig, setDataProviderCommonConfig, assetColunms, assetFields, initData} from './gidConfig';
import XLSX from 'xlsx'


export function loadAssetGridData(gridView, dataProvider, assetList, areaAlias){
    gridView.setDataSource(dataProvider);
  
    let columns = [];
    let fields = assetFields;
  
    for(let field of global.config.ASSET_GRID_FIELD[areaAlias]){
      columns.push(assetColunms.find(e=>e.name === field));
    }
    
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
  
    if(assetList.length){
      dataProvider.setRows(assetList);
    }else {
      initData[0]['code'] = `${global.config.AREA_SIGNATURE[areaAlias]}01`;
      dataProvider.setRows(initData);
      dataProvider.setRowState(0, 'created', true);
    }
  
    setGridViewCommonConfig(gridView);
    setGridViewAssetConfig(gridView);
  
    setDataProviderCommonConfig(dataProvider);
    setDataProviderAssetConfig(dataProvider);
  }
  
  export function saveAssetRealGrid(gridView, dataProvider, projectId, areaAlias){
    gridView.commit(true);
    
    let invaildColumns = gridView.validateCells(null, false);
    if(invaildColumns !== null){
      gridView.showEditor();
      gridView.setFocus();
      alert('올바르지 않은 데이터가 있습니다.');
      return;
    }
  
    let createdRow = []; 
    let updatedRow = [];
    let deletedRow = [];
    
    let updatedRowList = dataProvider.getAllStateRows();
    for(let _ of updatedRowList['created']) {
      createdRow.push(dataProvider.getJsonRow(_));
    }
  
    for(let _ of dataProvider.getUpdatedCells(null)){
      const idx = dataProvider.getJsonRow(_['__rowId'])['id'];
      updatedRow.push({ 'id'  : idx, 'data' : _['updatedCells'] });
    }
    
    for(let _ of updatedRowList['deleted']) 
      deletedRow.push(dataProvider.getJsonRow(_)['id']);
    //for(let _ of updatedRowList['deleted']) deletedRow.push(dataProvider.getJsonRow(_));
  
    if(createdRow.length || updatedRow.length || deletedRow.length){
      let gridData = {
        'createdRow' : createdRow,
        'updatedRow' : updatedRow,
        'deletedRow' : deletedRow,
      };
      console.log(gridData);
      gridView.showToast({'message':'저장중입니다..'}, true);
      saveAssetGridDataReq(gridData, projectId, areaAlias).then( ([result, jsonData]) => {
        if(result) { gridView.hideToast(); dataProvider.clearRowStates(true,false); console.log(jsonData)} else {console.log(jsonData)}
      });
      return true;
    }else{
      alert('변경사항이 없습니다');
      return false;
    }
  }

  export async function importAssetXlsx(gridView, dataProvider, fileObj) {
    const data = await fileObj.arrayBuffer();
    const workBook = XLSX.read(data);
    const workSheet = workBook.Sheets['자산'];
    let sheetData = XLSX.utils.sheet_to_json(workSheet)
    sheetData = convertAssetSheetData(sheetData);
    let rowsData = dataProvider.getJsonRows(0,-1,true);
    
    for(let sheetRow of sheetData){
      const oldRowIdx = rowsData.findIndex( (e)=> (parseInt(e.code.slice(1)) === parseInt(sheetRow.code.slice(1))) ? e : false);
      if(oldRowIdx === -1){
        dataProvider.addRow(sheetRow);
      }else{
        dataProvider.updateRow(oldRowIdx, sheetRow);
      }
    }
  
    for(let rowIdx in rowsData){
      const oldRowIdx = sheetData.findIndex( (e)=> (parseInt(e.code.slice(1)) === parseInt(rowsData[rowIdx].code.slice(1))) ? e : false);
      if(oldRowIdx === -1){
        dataProvider.setRowState(rowIdx, 'deleted', true);
      }
    }
  }
  
  
  
  
  function convertAssetSheetData(sheetData) {
    let convertedSheetData = [];
    for(let rowData of sheetData){
      let tempRowData = {};
      for(let _ in rowData){
        const columData = assetColunms.find(e=>e.header.text === _);
        tempRowData[columData.name] = typeof(rowData[_]) === 'string' ? rowData[_].replaceAll('\r\n', '\n') : rowData[_];
      }
      convertedSheetData.push(tempRowData)
    }
    return convertedSheetData;
  }
  


function setDataProviderAssetConfig(dataProvider){
    dataProvider.setOptions({
      softDeleting: true,
      restoreMode:'explicit',
    });
  
    dataProvider.onRowInserted = function (prov, row) {
      let assetCode= prov.getValue(row-1, 'code');
      assetCode = (assetCode === '' || assetCode === null) ? '' : assetCode = assetCode[0] + (parseInt(assetCode.slice(1))+1).toString();
      prov.setValue( row, 'code', assetCode );
    };
  }
  
  function setGridViewAssetConfig(gridView){
    gridView.onValidateColumn = function(grid, column, inserting, value) {
      let error = {level:'error', message: ''};
      if(column.fieldName === 'asset_value'){
        if( parseInt(value) <= 0 || parseInt(value) >5){
          error.message = `${column.fieldName} 필드는 1~5 사이의 숫자만 입력 가능합니다`;
          return error;
        }
      }
  
      if(['code', 'name', 'is_new', 'is_test', 'platform', 'asset_value'].includes(column.fieldName)){
        if(value===undefined || value===''){
          error.message = `${column.fieldName} 필드는 필수 입력값 입니다`;
          return error;
        }
      }
    }
  }


  export function exportAssetXlsx(gridView, exportFileName, exportSheetName){
    gridView.exportGrid({
      type: "excel",
      target: "local",
      fileName: exportFileName, 
      showProgress: true,
      progressMessage: "엑셀 Export중입니다.",
      indicator: 'hidden',
      header: 'default',
      footer: 'hidden',
      compatibility: true,
      //allColumns : true,
      separateRows: true,
      sheetName: exportSheetName,
    });
  }
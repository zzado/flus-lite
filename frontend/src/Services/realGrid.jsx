import { assetColunms, assetFields, initData } from './data';
import { saveAssetGridDataReq } from '../utils'
import XLSX from 'xlsx'

export function loadGridData(gridView, dataProvider, assetList, areaAlias){
  gridView.setDataSource(dataProvider);

  let columns = [];
  let fields = assetFields;

  for(let field of global.config.ASSET_FIELD[areaAlias]){
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
  setGridViewAssetValidator(gridView);
  setDataProviderCommonConfig(dataProvider);

}

export function saveGridData(gridView, dataProvider, projectId, areaAlias){
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
  
  for(let _ of updatedRowList['deleted']) deletedRow.push(dataProvider.getJsonRows(_)[0]['id']);
  //for(let _ of updatedRowList['deleted']) deletedRow.push(dataProvider.getJsonRow(_));

  if(createdRow.length || updatedRow.length || deletedRow.length){
    let gridData = {
      'createdRow' : createdRow,
      'updatedRow' : updatedRow,
      'deletedRow' : deletedRow,
    };
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

export function exportXlsx(gridView){
  gridView.exportGrid({
    type: "excel",
    target: "local",
    fileName: "gridExportSample.xlsx", 
    showProgress: true,
    progressMessage: "엑셀 Export중입니다.",
    indicator: 'hidden',
    header: 'default',
    footer: 'hidden',
    compatibility: true,
    //allColumns : true,
    sheetName : 'halo'
  });
}

export async function importXlsx(gridView, dataProvider, fileObj) {
  const data = await fileObj.arrayBuffer();
  const workBook = XLSX.read(data);
  const workSheet = workBook.Sheets['halo'];
  let sheetData = XLSX.utils.sheet_to_json(workSheet)
  sheetData = convertAssetSheetData(sheetData);
  console.log(sheetData);
  let rowsData = dataProvider.getJsonRows(0,-1,true);
  console.log(dataProvider.getRows());
  console.log(rowsData);
  for(let sheetRow of sheetData){

    const oldRowIdx = rowsData.findIndex( (e)=> (parseInt(e.code.slice(1)) === parseInt(sheetRow.code.slice(1))) ? e : false);
    
    if(oldRowIdx === -1){
      console.log('신규');
      console.log(sheetRow);
      dataProvider.addRow(sheetRow);
    }else{
      console.log('기존');
      let a = dataProvider.getJsonRow(oldRowIdx);
      dataProvider.updateRow(oldRowIdx, sheetRow);
    }
  }

}


function convertAssetSheetData(sheetData) {
  let convertedSheetData = [];
  for(let rowData of sheetData){
    let tempRowData = {};
    for(let _ in rowData){
      const columData = assetColunms.find(e=>e.header.text === _);
      tempRowData[columData.name] = rowData[_];
    }
    convertedSheetData.push(tempRowData)
  }
  return convertedSheetData;
}


function setDataProviderCommonConfig(dataProvider){
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

function setGridViewCommonConfig(gridView){
  gridView.setOptions({
    undoable: true, 
  });

  gridView.setCheckBar({
    visible: false
  });

  gridView.setHeader({
    height :40
  });

  gridView.setSortingOptions({
    enabled: true,
    toast: {
      visible: true,
      message : '정렬 중입니다...',
    }
  });

  gridView.setFilteringOptions({
    toast:{
      visible: true,
      message: '필터링 중입니다...',
    }
  });

  gridView.setDisplayOptions({
    fitStyle: 'even',
    useFocusClass: true,
    rightClickable: false,
  });

  gridView.setEditOptions({
    insertable: true,
    appendable: true,
    deletable: true,
    commitLevel: 'error',
  });

  gridView.setDisplayOptions({
    rowResizable: true,
    eachRowResizable: true,
    selectionStyle : "rows",

  });

  gridView.setContextMenu([
    {label: '행 삭제', tag: 'deleteRow'},
    {label: '아래에 행 삽입', tag: 'insertRow'},
    {label: '-'},
  ]);

  gridView.onContextMenuPopup = function(grid, x, y, elementName){
    return elementName.cellType !== "header";
  };

  gridView.onContextMenuItemClicked = function(grid, menu, data) {
    if (menu.tag === 'deleteRow') {
      gridView.deleteSelection(true);
    }else if(menu.tag === 'insertRow'){
      gridView.beginInsertRow(data.itemIndex, true);
    }
  };
  gridView.onCurrentRowChanged =  function (grid, oldRow, newRow) {
    let curr = grid.getCurrent();
    if (newRow === -1 && curr.itemIndex > -1) {grid.commit(true)}
  };
}

function setGridViewAssetValidator(gridView){

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

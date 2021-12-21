import { assetColunms, assetFields, initData, vulColunms, vulFields } from './data';
import { saveAssetGridDataReq } from '../utils'
import XLSX from 'xlsx'

export function loadVulsGridData(gridView, dataProvider, assetObj, vulList){
  gridView.setDataSource(dataProvider);

  let columns = [];
  let fields = vulFields;

  for(let field of global.config.VUL_GRID_FIELD[assetObj.area_alias]){
    console.log(field)
    columns.push(vulColunms.find(e=>e.name === field));
  }
  console.log(fields);
  console.log(columns);
  let convertedVulList = convertVulJsonData(assetObj, vulList);
  console.log(convertedVulList);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  if(vulList.length){
    dataProvider.setRows(convertedVulList);
  }

  setGridViewCommonConfig(gridView);
  setGridViewVulConfig(gridView);
  setDataProviderCommonConfig(dataProvider);
  setDataProviderVulConfig(dataProvider);
}

function convertVulJsonData(assetObj, vulList){
  console.log(vulList);
  let resultList = [];
  for(let vulObj of vulList){
    let tempObj = {
      vul_id: vulObj.id,
      asset_code: assetObj.code,
      asset_hostname: assetObj.hostname,
      asset_platform: ((assetObj.platform === '[[OTHER]]') ? assetObj.platform_t : assetObj.platform),
      vulitem_code: vulObj.vulnerability_item.code,
      vulitem_name: vulObj.vulnerability_item.name,
      vulitem_description: vulObj.vulnerability_item.description,
      vulitem_checking_guide: vulObj.vulnerability_item.checking_guide,
      vulitem_judgment_guide: vulObj.vulnerability_item.judgment_guide,
      vul_gathering_data: vulObj.gathering_data,
      vul_status: vulObj.status, 
      poc_id : '',
      poc_point: '', 
      poc_found_date: '',
      poc_reported_date: '',
      poc_patched_date: '',
      poc_is_new: '',
      poc_note: '',
    };
    if(vulObj.pocs.length !== 0){
      for(let [idx, pocObj] of vulObj.pocs.entries()){
        let tempObj2 = {...tempObj};
        tempObj2.poc_id= pocObj.id
        tempObj2.poc_point= pocObj.point
        tempObj2.poc_found_date= pocObj.found_date
        tempObj2.poc_reported_date= pocObj.reported_date
        tempObj2.poc_patched_date= pocObj.patched_date
        tempObj2.poc_is_new= pocObj.is_new
        tempObj2.poc_note= pocObj.note
        if(idx !== 0){
          tempObj2.vulitem_description= ''
          tempObj2.vulitem_checking_guide= ''
          tempObj2.vulitem_judgment_guide= ''
          tempObj2.vul_status= ''
          tempObj2.vul_gathering_data=''
          tempObj2.vulitem_name= ''
        }
        resultList.push(tempObj2);
      }
    }else{
      resultList.push(tempObj);
    }
  }
  return resultList;
}

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
  
  for(let _ of updatedRowList['deleted']) deletedRow.push(dataProvider.getJsonRows(_)[0]['id']);
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

export function saveVulRealGrid(gridView, dataProvider, projectId, areaAlias){
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
    const vulIdx = dataProvider.getJsonRow(_['__rowId'])['vul_id'];
    const pocIdx = dataProvider.getJsonRow(_['__rowId'])['poc_id'];
    updatedRow.push({ 'vulId': vulIdx, 'pocId': pocIdx, 'data' : _['updatedCells'] });
  }
  
  for(let _ of updatedRowList['deleted']) deletedRow.push(dataProvider.getJsonRows(_)[0]['id']);
  //for(let _ of updatedRowList['deleted']) deletedRow.push(dataProvider.getJsonRow(_));

  if(createdRow.length || updatedRow.length || deletedRow.length){
    let gridData = {
      'createdRow' : createdRow,
      'updatedRow' : updatedRow,
      'deletedRow' : deletedRow,
    };
    console.log(gridData);
    
    return true;
  }else{
    alert('변경사항이 없습니다');
    return false;
  }
}

export function exportXlsx(gridView, exportFileName, exportSheetName){
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

export async function importVulXlsx(gridView, dataProvider, fileObj) {
  const data = await fileObj.arrayBuffer();
  const workBook = XLSX.read(data);
  const workSheet = workBook.Sheets['취약점'];
  let sheetData = XLSX.utils.sheet_to_json(workSheet)
  sheetData = convertVulSheetData(sheetData);
  let rowsData = dataProvider.getJsonRows(0,-1,true);
  console.log(sheetData);
  console.log(rowsData);
  let doneList = [];
  for(let sheetRow of sheetData){
    //const oldRowIdx = rowsData.findIndex( (e)=> (`${e.asset_code}/${e.vulitem_code}` === `${sheetRow.asset_code}/${sheetRow.vulitem_code}` ) ? e : false);
    const oldRowIdx = rowsData.findIndex( (e)=> (`${e.asset_code}/${e.vulitem_code}` === `${sheetRow.asset_code}/${sheetRow.vulitem_code}` ) ? e : false);

    if(oldRowIdx === -1){
      dataProvider.addRow(sheetRow);
    }else{
      dataProvider.updateRow(oldRowIdx, sheetRow);
    }
  }

  for(let rowIdx in rowsData){
    const oldRowIdx = sheetData.findIndex( (e)=> (`${e.asset_code}/${e.vulitem_code}` === `${rowsData[rowIdx].asset_code}/${rowsData[rowIdx].vulitem_code}`) ? e : false);
    if(oldRowIdx === -1){
      
      dataProvider.setRowState(rowIdx, 'deleted', true);
    }
  }
}

function convertVulSheetData(sheetData) {
  let convertedSheetData = [];
  for(let rowData of sheetData){
    let tempRowData = {};
    for(let _ in rowData){
      const columData = vulColunms.find(e=>e.header.text === _);
      tempRowData[columData.name] = rowData[_];
    }
    convertedSheetData.push(tempRowData)
  }
  return convertedSheetData;
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
    selectionStyle : "block",
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

function setDataProviderVulConfig(dataProvider){
  dataProvider.setOptions({
    softDeleting: true,
    restoreMode:'explicit',
  });

  dataProvider.onRowInserted = function (prov, row) {
    const vulCode = prov.getValue(row-1, 'vulitem_code');
    const vulId = prov.getValue(row-1, 'vul_id');
    const assetCode = prov.getValue(row-1, 'asset_code');
    prov.setValue( row, 'vulitem_code', vulCode );
    prov.setValue( row, 'asset_code', assetCode );
    prov.setValue( row, 'vul_id', vulId );
    prov.setValue( row, 'poc_id', 0 );
  };
}

function setGridViewVulConfig(gridView){



}

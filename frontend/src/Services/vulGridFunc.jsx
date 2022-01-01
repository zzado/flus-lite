import { saveVulGridDataReq, } from '../utils';
import {
  setGridViewCommonConfig,
  setDataProviderCommonConfig,
  vulColunms,
  vulFields,
} from './gidConfig';
import XLSX from 'xlsx';

export function loadVulsGridData(gridView, dataProvider, vulList, areaAlias) {
  gridView.setDataSource(dataProvider);

  let columns = [];
  let fields = vulFields;

  for (let field of global.config.VUL_GRID_FIELD[areaAlias]) {
    //console.log(field);
    columns.push(vulColunms.find((e) => e.name === field));
  }
  //console.log(fields);
  //console.log(columns);
  let convertedVulList = convertVulJsonData(vulList);
  //console.log(convertedVulList);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  if (vulList.length) {
    dataProvider.setRows(convertedVulList);
  }

  setGridViewCommonConfig(gridView);
  setGridViewVulConfig(gridView, dataProvider);
  setDataProviderCommonConfig(dataProvider);
  setDataProviderVulConfig(dataProvider);
}

function convertVulJsonData(vulList) {
  console.log(vulList);
  let resultList = [];
  for (let vulObj of vulList) {
    let tempObj = {
      vul_id: vulObj.id,
      asset_code: vulObj.asset.code,
      asset_hostname: vulObj.asset.hostname,
      asset_platform:
        vulObj.asset.platform === '[[OTHER]]'
          ? vulObj.asset.platform_t
          : vulObj.asset.platform,
      vulitem_code: vulObj.vulnerability_item.code,
      vulitem_name: vulObj.vulnerability_item.name,
      vulitem_description: vulObj.vulnerability_item.description,
      vulitem_checking_guide: vulObj.vulnerability_item.checking_guide,
      vulitem_judgment_guide: vulObj.vulnerability_item.judgment_guide,
      vul_gathering_data: vulObj.gathering_data,
      vul_status: vulObj.status,
      vul_result: vulObj.result,
      poc_id: '',
      poc_point: '',
      poc_found_date: '',
      poc_reported_date: '',
      poc_patched_date: '',
      poc_is_new: '',
      poc_note: '',
    };
    if (vulObj.pocs.length !== 0) {
      for (let [idx, pocObj] of vulObj.pocs.entries()) {
        let tempObj2 = { ...tempObj };
        tempObj2.poc_id = pocObj.id;
        tempObj2.poc_point = pocObj.point;
        tempObj2.poc_found_date = pocObj.found_date;
        tempObj2.poc_reported_date = pocObj.reported_date;
        tempObj2.poc_patched_date = pocObj.patched_date;
        tempObj2.poc_is_new = pocObj.is_new;
        tempObj2.poc_note = pocObj.note;
        if (idx !== 0) {
          tempObj2.vulitem_description = '';
          tempObj2.vulitem_checking_guide = '';
          tempObj2.vulitem_judgment_guide = '';
          tempObj2.vul_result = 'Y';
          tempObj2.vul_status = '';
          tempObj2.vul_gathering_data = '';
          tempObj2.vulitem_name = '';
        }
        resultList.push(tempObj2);
      }
    } else {
      resultList.push(tempObj);
    }
  }
  return resultList;
}
export function saveVulRealGrid(gridView, dataProvider, projectId, areaAlias, assetId) {
  gridView.commit(true);

  let invaildColumns = gridView.validateCells(null, false);
  if (invaildColumns !== null) {
    gridView.showEditor();
    gridView.setFocus();
    alert('올바르지 않은 데이터가 있습니다.');
    return;
  }

  let createdRow = [];
  let updatedRow = [];
  let deletedRow = [];

  let updatedRowList = dataProvider.getAllStateRows();
  for (let _ of updatedRowList['created']) {
    createdRow.push(dataProvider.getJsonRow(_));
  }

  for (let _ of dataProvider.getUpdatedCells(null)) {
    const rowData = dataProvider.getJsonRow(_['__rowId']);
    updatedRow.push({ vul_id: rowData['vul_id'], poc_id: rowData['poc_id'], data: _['updatedCells'] });
  }
  console.log(updatedRowList['deleted']);
  for (let _ of updatedRowList['deleted']){
    const rowData = dataProvider.getJsonRow(_);
    deletedRow.push({ vul_id: rowData['vul_id'], poc_id: rowData['poc_id'] });
  }
  //for(let _ of updatedRowList['deleted']) deletedRow.push(dataProvider.getJsonRow(_));

  if (createdRow.length || updatedRow.length || deletedRow.length) {
    let gridData = {
      createdRow: createdRow,
      updatedRow: updatedRow,
      deletedRow: deletedRow,
    };
    console.log(gridData);
    gridView.showToast({'message':'저장중입니다..'}, true);
    saveVulGridDataReq(gridData, projectId, areaAlias).then( ([result, jsonData]) => {
      if(result) { gridView.hideToast(); dataProvider.clearRowStates(true,false); console.log(jsonData)} else {console.log(jsonData)}
    });

    //return true;
  } else {
    alert('변경사항이 없습니다');
    return false;
  }
}

export async function importVulXlsx(gridView, dataProvider, fileObj) {
  const data = await fileObj.arrayBuffer();
  const workBook = XLSX.read(data);
  const workSheet = workBook.Sheets['취약점'];
  let sheetData = convertVulSheetData(XLSX.utils.sheet_to_json(workSheet));
  let rowsData = dataProvider.getJsonRows(0, -1, true);
  //console.log(sheetData);
  //console.log(rowsData);

  const vulCodeArr = [
    ...new Set(rowsData.map((e) => `${e.asset_code}/${e.vulitem_code}`)),
  ];
  //console.log(vulCodeArr);

  let cSheetData = {};
  let cRowsData = {};
  for (let _ of vulCodeArr) {
    cSheetData[_] = sheetData.filter(
      (e) => `${e.asset_code}/${e.vulitem_code}` === _
    );
    cRowsData[_] = rowsData.filter((e, idx) => {
      if (`${e.asset_code}/${e.vulitem_code}` === _) {
        e.Oid = idx;
        return e;
      } else {
        return false;
      }
    });
  }

  //console.log(cSheetData);
  //console.log(cRowsData);
  for (let _ of vulCodeArr) {
    for (let idx in cRowsData[_]) {
      if (cSheetData[_][idx] !== undefined) {
        dataProvider.updateRow(cRowsData[_][idx].Oid, {
          ...cRowsData[_][idx],
          ...cSheetData[_][idx],
        });
      } else {
        dataProvider.setRowState(cRowsData[_][idx].Oid, 'deleted', true);
      }
    }
  }

  for (let _ of vulCodeArr) {
    for (let idx in cSheetData[_]) {
      if (cRowsData[_][idx] === undefined) {
        console.log({ ...cRowsData[_][idx - 1], ...cSheetData[_][idx] });
        dataProvider.insertRow(cRowsData[_][idx - 1].Oid + 1, {
          ...cRowsData[_][idx - 1],
          ...cSheetData[_][idx],
        });
      }
    }
  }
}

function convertVulSheetData(sheetData) {
  let convertedSheetData = [];
  for (let rowData of sheetData) {
    let tempRowData = {};
    for (let _ in rowData) {
      const columData = vulColunms.find((e) => e.header.text === _);
      tempRowData[columData.name] =
        typeof rowData[_] === 'string'
          ? rowData[_].replaceAll('\r\n', '\n')
          : rowData[_];
    }
    convertedSheetData.push(tempRowData);
  }
  return convertedSheetData;
}

function setDataProviderVulConfig(dataProvider) {
  dataProvider.setOptions({
    softDeleting: true,
    restoreMode: 'explicit',
  });


  dataProvider.onRowInserted = function (prov, row) {
    const vulCode = prov.getValue(row - 1, 'vulitem_code');
    const vulId = prov.getValue(row - 1, 'vul_id');
    const assetCode = prov.getValue(row - 1, 'asset_code');
    prov.setValue(row, 'vulitem_code', vulCode);
    prov.setValue(row, 'asset_code', assetCode);
    prov.setValue(row, 'vul_id', vulId);
    prov.setValue(row, 'poc_id', 0);
    const temp = new Date(); 
    const currentDate = `${temp.getFullYear()}-${temp.getMonth()+1}-${temp.getDate()}`;
    prov.setValue(row, 'poc_found_date', currentDate);
    prov.setValue(row, 'vul_result', 'Y');
    //prov.setValue(row-1, 'vul_result', 'Y');
    //poc_reported_date
  };
}

function setGridViewVulConfig(gridView, dataProvider) {
  //gridView.setRowGroup({mergeMode: true});
  gridView.setRowStyleCallback((grid, item, fixed) =>{
    const vulResult = grid.getValue(item.index, "vul_result");
    if (vulResult === 'Y') {
      return {styleName : 'grid-vul-Y'};
    }else if(vulResult === 'N'){
      return {styleName : 'grid-vul-N'};
    }else if(vulResult === 'NA'){
      return {styleName : 'grid-vul-NA'};
    }else{
      return null;
    }
  });

  gridView.onValidateRow =  function (grid, itemIndex, dataRow, inserting, values) {
  //  console.log(dataProvider.getJsonRow(dataRow))
  //  console.log(values) 
  };

  gridView.onValidateColumn = (grid, column, inserting, value) =>{
    let error = {level:'error', message: ''};
    if(column.fieldName === 'vul_result'){
      if( !(value === 'Y' || value === 'N' || value === '' || value === 'NA') ){
        error.message = `${column.fieldName} 필드는 'Y', 'N', 'NA' 또는 공백만 입력 가능합니다`;
        return error;
      }
    }else if(column.fieldName.includes('date')){
      if( value === null || value === '' || value === undefined){
        return null
      }else{
        console.log(value)
        if( !value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/) ){
          error.message = `${column.fieldName} 필드는 'YYYY-MM-DD' 형식으로 작성해주세요.`;
          return error;
        }
      }
    }
  }


}

export function exportVulXlsx(gridView, exportFileName, exportSheetName) {
  gridView.exportGrid({
    type: 'excel',
    target: 'local',
    fileName: exportFileName,
    showProgress: true,
    progressMessage: '엑셀 Export중입니다.',
    indicator: 'hidden',
    header: 'default',
    footer: 'hidden',
    compatibility: true,
    //allColumns : true,
    separateRows: true,
    sheetName: exportSheetName,
  });
}

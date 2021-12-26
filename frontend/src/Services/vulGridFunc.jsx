import { saveVulGridDataReq } from '../utils';
import {
  setGridViewCommonConfig,
  setDataProviderCommonConfig,
  vulColunms,
  vulFields,
} from './gidConfig';
import XLSX from 'xlsx';

export function loadVulsGridData(gridView, dataProvider, assetObj, vulList) {
  gridView.setDataSource(dataProvider);

  let columns = [];
  let fields = vulFields;

  for (let field of global.config.VUL_GRID_FIELD[assetObj.area_alias]) {
    console.log(field);
    columns.push(vulColunms.find((e) => e.name === field));
  }
  //console.log(fields);
  //console.log(columns);
  let convertedVulList = convertVulJsonData(assetObj, vulList);
  //console.log(convertedVulList);
  dataProvider.setFields(fields);
  gridView.setColumns(columns);

  if (vulList.length) {
    dataProvider.setRows(convertedVulList);
  }

  setGridViewCommonConfig(gridView);
  setGridViewVulConfig(gridView);
  setDataProviderCommonConfig(dataProvider);
  setDataProviderVulConfig(dataProvider);
}

function convertVulJsonData(assetObj, vulList) {
  console.log(vulList);
  let resultList = [];
  for (let vulObj of vulList) {
    let tempObj = {
      vul_id: vulObj.id,
      asset_code: assetObj.code,
      asset_hostname: assetObj.hostname,
      asset_platform:
        assetObj.platform === '[[OTHER]]'
          ? assetObj.platform_t
          : assetObj.platform,
      vulitem_code: vulObj.vulnerability_item.code,
      vulitem_name: vulObj.vulnerability_item.name,
      vulitem_description: vulObj.vulnerability_item.description,
      vulitem_checking_guide: vulObj.vulnerability_item.checking_guide,
      vulitem_judgment_guide: vulObj.vulnerability_item.judgment_guide,
      vul_gathering_data: vulObj.gathering_data,
      vul_status: vulObj.status,
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
export function saveVulRealGrid(gridView, dataProvider, projectId, areaAlias) {
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
    const vulIdx = dataProvider.getJsonRow(_['__rowId'])['vul_id'];
    const pocIdx = dataProvider.getJsonRow(_['__rowId'])['poc_id'];
    updatedRow.push({ vulId: vulIdx, pocId: pocIdx, data: _['updatedCells'] });
  }

  for (let _ of updatedRowList['deleted'])
    deletedRow.push(dataProvider.getJsonRows(_)[0]['id']);
  //for(let _ of updatedRowList['deleted']) deletedRow.push(dataProvider.getJsonRow(_));

  if (createdRow.length || updatedRow.length || deletedRow.length) {
    let gridData = {
      createdRow: createdRow,
      updatedRow: updatedRow,
      deletedRow: deletedRow,
    };
    console.log(gridData);

    return true;
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
  };
}

function setGridViewVulConfig(gridView) {}

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

import ExcelJS from 'exceljs';
import FileSaver from 'file-saver'
import configData from './config.json'

const createAssetSheet = (assetWorkSheet, areaAlias, assetList) => {
  const { ASSET_FIELD_FOR_XLSX, ASSET_COLUMNS_FOR_XLSX } = configData
  const convAssetList = convertAssetJsonData(assetList)
  
  const assetColums = ASSET_FIELD_FOR_XLSX[areaAlias].map(e=> ASSET_COLUMNS_FOR_XLSX.find(e2=>e2.key === e));
  assetWorkSheet.columns = assetColums;

  const assetColumsRow = assetWorkSheet.getRow(1);
  assetColums.forEach((e,idx) => { 
    assetColumsRow.getCell(idx+1).style=
    {
      font: {
        size: 9,
        bold: true,
        color: {argb: 'FFFFFF'},
      },
      alignment: {
        horizontal: 'center', 
        vertical: 'middle',
        wrapText: true
      },
      fill: {
          type: 'pattern',
          pattern:'solid',
          fgColor:{argb:'1F497D'}
      }
    }
  });
  assetWorkSheet.addRows(convAssetList);
}

const createVulSheet = (vulWorkSheet, areaAlias, vulList) => {
  const { VUL_FIELD_FOR_XLSX, VUL_COLUMNS_FOR_XLSX } = configData
  const convertedVulList = convertVulJsonData(vulList)
  const vulColunms = VUL_FIELD_FOR_XLSX[areaAlias].map(e=> VUL_COLUMNS_FOR_XLSX.find(e2=>e2.key === e));
  
  vulWorkSheet.columns = vulColunms;

  const vulColumsRow = vulWorkSheet.getRow(1);

  vulColunms.forEach((e,idx) => { 
    vulColumsRow.getCell(idx+1).style=
    {
      font: {
        size: 9,
        bold: true,
        color: {argb: 'FFFFFF'},
      },
      alignment: {
        horizontal: 'center', 
        vertical: 'middle',
        wrapText: true
      },
      fill: {
          type: 'pattern',
          pattern:'solid',
          fgColor:{argb:'1F497D'}
      }
    }
  });
  
  vulWorkSheet.addRows(convertedVulList);
}

const convertVulJsonData = (vulList) => {
  const { ASSET_FIELD } = global.config
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
      poc_is_new: ASSET_FIELD.IS_NEW.find(e=>e.value === true).label,
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
        tempObj2.poc_is_new = ASSET_FIELD.IS_NEW.find(e=>e.value === pocObj.is_new).label;
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


const convertAssetJsonData = (assetList) => {
  const { ASSET_FIELD } = global.config
  let convAssetList = [ ...assetList ];
  convAssetList.forEach(e=>{
    e.is_test = ASSET_FIELD.IS_TEST.find(e2=> e2.value === e.is_test).label;
    e.is_switch = ASSET_FIELD.IS_SWITCH.find(e2=> e2.value === e.is_switch).label;
    e.is_financial = ASSET_FIELD.IS_FINANCIAL.find(e2=> e2.value === e.is_financial).label;
    e.is_https = ASSET_FIELD.IS_HTTPS.find(e2=> e2.value === e.is_https).label;
    e.is_server = ASSET_FIELD.IS_SERVER.find(e2=> e2.value === e.is_server).label; 
    e.is_new = ASSET_FIELD.IS_NEW.find(e2=> e2.value === e.is_new).label;
    e.is_external = ASSET_FIELD.IS_EXTERNAL.find(e2=> e2.value === e.is_external).label; 
  })
  return convAssetList
}

export async function exportAssetXlsx(areaAlias, assetList){
  const workBook = new ExcelJS.Workbook(); 
  const assetWorkSheet = workBook.addWorksheet("자산", {
    properties:{tabColor:{ argb: 'FF00FF00' }}
  });
  createAssetSheet(assetWorkSheet, areaAlias, assetList);

  const buffer = await workBook.xlsx.writeBuffer(); 
  const blob = new Blob([buffer]);
  FileSaver.saveAs(blob, `${areaAlias} 자산.xlsx`);
}

export async function exportVulXlsx(areaAlias, assetList, vulList){
  const workBook = new ExcelJS.Workbook(); 
  const assetWorkSheet = workBook.addWorksheet("자산", {
    properties:{tabColor:{ argb: 'FF00FF00' }}
  });
  createAssetSheet(assetWorkSheet, areaAlias, assetList);

  const vulWorkSheet = workBook.addWorksheet("취약점 목록", {
    properties:{tabColor:{ argb: 'FFFF00'}}
  });
  createVulSheet(vulWorkSheet, areaAlias, vulList);

  const buffer = await workBook.xlsx.writeBuffer(); 
  const blob = new Blob([buffer]); 
  FileSaver.saveAs(blob, `${areaAlias} 평가.xlsx`);
}


export async function exportResultXlsx(areaAlias, assetList, vulList){
  const workBook = new ExcelJS.Workbook(); 
  const assetWorkSheet = workBook.addWorksheet("자산", {
    properties:{tabColor:{ argb: 'FF00FF00' }}
  });
  createAssetSheet(assetWorkSheet, areaAlias, assetList);

  const vulWorkSheet = workBook.addWorksheet("취약점 목록", {
    properties:{tabColor:{ argb: 'FFFF00'}}
  });
  const vulYList = vulList.filter(e=> e.result === 'Y')
  createVulSheet(vulWorkSheet, areaAlias, vulYList);

  const buffer = await workBook.xlsx.writeBuffer(); 
  const blob = new Blob([buffer]); 
  FileSaver.saveAs(blob, `${areaAlias} 취약점 목록.xlsx`);
}
import ExcelJS from 'exceljs';
import configData from './config.json'


const convertAssetSheetToJson = (assetWorkSheet) => {
  const { ASSET_COLUMNS_FOR_XLSX } = configData;
  const assetColumsRow = assetWorkSheet.getRow(1).values;
  let jsonData = [];
  assetWorkSheet.eachRow((row, rowIdx)=> {
    let tempObj = {};
    if(rowIdx === 1) return;
    row.values.forEach((e,idx) => {
      tempObj[ASSET_COLUMNS_FOR_XLSX.find(e => e.header === assetColumsRow[idx]).key] = e;
    }); 
    jsonData.push(tempObj);
  });
  return jsonData;
}

const reverseConvertAssetJsonData = (jsonData) => {
  const { ASSET_FIELD } = global.config
  let convAssetList = [ ...jsonData ];
  convAssetList.forEach(e=>{
    if('is_test' in e) e.is_test = ASSET_FIELD.IS_TEST[0].label === e.is_test ? ASSET_FIELD.IS_TEST[0].value : ASSET_FIELD.IS_TEST[1].value;
    if('is_switch' in e) e.is_switch = ASSET_FIELD.IS_SWITCH[0].label === e.is_switch ? ASSET_FIELD.IS_SWITCH[0].value : ASSET_FIELD.IS_SWITCH[1].value;
    if('is_financial' in e) e.is_financial = ASSET_FIELD.IS_FINANCIAL[0].label === e.is_financial ? ASSET_FIELD.IS_FINANCIAL[0].value : ASSET_FIELD.IS_FINANCIAL[1].value;
    if('is_https' in e) e.is_https = ASSET_FIELD.IS_HTTPS[0].label === e.is_https ? ASSET_FIELD.IS_HTTPS[0].value : ASSET_FIELD.IS_HTTPS[1].value;
    if('is_server' in e) e.is_server = ASSET_FIELD.IS_SERVER[0].label === e.is_server ? ASSET_FIELD.IS_SERVER[0].value : ASSET_FIELD.IS_SERVER[1].value;
    if('is_new' in e) e.is_new = ASSET_FIELD.IS_NEW[0].label === e.is_new ? ASSET_FIELD.IS_NEW[0].value : ASSET_FIELD.IS_NEW[1].value;
    if('is_external' in e) e.is_external = ASSET_FIELD.IS_EXTERNAL[0].label === e.is_external ? ASSET_FIELD.IS_EXTERNAL[0].value : ASSET_FIELD.IS_EXTERNAL[1].value;
  })
  return convAssetList
}

export async function importAssetXlsx(assetList, fileObj){
  const { ASSET_INIT_DATA_FOR_XLSX } = configData;
  const data = await fileObj.arrayBuffer();
  const workBook = new ExcelJS.Workbook();
  await workBook.xlsx.load(data);
  const assetWorkSheet = workBook.getWorksheet('자산');
  let jsonData = convertAssetSheetToJson(assetWorkSheet);
  jsonData = reverseConvertAssetJsonData(jsonData)
  console.log(jsonData);

  // const convertedAssetList = jsonData.map(e=>{
  //   const asstObj = assetList.find(e2=> e2.code === e.code);
  //   return (asstObj)? {...asstObj, ...e } : {...ASSET_INIT_DATA_FOR_XLSX, ...e };
  // });
  // //const a = reverseConvertAssetJsonData(jsonData)
  //console.log(a)
  // console.log(assetList);
  

  let deleteArr = [];
  let createArr = [];
  let updateArr = [];
  


  for(let row of jsonData){
    const assetObj = assetList.find(e2=> e2.code === row.code);
    if(assetObj){
      // Object compare
      if (JSON.stringify({...assetObj, ...row }) !== JSON.stringify(assetObj)){
        // update
        console.log('equal')
      }
    }else{
      // create
    }
  }

  //console.log(convertedAssetList)  

  //console.log(jsonData);
  //console.log(assetList);
  
  
  //const workBook = new ExcelJS.Workbook(); 
  //const assetWorkSheet = workBook.xlsx.readFile("자산")

  
  // const buffer = await workBook.xlsx.writeBuffer(); 
  // const blob = new Blob([buffer]); 
  // FileSaver.saveAs(blob, '취약점 목록.xlsx');
}
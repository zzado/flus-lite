import ExcelJS from 'exceljs';
import FileSaver from 'file-saver'

export async function exportVulListToXlsx(areaAlias, assetList, vulList){
  const { ASSET_FIELD_FOR_XLSX, ASSET_COLUMNS_FOR_XLSX } = global.config
  const workBook = new ExcelJS.Workbook(); 
  const assetWorkSheet = workBook.addWorksheet("자산", 
    {
      properties:{
        tabColor:{
          argb: 'FF00FF00'
        }
      }
    }
  );
  
  const assetColums = ASSET_FIELD_FOR_XLSX[areaAlias].map(e=> ASSET_COLUMNS_FOR_XLSX.find(e2=>e2.key === e));
  console.log(assetColums)
  assetWorkSheet.columns = assetColums;

  const columsRow = assetWorkSheet.getRow(1);

  assetColums.forEach((e,idx) => { 
    columsRow.getCell(idx+1).style=
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
  assetWorkSheet.addRows(assetList);
  
  
  const buffer = await workBook.xlsx.writeBuffer(); 
  const blob = new Blob(buffer); 
  FileSaver.saveAs(blob, "testExcel.xlsx");
}
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver'

export async function exportVulListToXlsx(assetList, vulList){
    const workbook = new ExcelJS.Workbook(); 
    const worksheet = workbook.addWorksheet("My Sheet"); 
    worksheet.columns = [ 
        { header: "Id", key: "id", width: 10 }, 
        { header: "Name", key: "name", width: 32 }, 
        { header: "D.O.B.", key: "DOB", width: 10, outlineLevel: 1 }, 
    ]; 
    
    worksheet.addRow({ name: "John Doe", id: 1, dob: new Date(1970, 1, 1) }); 
    worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date(1965, 1, 7) }); // 다운로드 
    const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }; 
    const buffer = await workbook.xlsx.writeBuffer(); 
    const blob = new Blob([buffer], mimeType); 
    FileSaver.saveAs(blob, "testExcel.xlsx");
}
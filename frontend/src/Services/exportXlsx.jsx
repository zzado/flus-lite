import XLSX from 'xlsx';

const exportXlsx = (assetList) => {
  console.log(assetList);
  const worksheet = XLSX.utils.json_to_sheet(assetList, {header:['area_alias','code','name','assessors','note'] });
  const new_workbook = XLSX.utils.book_new();
  
  const cellAdd = XLSX.utils.encode_cell({c:0, r:0});

  worksheet[cellAdd].v = '크아아아'
  worksheet['A2'].v ='zzzadoasodao'
  worksheet['A2'].s ={
    fill: {
      patternType: "solid",
      fgColor: { rgb: "111111" }
    }};
  worksheet['!cols'] = [
    {width: 100},
    {width: 100},
    {width: 100},
    {width: 100},
    {width: 100},
    {width: 100},
    {width: 100},
    {width: 100},
    {width: 100}
  ];
    
  XLSX.utils.book_append_sheet(new_workbook, worksheet, '자산');
  XLSX.writeFile(new_workbook, 'test.xlsx');
}
export default exportXlsx;
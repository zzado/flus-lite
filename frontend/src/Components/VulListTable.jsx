import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, Box, TableFooter, Pagination, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Checkbox, } from '@mui/material';
import { styled } from '@mui/system';

const TableStyle = styled('div')(
  ({ theme }) => `
  table {
    border: 1px solid rgba(224, 224, 224, 1),
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    text-align: center;
  }
  th {
    background-color: #E7EBF0;
    font-weight : bold
  }
  `,
);

export default function VulListTable(props){
  const { projectId, areaAlias, vulList, asseCodeDisplay } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const pageCount = Math.ceil(vulList.length / perPage)
  const { VUL_FIELD } = global.config
  const navigate = useNavigate()
  
  const onRowClick = (e) =>{
    const vulid = e.target.parentElement.getAttribute('vulid');
    if(e.target.type !== 'checkbox') navigate(`/v/${projectId}/${areaAlias}/${vulid}`);
  }

  return (
    <>
    <TableStyle>
      <TableContainer>
        <Table size='medium'>
          <TableHead>
            <TableRow >
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell component="th" scope="row" >취약점ID</TableCell>
              <TableCell component="th" scope="row" >항목명 (취약항목 갯수)</TableCell>
              <TableCell component="th" scope="row" >평가결과</TableCell>
              <TableCell component="th" scope="row" >신규여부</TableCell>
              <TableCell component="th" scope="row" >전달</TableCell>
              <TableCell component="th" scope="row" >조치</TableCell>
              <TableCell component="th" scope="row" >위험도</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { vulList && vulList.slice((currentPage-1)*perPage, (currentPage-1)*perPage + perPage).map((vulObj, idx) => (
            <TableRow hover onClick={onRowClick} key={vulObj.id} vulid={vulObj.id}>
              <TableCell padding="checkbox">
                <Checkbox color="primary" value={vulObj.id}/>
              </TableCell>
              <TableCell component="td">{asseCodeDisplay ? `${vulObj.asset.code}-${vulObj.vulnerability_item.code}` : vulObj.vulnerability_item.code || ''}</TableCell>
              <TableCell component="td">{vulObj.vulnerability_item.name || ''}{ vulObj.pocs.length }</TableCell>
              <TableCell component="td">{VUL_FIELD.RESULT.find(e=>e.value === vulObj.result).label}</TableCell>
              <TableCell component="td">{VUL_FIELD.IS_NEW.find(e=>e.value === vulObj.is_new).label}</TableCell>
              <TableCell component="td">{VUL_FIELD.IS_REPROTED.find(e=>e.value === vulObj.is_reported).label}</TableCell>
              <TableCell component="td">{VUL_FIELD.IS_PATCHED.find(e=>e.value === vulObj.is_patched).label}</TableCell>
              <TableCell component="td">{vulObj.vulnerability_item.risk || ''}</TableCell>
            </TableRow>
          ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Pagination size='large' count={pageCount} page={currentPage} onChange={(e, v)=>setCurrentPage(v)} />
          <Select
            value={perPage}
            size="small"
            onChange={e=>{ setPerPage(e.target.value); setCurrentPage(1); }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </Box>
      </TableContainer>
      </TableStyle>
    </>
  )
}
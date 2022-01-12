import { Fragment, useState } from 'react';
import { Chip, Select, MenuItem, Box, TableFooter, Pagination, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Checkbox } from '@mui/material';
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

export default function AssetListTable(props){

  const { assetList, onRowClick } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const pageCount = Math.ceil(assetList.length / perPage)

  return (
    <Fragment>
      <TableStyle>
      <TableContainer>
        <Table size='medium' >
          <TableHead>
            <TableRow >
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell component="th" scope="row" >자산코드</TableCell>
              <TableCell component="th" scope="row" >자산이름(업무명,용도)</TableCell>
              <TableCell component="th" scope="row" >평가자</TableCell>
              <TableCell component="th" scope="row" >담당자</TableCell>
              <TableCell component="th" scope="row" >진행상황</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { assetList && assetList.slice((currentPage-1)*perPage, (currentPage-1)*perPage + perPage).map((assetObj, idx) => (
          <TableRow hover onClick={onRowClick} key={assetObj.id} assetid={assetObj.id}>
            <TableCell padding="checkbox">
              <Checkbox color="primary" value={assetObj.id}/>
            </TableCell>
            <TableCell component="td"><Chip sx={{color:'white', backgroundColor:'#999', fontWeight:'bold'}} size="small" label={assetObj.code}/></TableCell>
            <TableCell component="td">{assetObj.name}</TableCell>
            <TableCell component="td">{assetObj.assessors}</TableCell>
            <TableCell component="td">{assetObj.operator}</TableCell>
            <TableCell component="td">{assetObj.manual_done ? '완료' : '진행중'}</TableCell>
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
    </Fragment>
  );
}

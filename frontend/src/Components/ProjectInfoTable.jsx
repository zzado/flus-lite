import { Fragment, useMemo, useEffect, useRef } from 'react';
import { Box, Chip, FormHelperText, FormControl, InputLabel, MenuItem, Select, TextField, TableContainer, Table, TableRow, TableHead, TableBody, TableCell } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { getUserListReq, getComplianceListReq } from '../utils';
import { styled } from '@mui/system';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'

//import Select from 'react-select';

const TableStyle = styled('div')(
  ({ theme }) => `
  table {
    border: 1px solid rgba(224, 224, 224, 1),
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #E0E3E7;
    text-align: left;
    padding: 10px;
  }
  th {
    background-color: #E7EBF0;
    font-weight : bold
  }
  `,
);

export default function ProjectInfoTable(props){
  const { action, projectState, projectStateDispatch } = props;
  const { PROJECT_FIELD, AREA_RNAME } = global.config;
  const navigate = useRef(useNavigate());
  
  
  const projectName = useMemo(()=>
    action === 'detail' ? projectState.name : 
    action === 'create' || action === 'edit' ? 
    <TextField label="프로젝트명" variant="outlined" size='small' fullWidth error={projectState.name?false : true} helperText={projectState.name? '' : '⛔입력해주세요'} value={projectState.name} onChange={e=>projectStateDispatch({name:'name', value:e.target.value})}/> : null
  ,[action, projectState.name, projectStateDispatch]);


  const projectCategory = useMemo(()=>
    action === 'detail' ? projectState.category : 
    action === 'create' ? <FormControl fullWidth error={projectState.category ? false : true}>
      <InputLabel >종합/공개용</InputLabel>
    <Select value={projectState.category} label="종합/공개용" onChange={e=>projectStateDispatch({name:'category', value: e.target.value})}>
    { PROJECT_FIELD.CATEGORY.map(e=>
      <MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>
      )
    }
    </Select>
    {projectState.category ? null : <FormHelperText>⛔선택해주세요</FormHelperText>}
    </FormControl>: 
    action === 'edit' ? projectState.category :
    null
  ,[action, projectState.category, PROJECT_FIELD.CATEGORY, projectStateDispatch]);


  const projectCompliance = useMemo(()=>
    action === 'detail' ? projectState.compliance : 
    action === 'create' ? <FormControl fullWidth disabled={projectState.category ? false : true} error={projectState.category && !projectState.compliance ? true : false}>
      <InputLabel>평가기준</InputLabel>
      <Select value={projectState.compliance} label="평가기준" onChange={e=>projectStateDispatch({name:'compliance', value: e.target.value})}>
      { projectState.allComplianceList.map(e=>
        <MenuItem key={e} value={e}>{e}</MenuItem>
        )
      }
      </Select>
      {projectState.category? projectState.compliance ? null : <FormHelperText>⛔선택해주세요</FormHelperText> : <FormHelperText>🚫평가 구분을 먼저 선택해주세요</FormHelperText>}
    </FormControl>: 
    action === 'edit' ? projectState.compliance :
    null
  ,[action, projectState.compliance, projectState.category, projectState.allComplianceList, projectStateDispatch]);

  const projectAreaList = useMemo(()=>
    action === 'detail' ? projectState.area && projectState.area.map((areaAlias, idx) => (<Chip sx={{m:0.1}} color='primary' onClick={()=>navigate.current(`/w/${projectState.id}/${areaAlias.split('-').pop()}/step1`)} key={idx} label={AREA_RNAME[areaAlias.split('-').pop()]} />)): 

    action === 'create'|| action === 'edit' ? 
    <FormControl fullWidth disabled={projectState.compliance ? false : true} error={projectState.compliance && !projectState.area.length ? true : false}>
    <InputLabel>평가분야</InputLabel>
    <Select multiple value={projectState.area} label="평가분야" onChange={e=>projectStateDispatch({name: 'area', value: e.target.value})} 
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={AREA_RNAME[value.split('-').pop()]} />
          ))}
        </Box>
      )}>
    { projectState.compliance === '공개용' ? 
      PROJECT_FIELD.OPEN_PROJECT_AREALIST.map((e, idx)=>
      <MenuItem key={idx} value={`${projectState.compliance}-${e.value}`}>{e.label}</MenuItem>
      ):
      PROJECT_FIELD.EFI_PROJECT_AREALIST.map((e, idx)=>
      <MenuItem key={idx} value={`${projectState.compliance}-${e.value}`}>{e.label}</MenuItem>
      )
    }
    </Select>
    {projectState.compliance? projectState.area.length ? null : <FormHelperText>⛔선택해주세요</FormHelperText> : <FormHelperText>🚫평가 기준을 먼저 선택해주세요</FormHelperText>}
  </FormControl>:
    null
  ,[action, projectState.area, projectState.compliance, projectState.id, PROJECT_FIELD, AREA_RNAME, projectStateDispatch]);


  const projectAssessors = useMemo(()=>
    action === 'detail' ? projectState.assessors && projectState.assessors.map((e, idx)=> (<Chip sx={{m:0.1}} color='primary' key={idx} label={e.username} />)): 
    action === 'create' || action === 'edit' ? 
    <FormControl fullWidth>
      <InputLabel>평가자</InputLabel>
      <Select multiple value={projectState.assessors} label="평가자" onChange={e=>projectStateDispatch({name: 'assessors', value: e.target.value})} 
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value.id} label={value.username} />
            ))}
          </Box>
        )}>
      { projectState.allUserList.map((e, idx)=>
        <MenuItem key={idx} value={e}>{e.username}</MenuItem>
      )}
      </Select>
    </FormControl>:
    null
  ,[action, projectState.assessors, projectState.allUserList, projectStateDispatch]);

  const projectClient = useMemo(()=>
    action === 'detail' ? projectState.client_company : 
    action === 'create' || action === 'edit' ? <TextField label="평가대상 기관" variant="outlined" size='small' fullWidth error={projectState.client_company?false : true} helperText={projectState.client_company? '' : '⛔입력해주세요'} value={projectState.client_company} onChange={e=>projectStateDispatch({name:'client_company', value:e.target.value})}/>: 
    null
  ,[action, projectState.client_company, projectStateDispatch]);

  const projectStartDate = useMemo(()=>
    action === 'detail' ? projectState.start_date : 
    action === 'create' || action === 'edit' ? <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DesktopDatePicker label="프로젝트 시작일" inputFormat="yyyy-MM-dd" value={projectState.start_date} onChange={e=>projectStateDispatch({name: 'start_date',value: e.toISOString().slice(0, 10)})} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider>: 
    null
  ,[action, projectState.start_date, projectStateDispatch]);

  const projectEndDate = useMemo(()=>
    action === 'detail' ? projectState.end_date : 
    action === 'create' || action === 'edit' ? <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker label="프로젝트 종료일" inputFormat="yyyy-MM-dd" value={projectState.end_date} onChange={e=>projectStateDispatch({name: 'end_date',value: e.toISOString().slice(0, 10)})} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider> : 
      null
  ,[action, projectState.end_date, projectStateDispatch]);
  
  const projectAgency = useMemo(()=>
    action === 'detail' ? projectState.assessment_company : 
    action === 'create' || action === 'edit' ? <TextField label="평가 기관" variant="outlined" size='small' fullWidth error={projectState.assessment_company?false : true} helperText={projectState.assessment_company? '' : '⛔입력해주세요'} value={projectState.assessment_company} onChange={e=>projectStateDispatch({name:'assessment_company', value:e.target.value})} />: 
    null
  ,[action, projectState.assessment_company, projectStateDispatch]);

  const projectNote = useMemo(()=>
    action === 'detail' ? projectState.note : 
    action === 'create' || action === 'edit' ? <TextField size='small' fullWidth multiline rows={3} label="비고" value={projectState.note} onChange={e=>projectStateDispatch({name:'note', value:e.target.value})}/> : 
    null
  ,[action, projectState.note, projectStateDispatch]);

  useEffect(() => {
    if(action === 'create' || action === 'edit'){
      getUserListReq().then(([result, jsonData]) => {
        result
          ? projectStateDispatch({
              name: 'allUserList',
              value: jsonData,
            })
          : navigate.current('/auTableCell');
      });
      if(action === 'create'){
        getComplianceListReq().then(([result, jsonData]) => {
          result
            ? projectStateDispatch({
                name: 'allComplianceList',
                value: jsonData.map((e) => e.code),
              })
            : navigate.current('/auTableCell');
        });
      }
    }
  }, [action, projectStateDispatch]);

  return (
    <Fragment>
      <TableStyle>
        <TableContainer>
      <Table size='medium' >
        <colgroup>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
        </colgroup>
        <TableHead/>
        <TableBody >
          <TableRow>
            <TableCell component="th" colSpan={1}>프로젝트명</TableCell>
            <TableCell component="td" colSpan={6}>{projectName}</TableCell>
            <TableCell component="th" colSpan={1}>평가구분</TableCell>
            <TableCell component="td" colSpan={2}>{projectCategory}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" colSpan={1}>평가기준</TableCell>
            <TableCell component="td" colSpan={2}>{projectCompliance}</TableCell>
            <TableCell component="th" colSpan={1}>평가분야</TableCell>
            <TableCell component="td" colSpan={6}>{projectAreaList}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" colSpan={1}>프로젝트 시작일</TableCell>
            <TableCell component="td" colSpan={2}>{projectStartDate}</TableCell>
            <TableCell component="th" colSpan={1}>평가대상 기관</TableCell>
            <TableCell component="td" colSpan={2}>{projectClient}</TableCell>
            <TableCell component="th" colSpan={1} rowSpan={2}>평가자</TableCell>
            <TableCell component="td" colSpan={3} rowSpan={2}>{projectAssessors}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" colSpan={1}>프로젝트 종료일</TableCell>
            <TableCell component="td" colSpan={2}>{projectEndDate}</TableCell>
            <TableCell component="th" colSpan={1}>평가 기관</TableCell>
            <TableCell component="td" colSpan={2}>{projectAgency}</TableCell>
          </TableRow>            
          <TableRow>
            <TableCell component="th" colSpan={1}>비고</TableCell>
            <TableCell component="td" colSpan={9}>{projectNote}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
      </TableStyle>
    </Fragment>
  );
}
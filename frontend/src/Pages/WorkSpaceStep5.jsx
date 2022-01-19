
import { Fragment, useContext, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import AssetListTable from '../Components/AssetListTable'
import { exportHtmlReporttReq, exportDocxReporttReq } from '../utils'
import FileSaver from 'file-saver'
import { AppContext } from '../Context/AppContext'
import HtmlIcon from '@mui/icons-material/Html';
import ArticleIcon from '@mui/icons-material/Article';
import TableRowsIcon from '@mui/icons-material/TableRows';
//import { exportResultXlsx } from '../Actions/xlsxAction'
import { exportResultXlsx } from '../Actions/xlsxAction/exportXlsx'


export default function WorkSpaceStep5(){
  const { appContextState } = useContext(AppContext);
  const { assetList, vulList } = appContextState;
  const { projectId, areaAlias } = useParams();

  const onRowClick = (e) =>{
    if(e.target.type !== 'checkbox') return true;
  }

  const exportHtml = useCallback(()=> exportHtmlReporttReq(projectId, areaAlias).then(([result, resData])=> (result)? FileSaver.saveAs(resData, `[${areaAlias}] 취약점 목록.html`) : alert('error')), [projectId, areaAlias])

  const exportDocx = useCallback(()=> exportDocxReporttReq(projectId, areaAlias).then(([result, resData])=> (result)? FileSaver.saveAs(resData, `[${areaAlias}] 취약점 목록.docx`) : alert('error')), [projectId, areaAlias])

  const exportXlsx = useCallback(()=> exportResultXlsx(areaAlias, assetList, vulList),[areaAlias, assetList, vulList])


  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>Step5</Typography>} action={ 
          <>
          <Tooltip title="Docx" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={exportDocx} >
              <ArticleIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Html" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={exportHtml} >
              <HtmlIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Xlsx" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={exportXlsx} >
              <TableRowsIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          </> 
        }/>
        <CardContent>
          <AssetListTable onRowClick={onRowClick} assetList={assetList} />
        </CardContent >
      </Card>
    </Fragment>
  );
}

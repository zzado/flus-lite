
import { Fragment, useContext, useCallback } from 'react';
import { useParams } from "react-router-dom";
import { Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AssetListTable from '../Components/AssetListTable'
import { exportHtmlReporttReq } from '../utils'
import FileSaver from 'file-saver'
import { AppContext } from '../Context/AppContext'

export default function WorkSpaceStep5(){
  const { appContextState } = useContext(AppContext);
  const { assetList } = appContextState;
  const { projectId, areaAlias } = useParams();

  const onRowClick = (e) =>{
    if(e.target.type !== 'checkbox') return true;
  }

  const exportHtml = useCallback(()=> exportHtmlReporttReq(projectId, areaAlias).then(([result, resData])=> (result)? FileSaver.saveAs(resData, `[${areaAlias}] 취약점 목록.html`) : alert('error')), [projectId, areaAlias])

  const exportDocx = useCallback(()=> exportHtmlReporttReq(projectId, areaAlias).then(([result, resData])=> (result)? FileSaver.saveAs(resData, `[${areaAlias}] 취약점 목록.html`) : alert('error')), [projectId, areaAlias])

  const exportXlsx = useCallback(()=> exportHtmlReporttReq(projectId, areaAlias).then(([result, resData])=> (result)? FileSaver.saveAs(resData, `[${areaAlias}] 취약점 목록.html`) : alert('error')), [projectId, areaAlias])


  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>Step5</Typography>} action={ 
          <>
          <Tooltip title="Docx" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={exportDocx} >
              <AddIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Html" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={exportHtml} >
              <AddRoadIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Xlsx" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={exportXlsx} >
              <AddRoadIcon sx={{ fontSize: 40 }}/>
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

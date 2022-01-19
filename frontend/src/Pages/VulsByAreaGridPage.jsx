import { Fragment, useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { GridView, LocalDataProvider } from 'realgrid';
import { loadVulsGridData, saveVulRealGrid, exportVulXlsx, importVulXlsx } from '../Actions/vulGridFunc';
import { Box, Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import ZoomInMapRoundedIcon from '@mui/icons-material/ZoomInMapRounded';
import { AppContext } from '../Context/AppContext'

export default function VulsByAssetGridPage(){
  const { projectId, areaAlias } = useParams();
  const { appContextState } = useContext(AppContext);
  const { vulList } = appContextState;
  
  const [gridView, setGridView] = useState(null);
  const [gridMaxSize, setGridMaxSize] = useState(false);
  const [dataProvider, setDataProvider] = useState(null);

  const isFileUploadRef = useRef(false);
  const gridRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if(gridView !== null && dataProvider !== null){
      if(vulList.length) loadVulsGridData(gridView, dataProvider, vulList, areaAlias);
    }
  },[gridView, dataProvider, vulList, areaAlias]);
  
  useEffect(() => {
    if(gridView === null && dataProvider === null){
      const tempObj1 = new GridView(gridRef.current);
      const tempObj2 = new LocalDataProvider(false);
      setGridView(tempObj1);
      setDataProvider(tempObj2);
    }
  },[gridView, dataProvider]);

  const saveGrid = () => {
    if(gridView && dataProvider){
      if(saveVulRealGrid(gridView, dataProvider, projectId, areaAlias)){
        alert('저장 완료');
      }
    }
  };


  return (
    <Fragment>
      <Card sx={ gridMaxSize ? {'width':'100%', 'height':'100%', 'position':'fixed', 'top': 0, 'left': 0, 'zIndex':9999, 'backgroundColor': 'white'} : null}>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>Step1</Typography>} action={ 
          <>
          <Tooltip title="XLSX 가져오기" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={()=> isFileUploadRef.current.click()}>
              <UploadIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <input type="file" onChange={(e)=> importVulXlsx(gridView, dataProvider, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/>

          <Tooltip title="XLSX 내보내기" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={()=> exportVulXlsx(gridView, `[취약점] ${areaAlias}.xlsx`, '취약점')}>
              <DownloadIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="저장" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={saveGrid}>
              <SaveIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          { gridMaxSize ?
          <Tooltip title="최소화" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={()=> setGridMaxSize(!gridMaxSize)}>
              <ZoomInMapRoundedIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          :
          <Tooltip title="최대화" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={()=> setGridMaxSize(!gridMaxSize)}>
              <ZoomOutMapRoundedIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          }
          <Tooltip title="뒤로" placement="top" arrow>
            <IconButton sx={{mr:2}} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step3`)}>
              <ArrowBackIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip>
          </> 
        }/>
        <CardContent>
          <Box ref={gridRef} sx={{height:'700px'}} />
        </CardContent >
      </Card>
    </Fragment>
  );
}

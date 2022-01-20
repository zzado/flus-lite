import { Fragment, useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
//import { useAssetContext } from 'Context/AppContext';
import { useAssetContext } from 'Hooks/useAssetContext';
import { loadAssetGridData, saveAssetRealGrid } from 'Actions/assetGridFunc';
import { importAssetXlsx, exportAssetXlsx } from 'Actions/xlsxAction';

import { GridView, LocalDataProvider } from 'realgrid';
import { Box, Tooltip, Card, CardHeader, CardContent, Typography, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import ZoomInMapRoundedIcon from '@mui/icons-material/ZoomInMapRounded';

export default function AssetGridView(){
  const { assetList, resetAssetList} = useAssetContext();
  const { projectId, areaAlias } = useParams();
  const [gridMaxSize, setGridMaxSize] = useState(false);
  const isFileUploadRef = useRef(false);
  const gridRef = useRef();
  
  const [gridView, setGridView] = useState(null);
  const [dataProvider, setDataProvider] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(gridView !== null && dataProvider !== null)
      loadAssetGridData(gridView, dataProvider, assetList, areaAlias);
    
  },[gridView, dataProvider, assetList, areaAlias]);
  
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
      if(saveAssetRealGrid(gridView, dataProvider, projectId, areaAlias)){
        resetAssetList();
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
          <input type="file" onChange={(e)=> importAssetXlsx(assetList, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/> 
          {/* <input type="file" onChange={(e)=> importAssetXlsx(gridView, dataProvider, e.target.files[0])} ref={isFileUploadRef} style={{display:'none'}}/> */}
          {/* 
          <Tooltip title="XLSX 내보내기" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={()=> exportAssetXlsx(gridView, `[자산] ${areaAlias}.xlsx`, '자산')}>
              <DownloadIcon sx={{ fontSize: 40 }}/>
            </IconButton>
          </Tooltip> */}

          <Tooltip title="XLSX 내보내기" placement="top" arrow>
            <IconButton sx={{mr:1}} onClick={()=> exportAssetXlsx(areaAlias, assetList)}>
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
            <IconButton sx={{mr:2}} onClick={()=>navigate(`/w/${projectId}/${areaAlias}/step1`)}>
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

import { Fragment, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from 'Context/AppContext'
import AssetListTable from 'Components/AssetListTable'
import { Tooltip, IconButton, Card, CardHeader, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function WorkSpaceStep2(){
  const { appContextState } = useContext(AppContext);
  const { assetList } = appContextState;

  const { projectId, areaAlias } = useParams();
  const navigate = useNavigate()

  const onRowClick = (e) =>{
    console.log(e.target)
    const assetid = e.target.parentElement.getAttribute('assetid');
    if(e.target.type !== 'checkbox') navigate(`/v-a/${projectId}/${areaAlias}/${assetid}`);
  }

  return (
    <Fragment>
      <Card>
        <CardHeader sx={{ backgroundColor:'white', padding: '10px', pb:0}} title={<Typography variant='h6' sx={{fontWeight:'bold'}}>Step2</Typography>} action={ 
          <>
          <Tooltip title="자산 등록" placement="top" arrow>
            <IconButton sx={{mr:1}}>
              <AddIcon sx={{ fontSize: 40 }}/>
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
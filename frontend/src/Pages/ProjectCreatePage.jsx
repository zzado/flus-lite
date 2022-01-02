import { Fragment, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import ProjectInfoTable from '../Components/ProjectInfoTable';
import { Card, CardHeader, CardContent } from '@mui/material';

export default function ProjectDetailPage(){
  const { appContextDispatch } = useContext(AppContext);
  
  return (
    <Fragment>
    <Card>
      <CardHeader title='프로젝트 목록'/>
      <CardContent>
        <ProjectInfoTable action={'create'} projectObj={{}} appContextDispatch={appContextDispatch} />
      </CardContent>
    </Card>
    </Fragment>
  );
}
import { Fragment, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import ProjectInfoTable from '../Components/ProjectInfoTable';
import { Card, CardHeader, CardContent } from '@mui/material';

export default function ProjectDetailPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject } = appContextState;
  
  return (
    <Fragment>
    <Card>
      <CardHeader title='프로젝트 정보'/>
      <CardContent>
      <ProjectInfoTable action={'detail'} projectObj={currentProject} appContextDispatch={appContextDispatch} />
      </CardContent>
    </Card>
    </Fragment>
  );
}

import { Fragment, useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import ProjectInfoTable from '../Components/ProjectInfoTable';
import { Card, CardHeader, CardContent } from '@mui/material';

export default function ProjectEditPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject } = appContextState;
  
  return (
    <Fragment>
    <Card>
      <CardHeader title='프로젝트 편집'/>
      <CardContent>
        <ProjectInfoTable action={'edit'} projectObj={currentProject} appContextDispatch={appContextDispatch} />
      </CardContent>
    </Card>
    </Fragment>
  );
}
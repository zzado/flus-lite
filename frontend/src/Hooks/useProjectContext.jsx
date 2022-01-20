import { useContext, useCallback } from 'react';
import { getProjectListReq } from 'utils'
import { AppContext } from 'Context/AppContext';

export const useProjectContext=()=>{
  const { appContextState, appContextDispatch, sortProjectList } = useContext(AppContext);
  const { currentProject } = appContextState
  
  const resetProjectList = useCallback(() => {
    getProjectListReq().then( ([result, jsonData]) => appContextDispatch({ name: 'projectList', value: sortProjectList(jsonData) }));
  },[appContextDispatch, sortProjectList]);

  return ({ projectObj: currentProject, resetProjectList : resetProjectList });
}
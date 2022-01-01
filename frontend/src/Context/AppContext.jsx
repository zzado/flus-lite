import { useMemo, createContext, useReducer, useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfoReq, getProjectListReq } from '../utils'

export const AppContext = createContext();

const initialState = {
  projectList : [],
  currentProject : {},
  currentUser : {},
  currentArea : '',
  reset : false,
};

const contextReducer = (state, action) => {
  const newState = { ...state };
  console.log(action);
  switch (action.type) {
    case 'setProjectList':
      newState.projectList = action.value;
      return newState;
    case 'setProject':
      const projectObj = newState.projectList.find( (e) => e.id === parseInt(action.value));
      newState.currentProject = projectObj;
      let sortedArea = [];
      for(let element of global.config.PROJECT_FIELD.EFI_PROJECT_AREALIST){
        for(let _ of newState.currentProject.area){
          if(element.value === _.split('-').pop()){
            sortedArea.push(_);
          }
        }
      }
      newState.currentProject.area = sortedArea;
      return (projectObj)? newState : state;
    case 'setUser':
      newState.currentUser = action.value;
      return newState;
    case 'setArea':
      newState.currentArea = action.value;
      return newState;
    case 'unSetProject':
      newState.currentProject = {};
      return newState;
    case 'unSetArea':
      newState.currentArea = '';
      return newState;
    case 'reset':
      newState.reset = !newState.reset;
      return newState;
    default :
      return state;
  }
};

export const AppContextProvider = ({children}) => {
  const [appContextState, appContextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ appContextState, appContextDispatch }),[appContextState, appContextDispatch]);
  const { projectId, areaAlias } = useParams();
  const { projectList } = appContextState;
  const navigate = useRef(useNavigate());
  
  useEffect(() => {
    getUserInfoReq().then( ([result, jsonData]) => (result)? appContextDispatch({ type: 'setUser', value: jsonData }) : navigate.current('/auth'));
    getProjectListReq().then( ([result, jsonData]) => (result)? appContextDispatch({ type: 'setProjectList', value: jsonData }) : navigate.current('/auth'));
  },[appContextState.reset]);

  useEffect(() => {
    if(projectId){
      if( projectList.length ) appContextDispatch({ type: 'setProject', value: projectId });
    }else{
      appContextDispatch({ type: 'unSetProject' });
    }
  },[projectList, projectId]);

  useEffect(() => {
    (areaAlias) ? appContextDispatch({ type: 'setArea', value: areaAlias }) : appContextDispatch({ type: 'unSetArea', value: areaAlias })
  },[areaAlias]);

  return (
    <AppContext.Provider value={contextValue}>
    { children }
    </AppContext.Provider>
  );
};
import { useMemo, createContext, useReducer } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
    
    default :
      return state;
  }
};

export const AppContextProvider = ({children}) => {
  const [appContextState, appContextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ appContextState, appContextDispatch }),[appContextState, appContextDispatch]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfoReq().then( ([result, jsonData]) => (result)? appContextDispatch({ type: 'setUser', value: jsonData }) : navigate('/auth'));
    getProjectListReq().then( ([result, jsonData]) => (result)? appContextDispatch({ type: 'setProjectList', value: jsonData }) : navigate('/auth'));
  },[]);

  return (
    <AppContext.Provider value={contextValue}>
    { children }
    </AppContext.Provider>
  );
};
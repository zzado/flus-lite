import { useMemo, createContext, useReducer } from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserInfo, getProjectList } from '../utils'

export const AppContext = createContext();

const initialState = {
  projectList : [],
  currentProject : {},
  currentUser : {},
  currentArea : '',
  reset : false,
};

const contextReducer = (state, action) => {
  const newState = { projectList : state.projectList, currentProject : state.currentProject, currentUser : state.currentUser, currentArea : state.currentArea, reset : state.reset };
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
  const [contextState, contextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ contextState, contextDispatch }),[contextState, contextDispatch]);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then( ([result, jsonData]) => (result)? contextDispatch({ type: 'setUser', value: jsonData }) : navigate('/auth'));
    getProjectList().then( ([result, jsonData]) => (result)? contextDispatch({ type: 'setProjectList', value: jsonData }) : navigate('/auth'));
  },[]);

  return (
    <AppContext.Provider value={contextValue}>
    { children }
    </AppContext.Provider>
  );
};
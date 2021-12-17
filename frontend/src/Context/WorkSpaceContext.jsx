import { useMemo, createContext, useReducer, useEffect, useContext, useRef } from 'react';
import { getAssetListByAreaAliasReq } from '../utils'
import { AppContext } from '../Context/AppContext';
import { useNavigate } from "react-router-dom";

export const WorkSpaceContext = createContext();

const initialState = {
  assetList : [],
  resetAsset : true,
};

const contextReducer = (state, action) => {
  const newState = { ...state };
  console.log(action);
  switch (action.type) {
    case 'setAssetList':
      newState.assetList = action.value.sort( (e1, e2) => (e1.num  > e2.num) ? 1 : -1 );
      return newState;
    case 'resetAsset' :
      newState.resetAsset = !newState.resetAsset;
      return newState;
    default :
      return state;
  }
};

export const WorkSpaceContextProvider = ({children}) => {
  const [WorkSpaceContextState, WorkSpaceContextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ WorkSpaceContextState, WorkSpaceContextDispatch }),[WorkSpaceContextState, WorkSpaceContextDispatch]);

  const { appContextState } = useContext(AppContext);
  const { currentProject, currentArea } = appContextState;
  
  const navigate = useRef(useNavigate());
  useEffect(() => {
    if(currentProject.id && currentArea){
      getAssetListByAreaAliasReq(currentProject.id, currentArea).then( ([result, jsonData]) => (result)? WorkSpaceContextDispatch({ type: 'setAssetList', value: jsonData }) : navigate.current('/auth'));
    }
  },[currentProject, currentArea, WorkSpaceContextState.resetAsset]);

  return (
    <WorkSpaceContext.Provider value={contextValue}>
    { children }
    </WorkSpaceContext.Provider>
  );
};
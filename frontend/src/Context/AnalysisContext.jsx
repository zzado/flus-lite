import { useMemo, createContext, useReducer } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserInfoReq, getAssetListByAreaAliasReq } from '../utils'

export const AnalysisContext = createContext();

const initialState = {
  assetList : [],
};

const contextReducer = (state, action) => {
  const newState = { ...state };
  console.log(action);
  switch (action.type) {
    case 'setAssetList':
      newState.assetList = action.value;
      return newState;
    default :
      return state;
  }
};

export const AnalysisContextProvider = ({children}) => {
  const [analysisContextState, analysisContextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ analysisContextState, analysisContextDispatch }),[analysisContextState, analysisContextDispatch]);

  return (
    <AnalysisContext.Provider value={contextValue}>
    { children }
    </AnalysisContext.Provider>
  );
};
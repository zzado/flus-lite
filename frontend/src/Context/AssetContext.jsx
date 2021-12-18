import { useMemo, createContext, useReducer, useEffect,  useRef } from 'react';
import { getAssetListByAreaAliasReq } from '../utils'
import { useNavigate, useParams } from "react-router-dom";

export const AssetContext = createContext();

const initialState = {
  assetList : [],
  reset : true,
};

const contextReducer = (state, action) => {
  const newState = { ...state };
  console.log(action);
  switch (action.type) {
    case 'setAssetList':
      newState.assetList = action.value.sort( (e1, e2) => (e1.num  > e2.num) ? 1 : -1 );
      return newState;
    case 'reset' :
      newState.reset = !newState.reset;
      return newState;
    default :
      return state;
  }
};

export const AssetContextProvider = ({children}) => {
  const [AssetContextState, AssetContextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ AssetContextState, AssetContextDispatch }),[AssetContextState, AssetContextDispatch]);
  const { projectId, areaAlias } = useParams();
  const navigate = useRef(useNavigate());

  useEffect(() => {
    if(projectId && areaAlias){
      getAssetListByAreaAliasReq(projectId, areaAlias).then( ([result, jsonData]) => (result)? AssetContextDispatch({ type: 'setAssetList', value: jsonData }) : navigate.current('/auth'));
    }
  },[projectId, areaAlias, AssetContextState.reset]);

  return (
    <AssetContext.Provider value={contextValue}>
    { children }
    </AssetContext.Provider>
  );
};
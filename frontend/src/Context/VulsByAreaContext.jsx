import { useMemo, createContext, useReducer, useEffect,  useRef } from 'react';
import { getVulListByAreaReq, getAssetReq } from '../utils'
import { useNavigate, useParams } from "react-router-dom";

export const VulsByAreaContext = createContext();

const initialState = {
  vulList : [],
  reset : true,
};

const contextReducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'setVulList':
      newState.vulList = action.value;
      return newState;
    case 'reset' :
      newState.reset = !newState.reset;
      return newState;
    default :
      return state;
  }
};

export const VulsByAreaContextProvider = ({children}) => {
  const [VulsByAreaContextState, VulsByAreaContextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ VulsByAreaContextState, VulsByAreaContextDispatch }),[VulsByAreaContextState, VulsByAreaContextDispatch]);
  const { projectId, areaAlias } = useParams();
  const navigate = useRef(useNavigate());

  useEffect(() => {
    if(projectId && areaAlias){
      getVulListByAreaReq(assetId).then( ([result, jsonData]) => (result)? VulsByAreaContextDispatch({ type: 'setVulList', value: jsonData }) : navigate.current('/auth'));
    }
  },[projectId, areaAlias, VulsByAreaContextState.reset]);

  return (
    <VulsByAreaContextState.Provider value={contextValue}>
    { children }
    </VulsByAreaContextState.Provider>
  );
};
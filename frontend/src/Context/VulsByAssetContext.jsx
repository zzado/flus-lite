import { useMemo, createContext, useReducer, useEffect,  useRef } from 'react';
import { getVulListByAssetReq, getAssetReq } from '../utils'
import { useNavigate, useParams } from "react-router-dom";

export const VulsByAssetContext = createContext();

const initialState = {
  vulList : [],
  assetObj : {},
  reset : true,
};

const contextReducer = (state, action) => {
  const newState = { ...state };
  console.log(action);
  switch (action.type) {
    case 'setVulList':
      newState.vulList = action.value;
      return newState;
    case 'setAssetObj':
        newState.assetObj = action.value;
        return newState;
    case 'reset' :
      newState.reset = !newState.reset;
      return newState;
    default :
      return state;
  }
};

export const VulsByAssetContextProvider = ({children}) => {
  const [VulsByAssetContextState, VulsByAssetContextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ VulsByAssetContextState, VulsByAssetContextDispatch }),[VulsByAssetContextState, VulsByAssetContextDispatch]);
  const { assetId } = useParams();
  const navigate = useRef(useNavigate());
  
  useEffect(() => {
    if(assetId){
      getAssetReq(assetId).then( ([result, jsonData])=> result ? VulsByAssetContextDispatch({ type: 'setAssetObj', value: jsonData }) : navigate.current('/auth'));
      getVulListByAssetReq(assetId).then( ([result, jsonData]) => (result)? VulsByAssetContextDispatch({ type: 'setVulList', value: jsonData }) : navigate.current('/auth'));
    }
  },[assetId, VulsByAssetContextState.reset]);

  return (
    <VulsByAssetContext.Provider value={contextValue}>
    { children }
    </VulsByAssetContext.Provider>
  );
};
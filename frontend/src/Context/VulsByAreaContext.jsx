import { useMemo, createContext, useReducer, useEffect,  useRef } from 'react';
import { getVulListByAreaReq } from '../utils'
import { useNavigate, useParams } from "react-router-dom";

export const VulsByAreaContext = createContext();

const initialState = {
  vulList : [],
  loading : true,
  reset : true,
};

const contextReducer = (state, action) => {
  const newState = { ...state };
  console.log(action);
  switch (action.type) {
    case 'setVulList':
      newState.vulList = action.value;
      return newState;
    case 'reset' :
      newState.reset = !newState.reset;
      return newState;
    case 'loading' :
      newState.loading = action.value;
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

  //VulsByAreaContextDispatch({type: 'setVulList', value: jsonData}) 
  useEffect(() => {
    if(projectId && areaAlias){
      VulsByAreaContextDispatch({type: 'loading', value: true});
      getVulListByAreaReq(projectId, areaAlias).then( ([result, jsonData]) => {
        if(result){
          VulsByAreaContextDispatch({type: 'setVulList', value: jsonData})
          VulsByAreaContextDispatch({type: 'loading', value: false});
        }else{
          navigate.current('/auth');
        }
      });
    }
  },[projectId, areaAlias, VulsByAreaContextState.reset]);

  return (
    <>
    <VulsByAreaContext.Provider value={contextValue}>
    { children }
    </VulsByAreaContext.Provider>
  </>
  );
};
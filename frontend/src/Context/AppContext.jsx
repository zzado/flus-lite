import { useMemo, createContext, useReducer, useRef, useState } from 'react';
import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getPlatformListReq, getVulListByAreaReq, getUserInfoReq, getProjectListReq, getAssetListByAreaAliasReq, getVulListByAssetReq } from '../utils'

export const AppContext = createContext();

const initialState = {
  currentProject : {},
  currentUser : {},
  currentArea : '',

  projectList : [],
  projectReset : false,

  assetList : [],
  assetListReset : false,

  vulList : [],
  vulListLoading : true,
  vulListReset : false,

  vulListByAsset : [],
  vulListByAssetReset : false,
  assetObj : {}

};

const contextReducer = (state, action) => {
  console.log(action);
  const newState = state;
  if(action.type){
    switch (action.type) {
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
      

      default :
        return state;
      }
    }
  else{
    return { ...state, [action.name]: action.value};
  }
};

export const AppContextProvider = ({children}) => {
  const [appContextState, appContextDispatch] = useReducer(contextReducer, initialState);
  const contextValue = useMemo(() => ({ appContextState, appContextDispatch }),[appContextState, appContextDispatch]);
  const { projectId, areaAlias, assetId } = useParams();
  const { currentProject, currentUser, currentArea, projectReset, assetList, assetListReset, vulList, vulListLoading, vulListReset, vulListByAsset, vulListByAssetReset, assetObj, projectList } = appContextState;


  const navigate = useRef(useNavigate());
  
  // init
  useEffect(() => {
    getUserInfoReq().then( ([result, jsonData]) => (result)? appContextDispatch({ name: 'currentUser', value: jsonData }) : navigate.current('/auth'));

    getProjectListReq().then( ([result, jsonData]) => (result)? appContextDispatch({ name: 'projectList', value: jsonData }) : navigate.current('/auth'));
  },[]);


  // projectId 변경시
  useEffect(() => {
    if(projectId){
      if( projectList.length ) appContextDispatch({ type: 'setProject', value: projectId });
    }else{
      appContextDispatch({ name: 'currentProject', value: {} });
    }
  },[projectList, projectId]);

  // areaAlias 변경시
  useEffect(() => {
    (areaAlias) ? appContextDispatch({ name: 'currentArea', value: areaAlias }) : appContextDispatch({ name: 'currentArea', value: '' })
  },[areaAlias]);


  // project 또는 areaAlias 변경시, 해당 프로젝트의 area의 asset정보 가져오기
  useEffect(() => {
    if(projectId && areaAlias){
      getAssetListByAreaAliasReq(projectId, areaAlias).then( ([result, jsonData]) => (result)? appContextDispatch({ name: 'assetList', value: jsonData.sort( (e1, e2) => (e1.num  > e2.num) ? 1 : -1 ) }) : navigate.current('/auth'));

      appContextDispatch({name: 'vulListLoading', value: true});
      getVulListByAreaReq(projectId, areaAlias).then( ([result, jsonData]) => {
        if(result){
          appContextDispatch({name: 'vulList', value: jsonData})
          appContextDispatch({name: 'vulListLoading', value: false});
        }else{
          navigate.current('/auth');
        }
      })
    }
  },[projectId, areaAlias]);

  // 파라미터에 assetid가 있을시 assetlist로부터 assetobj 가져오기
  useEffect(() => {
    if(assetId && assetList.length){
      appContextDispatch({name: 'assetObj', value: assetList.find(e=>e.id === parseInt(assetId))});
    }
  },[assetList, assetId]);


  return (
    <AppContext.Provider value={contextValue}>
    { children }
    </AppContext.Provider>
  );
};



export const useVulListByAssetContext=(assetId)=>{
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { assetObj, vulList, vulListByAsset } = appContextState

  useEffect(() => {
    if(assetId && vulList.length){
      appContextDispatch({name: 'vulListByAsset', value: vulList.filter(e=>e.asset.pk === parseInt(assetId))});
    }
  },[vulList, assetId, appContextDispatch]);
  
  const updateVulList = () => {
    getVulListByAssetReq(assetId).then( ([result, jsonData]) => {
      if(result) appContextDispatch({name: 'vulList', value: [ ...vulList.filter(e=>e.asset.pk !== parseInt(assetId)), ...jsonData].sort( (e1, e2) => (e1.id  > e2.id) ? 1 : -1 )})
    })
  }

  return ({ assetObj: assetObj, vulListByAsset: vulListByAsset, updateVulList : updateVulList });
}


export const useAssetContext=()=>{
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject, currentArea, assetObj, assetList } = appContextState
  const [ platformList, setPlatformList ] = useState([]);
  useEffect(() => {
    if(currentProject.compliance) getPlatformListReq(currentProject.compliance, currentArea).then( ([result, jsonData]) => (result)? setPlatformList(jsonData) : console.log('fetch failed'));
  }, [currentArea, currentProject.compliance]);

  const resetAssetList = () => {
    getAssetListByAreaAliasReq(currentProject.id, currentArea).then( ([result, jsonData]) => appContextDispatch({ name: 'assetList', value: jsonData.sort( (e1, e2) => (e1.num  > e2.num) ? 1 : -1 ) }));
  }

  return ({ platformList: platformList, assetObj: assetObj, assetList: assetList, resetAssetList : resetAssetList });
}
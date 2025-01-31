import { useMemo, createContext, useCallback, useReducer, useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getVulListByAreaReq, getUserInfoReq, getProjectListReq, getAssetListByAreaAliasReq } from 'utils'
const { PROJECT_FIELD } = global.config;
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
  return { ...state, [action.name]: action.value};
};

export const AppContextProvider = ({children}) => {
  const [appContextState, appContextDispatch] = useReducer(contextReducer, initialState);
  const { projectId, areaAlias, assetId } = useParams();
  const { assetList, projectList } = appContextState;

  const navigate = useRef(useNavigate())
  
  const sortProjectList = useCallback(
    ( projectList ) =>{
    let sortedProjectList = []
    for(let projectObj of projectList){
      let sortedArea = [];
      for(let element of PROJECT_FIELD.EFI_PROJECT_AREALIST){
        for(let _ of projectObj.area){
          if(element.value === _.split('-').pop())
            sortedArea.push(_);
        }
      }
      projectObj.area = sortedArea;
      sortedProjectList.push(projectObj);
    }
    return sortedProjectList;
  },[]);

  // init
  useEffect(() => {
    getUserInfoReq().then( ([result, jsonData]) => (result)? appContextDispatch({ name: 'currentUser', value: jsonData }) : navigate.current('/auth'));

    getProjectListReq().then( ([result, jsonData]) => {
      if(result){
        appContextDispatch({ name: 'projectList', value: sortProjectList(jsonData) })
      }else{
        navigate.current('/auth');
      }
    });
  },[sortProjectList]);

  // projectId 변경시
  useEffect(() => {
      projectId ? appContextDispatch({ name: 'currentProject', value: projectList.find(e=>e.id===parseInt(projectId)) || {} })
      : appContextDispatch({ name: 'currentProject', value: {} })
  },[projectList, projectId]);

  // areaAlias 변경시
  useEffect(() => {
    areaAlias ? appContextDispatch({ name: 'currentArea', value: areaAlias })
    : appContextDispatch({ name: 'currentArea', value: '' })
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


  const contextValue = useMemo(() => ({ appContextState, appContextDispatch, sortProjectList }),[appContextState, appContextDispatch, sortProjectList]);
  return (
    <AppContext.Provider value={contextValue}>
    { children }
    </AppContext.Provider>
  );
};
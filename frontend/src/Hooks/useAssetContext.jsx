import { useContext, useState, useCallback } from 'react';
import { getPlatformListReq, getAssetListByAreaAliasReq } from 'utils'
import { AppContext } from 'Context/AppContext';

export const useAssetContext=()=>{
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject, currentArea, assetObj, assetList } = appContextState
  const [ platformList, setPlatformList ] = useState([]);

  const getPlatformList = useCallback(() => {
    getPlatformListReq(currentProject.compliance, currentArea).then( ([result, jsonData]) => (result)? setPlatformList(jsonData) : console.log('fetch failed'));
  },[currentArea, currentProject.compliance]);


  const resetAssetList = useCallback(() => {
    getAssetListByAreaAliasReq(currentProject.id, currentArea).then( ([result, jsonData]) => appContextDispatch({ name: 'assetList', value: jsonData.sort( (e1, e2) => (e1.num  > e2.num) ? 1 : -1 ) }));
  },[appContextDispatch, currentArea, currentProject.id]);

  return ({ platformList: platformList, assetObj: assetObj, assetList: assetList, resetAssetList : resetAssetList, getPlatformList: getPlatformList });
}
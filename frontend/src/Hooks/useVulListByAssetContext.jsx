import { useContext, useEffect, useCallback } from 'react';
import { getVulListByAssetReq } from 'utils'
import { AppContext } from 'Context/AppContext';

export const useVulListByAssetContext=(assetId)=>{
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { assetObj, vulList, vulListByAsset } = appContextState

  useEffect(() => {
    if(assetId && vulList.length){
      appContextDispatch({name: 'vulListByAsset', value: vulList.filter(e=>e.asset.pk === parseInt(assetId))});
    }
  },[vulList, assetId, appContextDispatch]);
  
  const updateVulList = useCallback(() => {
    getVulListByAssetReq(assetId).then( ([result, jsonData]) => {
      if(result) appContextDispatch({name: 'vulList', value: [ ...vulList.filter(e=>e.asset.pk !== parseInt(assetId)), ...jsonData].sort( (e1, e2) => (e1.id  > e2.id) ? 1 : -1 )})
    })
  },[appContextDispatch, assetId, vulList]);

  return ({ assetObj: assetObj, vulListByAsset: vulListByAsset, updateVulList : updateVulList });
}
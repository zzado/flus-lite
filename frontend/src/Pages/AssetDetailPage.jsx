import { useEffect, Fragment, useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import AssetInfoTable from '../Components/AssetInfoTable';
import { AssetContext } from '../Context/AssetContext';
import { AppContext } from '../Context/AppContext';

export default function AssetDetailPage(){
  const { AssetContextState, AssetContextDispatch } = useContext(AssetContext);
  const { assetList } = AssetContextState;
  const { appContextState } = useContext(AppContext);
  const { currentProject } = appContextState;

  const { areaAlias, assetId } = useParams();
  const [ assetObj, setAssetObj ] = useState(false);

  useEffect(() => {
    setAssetObj(assetList.find(e=>e.id === parseInt(assetId, 10)));
  },[assetList, assetId]);

  return (
    <Fragment>
      <div className="card shadow mb-4">
        { assetObj ? 
        <AssetInfoTable action={'detail'} assetList={assetList} projectObj={currentProject} assetObj={assetObj} areaAlias={areaAlias} AssetContextDispatch={AssetContextDispatch}/>
        : null}
        </div>
    </Fragment>
  );
}

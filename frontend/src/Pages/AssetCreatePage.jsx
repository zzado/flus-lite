import { Fragment, useContext } from 'react';
import { useParams } from "react-router-dom";
import AssetInfoTable from '../Components/AssetInfoTable';
import { AssetContext } from '../Context/AssetContext';
import { AppContext } from '../Context/AppContext';

export default function AssetCreatePage(){
  const { AssetContextState, AssetContextDispatch } = useContext(AssetContext);
  const { assetList } = AssetContextState;
  const { appContextState } = useContext(AppContext);
  const { currentProject } = appContextState;
  const { areaAlias } = useParams();

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <AssetInfoTable action={'create'} assetList={assetList} projectObj={currentProject} assetObj={false} areaAlias={areaAlias} AssetContextDispatch={AssetContextDispatch}/>
      </div>
    </Fragment>
  );
}

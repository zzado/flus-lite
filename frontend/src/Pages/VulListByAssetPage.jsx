import { Fragment, useState, useContext, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import AssetInfoTable from '../Components/AssetInfoTable';
import { VulsByAssetContext } from '../Context/VulsByAssetContext';
import VulListTable from '../Components/VulListTable';
import VulFilterBar from '../Components/VulFilterBar';

export default function VulListByAssetPage(){
  const { projectId, areaAlias, assetId } = useParams();

  const { VulsByAssetContextState } = useContext(VulsByAssetContext);
  const { vulList, assetObj } = VulsByAssetContextState;
  
  const [vulResultFilter, setVulResultFilter] = useState(false);
  
  const vulTable = useMemo(()=><VulListTable asseCodeDisplay={false} vulList={vulList} vulResultFilter={vulResultFilter}/>, [vulList, vulResultFilter]);

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className='m-0 font-weight-bold search-title'>자산 별 취약점</span>
          <Button size="sm" as={Link} to={`/w/${projectId}/${areaAlias}/step1`} >뒤로</Button>
        </div>
        <div className="card-body">
          <AssetInfoTable action={'component'} assetObj={assetObj} areaAlias={areaAlias}/>

          <div className="card-header py-3">
            <span className="font-weight-bold">평가항목</span>
            <VulFilterBar vulResultFilter={vulResultFilter} setVulResultFilter={setVulResultFilter} serachable={true}/>
            
            { (areaAlias !== 'FISM')? 
              <Button size="sm" as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetId}/vul-grid`} style={{marginLeft : '5px'}}>일괄 등록</Button>
            : null}
          </div>

          { vulTable }

        </div>
      </div>
    </Fragment>
  );
}


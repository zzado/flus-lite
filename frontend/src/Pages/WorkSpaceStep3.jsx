import { Fragment, useContext, useMemo } from 'react';
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { VulsByAreaContext } from '../Context/VulsByAreaContext';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap'
import VulListTable from '../Components/VulListTable';
import VulFilterBar from '../Components/VulFilterBar';

export default function WorkSpaceStep3(){
  const { projectId, areaAlias } = useParams();
  const { VulsByAreaContextState } = useContext(VulsByAreaContext);
  const { vulList, loading } = VulsByAreaContextState;
  const [ vulResultFilter, setVulResultFilter ] = useState('Y');

  console.log('11')
  
  const vulTable = useMemo(()=><VulListTable asseCodeDisplay={true} vulList={vulList} vulResultFilter={vulResultFilter}/>, [vulList, vulResultFilter]);

  const SubMenuBox = () => {
    return (
      <div className="card-header py-3">
        <span className="font-weight-bold">평가항목</span>
        <VulFilterBar vulResultFilter={vulResultFilter} setVulResultFilter={setVulResultFilter}/>
        <Button size="sm" as={Link} to={`/w/${projectId}/${areaAlias}/vuls-grid`} style={{marginLeft : '5px'}}>일괄 등록</Button>
        
      </div>
    )
  };

  return (
    <Fragment>
      <div className="card shadow mb-4">
        <SubMenuBox />
        <div className="card-body">
        {loading ? <Spinner animation="border" role="status"/> : vulTable }
        </div>
      </div>
    </Fragment>
  );
}

import { useEffect, Fragment, useReducer, useMemo } from 'react';
import { useParams, Link, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getVulReq, editVulReq } from '../utils'
import VulInfoTable from '../Components/VulInfoTable';
import POCInfoTable from '../Components/POCInfoTable';

const pocListStateReducer = (state, action) => {
  switch(action.type) {
    case 'set' :
      return [ ...action.value ];
    case 'append':
      return [ ...state, action.value ];
    case 'delete':
      console.log(state.filter((e, idx) => idx !== action.value))
      return state.filter((e, idx) => idx !== action.value);
    case 'update':
      state[action.idx][action.name] = action.value;
      return [ ...state ];
    default:
      return state;
  }
};

const vulObjStateReducer = (state, action) => {
  return (action.type === 'set')? { ...action.value } : { ...state, [action.name]: action.value };
};

export default function VulEditPage(props){
  const { projectId, areaAlias, assetId, vulId } = useParams();
  const { state } = useLocation();
  const [ vulObj, vulObjDispatch ] = useReducer(vulObjStateReducer, (state) ? state.vulObj : {});
  const [ pocList, pocListDispatch ] = useReducer(pocListStateReducer, vulObj ? vulObj.pocs : []);
  
  useEffect(() => {
    if(Object.keys(vulObj).length === 0){
      getVulReq(vulId).then( ([result, jsonData])=> (result)? vulObjDispatch({ type: 'set', value: jsonData}) : console.log('error'));
      pocListDispatch({ type: 'set', value: vulObj.pocs });
    }
  },[vulId, vulObj]);

  
  const saveVulObj = () =>{
    console.log(pocList);
    console.log(vulObj);
    editVulReq(vulId, vulObj).then(([result, jsonData])=> { vulObjDispatch({ type: 'set', value: jsonData}); });
  }

  const pocTable = useMemo(()=> <POCInfoTable pocList={pocList} pocListDispatch={pocListDispatch}/>, [pocList]);
  const vulTable = useMemo(()=> <VulInfoTable vulObj={vulObj} vulObjDispatch={vulObjDispatch}/>, [vulObj]);

  return (
    <Fragment>
      <div className="card shadow mb-4">
      <div className="card-header py-3">
        <span className='m-0 font-weight-bold search-title'>취약점 상세</span>
        <Button size="sm" as={Link} to={`/v-a/${projectId}/${areaAlias}/${assetId}`}>뒤로</Button>
        <Button size="sm" onClick={ saveVulObj }>저장</Button>
      </div>
        <div className="card-body">
          { vulTable }
          { pocTable }
          <div className="form-actions">
          </div>
        </div>
      </div>
    </Fragment>
  );
}

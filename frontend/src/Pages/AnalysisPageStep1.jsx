import { Fragment, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton, Table, Button } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';
import { AnalysisContext } from '../Context/AnalysisContext';
import  AnalysisStepNavBar from '../Components/AnalysisStepNavBar';
import { getAssetListByAreaAliasReq } from '../utils'

export default function AnalysisPageStep1(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { analysisContextState, analysisContextDispatch } = useContext(AnalysisContext);
  const { projectList, currentArea } = appContextState;
  const { projectId, areaAlias } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if(projectList.length) appContextDispatch({ type: 'setProject', value: projectId });
  },[projectList]);

  useEffect(() => {
    appContextDispatch({ type: 'setArea', value: areaAlias });
    getAssetListByAreaAliasReq().then( ([result, jsonData]) => (result)? analysisContextDispatch({ type: 'setAssetList', value: jsonData }) : navigate('/auth'));
  },[]);


  const SubMenuBox = () => {
    return (
      <div className="card-header py-3">
        <DropdownButton size="sm" title="자산 등록">
          <Dropdown.Item as={Link} to="/p/create">개별 등록</Dropdown.Item>
          <Dropdown.Item as={Link} to="/p/create">일괄 등록(XLSX)</Dropdown.Item>
        </DropdownButton>
      </div>
    )
  };
  
  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
      <AnalysisStepNavBar step={1}/>
      <div className="card shadow mb-4">
        <SubMenuBox/>
        <div className="card-body">
        <Table responsive="md" hover >
          <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>번호</th>
              <th>자산코드</th>
              <th>업무명/용도</th>
              <th>평가자</th>
              <th>담당자</th>
              <th>진행상황</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox"/></td>
              <td>1</td>
              <td><span className="label">M1</span></td>
              <td><a href="/asset/analysis/9/FISM/290/A/">정보보호관리체계</a></td>
              <td ><span className="label">미정</span></td>
              <td ><span className="label">미정</span></td>
              <td><span className="label label-secondary">분석중</span></td>
            </tr>
          </tbody>
        </Table>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

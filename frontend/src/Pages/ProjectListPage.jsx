import { Fragment, useContext } from 'react';
import { Link } from "react-router-dom";
import { Dropdown, DropdownButton, Table, Button } from "react-bootstrap";
import { AppContext } from '../Context/AppContext';


export default function ProjectListPage(){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { projectList } = appContextState;

  const SubMenuBox = () => {
    return (
      <div className="emptybox text-center" style={{width: '100%', display: 'inline-flex', flexDirection: 'column'}}>
        <div style={{width: '100%', margin: '5px 0px'}}>
        <Button as={Link} size="sm" to="/p/create/" style={{marginLeft: '5px', float: 'right'}}>프로젝트 생성</Button>
        
        <DropdownButton size="sm" title="프로젝트 가져오기/내보내기">
          <Dropdown.Item as={Link} to="/p/create/EFI">프로젝트 가져오기</Dropdown.Item>
          <Dropdown.Item as={Link} to="/p/create/OPEN">프로젝트 내보내기</Dropdown.Item>
        </DropdownButton>
        </div>
      </div>
    )
  };

  return (
    <Fragment>
    <div className="container-fluid" style={{width: '95%'}}>
    <SubMenuBox/>
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <span className="m-0 font-weight-bold search-title">프로젝트 목록</span>
      </div>
      <div className="card-body">
      <Table responsive="md" hover >
        <thead>
        <tr>
            <th></th>
            <th>번호</th>
            <th>프로젝트명</th>
            <th>평가대상기관</th>
            <th>평가기준</th>
            <th>시작일</th>
            <th>종료일</th>
        </tr>
        </thead>
        <tbody>
        { projectList.map((projectObj, idx) => (
        <tr key={idx}>
          <td><input type="checkbox"/></td>
          <td>{idx+1}</td>
          <td><Link to={`/p/${projectObj.id}`} key={idx}>{projectObj.name}</Link></td>
          <td>{projectObj.client_company}</td>
          <td>{projectObj.compliance}</td>
          <td>{projectObj.start_date}</td>
          <td>{projectObj.end_date}</td>
        </tr>
        ))}
        </tbody>
      </Table>
      </div>
    </div>
    </div>
    </Fragment>
  );
}

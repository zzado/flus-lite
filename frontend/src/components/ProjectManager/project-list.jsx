import { Fragment, useContext } from 'react';
import { Link } from "react-router-dom";
import { LayOutContext } from "../LayOut/layout"
import { Dropdown, DropdownButton, Table, Button } from "react-bootstrap";


export default function ProjectListPage(props){
    const { projectList  } = useContext(LayOutContext);

    const SubMenuBox = () => {
        return (
        <div className="emptybox text-center" style={{width: '100%', display: 'inline-flex', flexDirection: 'column'}}>
            <div style={{width: '100%', margin: '5px 0px'}}>
            <DropdownButton id="dropdown-basic-button" size="sm" title="프로젝트 생성" style={{marginLeft: '5px', float: 'right'}}>
                <Dropdown.Item as={Link} to="/p/create/EFI">전자금융기반시설</Dropdown.Item>
                <Dropdown.Item as={Link} to="/p/create/OPEN">공개용</Dropdown.Item>
            </DropdownButton>

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
                <tr>
                    <td><input type="checkbox"/></td>
                    <td>{idx}</td>
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

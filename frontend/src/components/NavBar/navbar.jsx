import { Link, Navigate} from "react-router-dom";
import {Dropdown,DropdownButton } from "react-bootstrap";
import {LayOutContext} from "../LayOut/layout";
import {useContext} from "react";

function TopBar(props){
  const { setSelectedProject, setSelectedAreaAlias, setAreaAliasList, selectedProject, selectedAreaAlias, currentUser, projectList, areaAliasList } = useContext(LayOutContext);
  
  const ProjectSelectButton = () => {
    return (
      <DropdownButton id="dropdown-basic-button" size="sm" 
        onSelect={(evtkey)=>
        {
            setSelectedProject(projectList.find( (e) => e.id === parseInt(evtkey)));
         }} 
        title={selectedProject.name || "프로젝트 선택 (클릭하세요)"}
        style={{float: 'left'}}>
      { projectList && projectList.map((projectObj) => (
        <Dropdown.Item as={Link} to={`/p/${projectObj.id}`} key={projectObj.id} eventKey={projectObj.id}>{projectObj.name}</Dropdown.Item>
      ))}
      </DropdownButton>
    )
  }

  const ProjectAreaSelectButton = (props) => {
    return (selectedProject.hasOwnProperty('id')) ? 
      (<DropdownButton id="dropdown-basic-button" onSelect={(evtkey)=>
        {
          setSelectedAreaAlias(evtkey);
       }} size="sm" title={selectedAreaAlias || "분야 선택 (클릭하세요)"} style={{marginLeft: '15px', float: 'left'}}>
      { areaAliasList && areaAliasList.map((areaAlias, idx) => (
        <Dropdown.Item as={Link} to={`/p/${selectedProject.id}/${areaAlias}`} key={idx} eventKey={areaAlias}>{areaAlias}</Dropdown.Item>
      ))}
      </DropdownButton>):null;
  }

  const UserUpdateButton = (props) => {
    return (
      <div style={{float: 'right', marginLeft: '10px'}}>
        <Link to="/auth/update" style={{fontSize: '12px', fontWeight: 'bold', color: '#666', verticalAlign: 'middle', padding: '0rem', textDecoration: 'underline'}}><i className="icon-off" />정보수정</Link>
      </div>);
  }

  const LogOutButton = () => {
    return (
      <div style={{float: 'right', marginLeft: '10px'}}>
        <Link to="/auth/logout" style={{fontSize: '12px', fontWeight: 'bold', color: '#666', verticalAlign: 'middle', padding: '0rem', textDecoration: 'underline'}}><i className="icon-off" />로그아웃</Link>
      </div>
      )
  }

  const UserNameBadge = () => {
    return (
      <div style={{float: 'right', marginLeft: '10px'}}>
          <span className="badge badge-secondary" style={{padding: '0.3rem', fontSize: '12px'}}> {currentUser.username} 님</span>
      </div>
      );
  }

  const ManagerBadge = () => {
    return (currentUser.is_manager) ? (
      <div style={{float: 'right', marginLeft: '10px'}}>
        <span className="badge badge-success" style={{padding: '0.3rem', fontSize: '12px'}}>프로젝트 관리자</span>
      </div>
      ) : null ;
  }

  const AdminBadge = () => {
    return (currentUser.is_admin) ? (
      <div style={{float: 'right', marginLeft: '10px'}}>
          <span className="badge badge-danger" style={{padding: '0.3rem', fontSize: '12px'}}>최고 관리자</span>
        </div>
      ) : null;
  }

  return (
    <nav className="navbar navbar-expand navbar-light mb-4 leftbar" style={{padding: '0px', margin: '0px', width: '100%', marginBottom: '0rem!important'}}>
      <div className="shadow" style={{flexWrap: 'wrap', padding: '0.75rem 1rem', marginBottom: '1rem', listStyle: 'none', backgroundColor: '#fafafa', borderRadius: '0rem', margin: '0px', fontWeight: 'bold', width: '100%'}}>
        <ProjectSelectButton />
        <ProjectAreaSelectButton />
        <UserUpdateButton/>
        <LogOutButton/>
        <UserNameBadge/>
        <ManagerBadge/>
        <AdminBadge/>
      </div>
    </nav>
  );
};


function SideBar(props){
  const { setSelectedAreaAlias, selectedAreaAlias, currentUser, areaAliasList, selectedProject } = useContext(LayOutContext);
  

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <div className="banner">
        <a href="/dashboard" className="logo" style={{ textDecoration: 'none' }}><span>FLUS</span><span className="logo version">LITE</span></a>
        <a href="/dashboard"><img className="logo image" src="/img/banner-logo.png" alt=""/></a>
      </div>

      <div className="sidebar-heading" style={{color: '#FFF'}}>
        평가 현황 및 수행
      </div>

      <li className="nav-item">
        <a className="nav-link" href="/dashboard">
          <i className="fas fa-fw fa-tasks" />
          <span>프로젝트 진행현황</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link collapsed" href="/p">
          <i className="fas fa-fw fa-cog" />
          <span>프로젝트 관리</span>
        </a>
      </li>

      <li className="nav-item">
        <span className="nav-link collapsed">
          <i className="fas fa-fw fa-wrench" />
          <span>분야별 평가수행</span>
        </span>
        <div className="collapse_display">
          <div className="bg-white py-2 collapse-inner rounded">
          { areaAliasList && areaAliasList.map((areaAlias, idx) => (
            <Link to={`/p/${selectedProject}/${areaAlias}`} key={idx} className="dropdown-item dropdown-item1 flus_url">{areaAlias}</Link>
          ))}
          </div>
        </div>
      </li>
    
      <hr className="sidebar-divider" />

      <div className="sidebar-heading" style={{color: '#FFF'}}>
        평가 통계
      </div>

      <li className="nav-item">
        <div className="nav-link collapsed">
          <i className="fas fa-fw fa-chart-bar" />
          <span>프로젝트 통계/결과서</span>
        </div>

        <div className="collapse_display" >
          <div className="bg-white py-2 collapse-inner rounded">
            <a className="dropdown-item dropdown-item1" style={{cursor: 'pointer'}} href="/p/total_project_stats">프로젝트 통계</a>
            <a className="dropdown-item dropdown-item2" style={{cursor: 'pointer'}} href="/p/total_project_report">프로젝트 결과서</a>
          </div>
        </div>
      </li>

    <hr className="sidebar-divider my" />
    
    <div className="sidebar-heading">
      <span style={{marginRight: '10px', color: '#FFF'}}>평가 자료</span>
      <select id="compliance_no" style={{width: '80px', fontSize: '8px', borderRadius: '5px', float: 'right'}}>
        <option value="2020-01">2020</option>
        <option value="2021-01">2021</option>
        <option value="2022-01" defaultValue>2022</option>
      </select>
      <span style={{float: 'right', color: '#FFF', fontWeight: 'bold', marginRight: '5px'}}>선택</span>
    </div>

    <li className="nav-item">
      <div className="nav-link collapsed">
        <i className="fas fa-download" />
        <span>평가도구 다운로드</span>
      </div>
      <div className="collapse_display">
        <div className="bg-white py-2 collapse-inner rounded">
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/static/tools/2021-01/fsi_server_tools%20(script).zip">서버 점검 스크립트</a>
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/static/tools/2021-01/fsi_db_tools%20(sql_script).zip">DB 점검 SQL/스크립트</a>
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/static/tools/2021-01/PersonalWindowsAnalysis_batch.zip">단말기 정보 수집 스크립트</a>
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/static/tools/2021-01/FISM_INF.zip">비조치 의견서 모음</a>
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/static/tools/2021-01/FSI_Standard.zip">취약점 분석평가 기준(엑셀)</a>
        </div>
      </div>
    </li>

    <li className="nav-item">
      <div className="nav-link collapsed">
        <i className="fas fa-download" />
        <span>문서 양식 다운로드</span>
      </div>
      <div className="collapse_display">
        <div className="bg-white py-2 collapse-inner rounded">
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/static/documents/vul_statistics%20(graph).xlsx">통계 그래프 양식(XlSX)</a>
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/static/documents/2021-01/document_form.zip">회의자료/결과서 양식</a>
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/static/documents/2021-01/FSS.zip">금감원 제출 결과보고서 양식</a>
        </div>
      </div>
    </li>
    <hr className="sidebar-divider" />
    <div className="sidebar-heading" style={{color: '#FFF'}}>
      관리자 메뉴
    </div>
    <li className="nav-item">
      <div className="nav-link collapsed">
        <i className="fas fa-fw fa-cog" />
        <span>도구 관리</span>
      </div>
      <div className="collapse_display">
        <div className="bg-white py-2 collapse-inner rounded">
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/B4B31897454E430EF17C8FDB44FA140E/">계정 관리</a>
          <a className="dropdown-item dropdown-item1 static_file_download" style={{cursor: 'pointer'}} href="/compliance/">평가기준 관리</a>
          <a className="dropdown-item dropdown-item1" style={{cursor: 'pointer'}} id="export_log_link"  href="/p/export_log/">로그 내보내기</a>
        </div>
      </div>
    </li>
    <div style={{height: '3rem'}} />
  </ul>
  );
};
export { SideBar, TopBar };
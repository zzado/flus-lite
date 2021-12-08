import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../Context/AppContext' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTasks, faWrench, faChartBar, faDownload } from '@fortawesome/free-solid-svg-icons'

export default function SideNavBar(props){
  const { contextState } = useContext(AppContext);
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
      <div className="banner">
        <Link to="/dashboard" className="logo" style={{ textDecoration: 'none' }}><span>FLUS</span><span className="logo version">LITE</span></Link>
        <Link to="/dashboard"><img className="logo image" src="/img/banner-logo.png" alt="FLUS"/></Link>
      </div>

      <div className="sidebar-heading" style={{color: '#FFF'}}>
        평가 현황 및 수행
      </div>

      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          <FontAwesomeIcon icon={faTasks} />
          <span> Dashboard</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/p" className="nav-link">
          <FontAwesomeIcon icon={faCog} />
          <span> 프로젝트 관리</span>
        </Link>
      </li>

      <li className="nav-item">
        <div className="nav-link" style={{cursor: 'default'}}>
        <FontAwesomeIcon icon={faWrench} />
          <span> 분야별 평가수행</span>
        </div>
        <div className="collapse_display">
          <div className="bg-white py-2 collapse-inner rounded">
          { contextState.currentProject.area && contextState.currentProject.area.map((areaAlias, idx) => (
            <Link to={`/p/${contextState.currentProject.id}/${areaAlias}`} key={idx} className="dropdown-item dropdown-item1 flus_url">{areaAlias}</Link>
          ))}
          </div>
        </div>
      </li>
    
      <hr className="sidebar-divider" />

      <div className="sidebar-heading" style={{color: '#FFF'}}>
        평가 통계
      </div>

      <li className="nav-item">
        <div className="nav-link" style={{cursor: 'default'}}>
          <FontAwesomeIcon icon={faChartBar} />
          <span> 프로젝트 통계/결과서</span>
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
        <FontAwesomeIcon icon={faDownload} />  
        <span> 평가도구 다운로드</span>
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
        <FontAwesomeIcon icon={faDownload} />  
        <span> 문서 양식 다운로드</span>
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
        <FontAwesomeIcon icon={faCog} />  
        <span> 도구 관리</span>
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
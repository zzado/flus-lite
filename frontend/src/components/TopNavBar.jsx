import { Link } from 'react-router-dom';
import { Dropdown,DropdownButton } from 'react-bootstrap';
import { useContext, Fragment } from 'react';
import { AppContext } from '../Context/AppContext';

export default function TopNavBar(props){
  const { appContextState, appContextDispatch } = useContext(AppContext);
  const { currentProject, projectList, currentArea, currentUser } = appContextState;

  const ProjectSelectButton = () => {
    return (
      <DropdownButton id="dropdown-basic-button" size="sm" title={currentProject.name || "프로젝트 선택 (클릭하세요)"} style={{float: 'left'}}>
      { projectList && projectList.map((projectObj, idx) => (
        <Dropdown.Item as={Link} to={`/p/${projectObj.id}`} key={idx}>{projectObj.name}</Dropdown.Item>
      ))}
      </DropdownButton>
    )
  }

  const ProjectAreaSelectButton = (props) => {
    return (Object.keys(currentProject).length) ? 
      (<DropdownButton id="dropdown-basic-button" size="sm" title={currentArea || "분야 선택 (클릭하세요)"} style={{marginLeft: '15px', float: 'left'}}>
      { currentProject.area && currentProject.area.map((areaAlias, idx) => (
        <Dropdown.Item as={Link} to={`/p/${currentProject.id}/${areaAlias.split('-').pop()}`} key={idx}>{global.config.AREA_RNAME[areaAlias.split('-').pop()]}</Dropdown.Item>
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
        <Link to="/auth" style={{fontSize: '12px', fontWeight: 'bold', color: '#666', verticalAlign: 'middle', padding: '0rem', textDecoration: 'underline'}}><i className="icon-off" />로그아웃</Link>
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

  const CurrentPageInfo = () => {
	return (
		<div style={{float: 'left', width: '100%', marginLeft: '1rem', marginBottom: '1rem', marginTop: '1rem', padding: 0}}>
			<ol className="breadcrumb" style={{margin: 0, padding: 0, background: 'rgba(255, 255, 255, 0)'}}>
				<li className="breadcrumb-item">Nagivate</li>
			</ol>
		</div>
	);
  }

  return (
    <Fragment>
    <nav className="navbar navbar-expand navbar-light leftbar" style={{padding: '0px', margin: '0px', width: '100%', marginBottom: '0rem!important'}}>
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
    <CurrentPageInfo/>
    </Fragment>
  );
};
const StepMenuButtonGroup = () => {
    return (
      <div style={{float: 'left', width: '100%'}}>
        <ul className="nav nav-tabs">
          <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">1</span> 자산 등록</Button></li>
          <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">2</span> 취약점 등록</Button></li>
          <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">3</span> 취약점 목록</Button></li>
          <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">4</span> 분야별 통계</Button></li>
          <li className="menu-tabs"><Button className="menu-tabs-button"><span className="badge badge-sm">5</span> 결과서</Button></li>
        </ul>
      </div>
    );
  };
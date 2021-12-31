import { Fragment } from 'react';

export default function VulInfoTable(props){
  const { vulResultFilter, setVulResultFilter, serachable } = props;

  return (
    <Fragment>
      <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
      <input name="vulResult" type="radio" checked={vulResultFilter === false} onChange={(e)=>setVulResultFilter(false)}/>전체
      </div>
      <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
      <input name="vulResult" type="radio" checked={vulResultFilter === 'Y'} onChange={(e)=>setVulResultFilter('Y')}/>취약
      </div>
      <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
      <input name="vulResult" type="radio" checked={vulResultFilter === 'N'} onChange={(e)=>setVulResultFilter('N')}/>양호
      </div>
      <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
      <input name="vulResult" type="radio" checked={vulResultFilter === 'NA'} onChange={(e)=>setVulResultFilter('NA')}/>N/A
      </div>
      <div className="form-check form-check-inline" style={{marginRight: '5px', marginLeft: '15px', float: 'none', verticalAlign: 'middle'}}>
      <input name="vulResult" type="radio" checked={vulResultFilter === ''} onChange={(e)=>setVulResultFilter('')}/>미정
      </div>
    </Fragment>
  );
}
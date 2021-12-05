import { Fragment } from 'react';

export default function DashBoard(props){
  
  return (
    <Fragment>
    <div style={{float: 'left', width: '100%', marginLeft: '1rem', marginBottom: '0.5rem', padding: 0}}>
      <ol className="breadcrumb" style={{margin: 0, padding: 0, background: 'rgba(255, 255, 255, 0)'}}>
        <li className="breadcrumb-item">Nagivate</li>
      </ol>
    </div>
    <div className="container-fluid" style={{width: '95%'}}>
      proejct list
    </div>
    </Fragment>
  );
}
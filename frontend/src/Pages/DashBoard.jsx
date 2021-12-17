import { useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';

export default function DashBoard(props){
  const { appContextDispatch } = useContext(AppContext);
  
  useEffect(() => {
    appContextDispatch({ type: 'unSetProject'});
    appContextDispatch({ type: 'unSetArea'});
  },[]);
  
  return (
    <div className="container-fluid" style={{width: '95%'}}>
      DashBoard
    </div>
  );
}
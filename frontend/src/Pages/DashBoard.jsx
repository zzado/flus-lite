import { useContext, useEffect } from 'react';
import { AppContext } from '../Context/AppContext';

export default function DashBoard(props){
  const {contextState, contextDispatch} = useContext(AppContext);
  
  useEffect(() => {
    contextDispatch({ type: 'unSetProject'});
    contextDispatch({ type: 'unSetArea'});
  },[]);
  
  return (
    <div className="container-fluid" style={{width: '95%'}}>
      DashBoard
    </div>
  );
}
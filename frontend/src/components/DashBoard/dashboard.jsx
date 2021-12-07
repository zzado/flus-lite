import { Fragment,useContext } from 'react';
import LayOut from '../LayOut/layout';
import { AppContext} from '../../Context/AppContext';

export default function DashBoard(props){
  const {contextState, contextDispatch} = useContext(AppContext);
  return (
    <LayOut>
    <div className="container-fluid" style={{width: '95%'}}>
      proejct list
    
    </div>
    </LayOut>
  );
}
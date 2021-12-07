import { BrowserRouter,Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./utils";

import AuthPage from "./Components/AuthPage/auth";
import DashBoard from "./Components/DashBoard/dashboard";
import ProjectManager from "./Components/ProjectManager/project-manager";
import LayOut from './Components/LayOut/layout'

import {AppContextProvider} from './Context/AppContext'

import 'bootstrap/dist/css/bootstrap.min.css';
import './flus.css';

function App (){
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={ <AuthPage />} />
        <Route path="/dashboard" element={ <AppContextProvider><DashBoard /></AppContextProvider>} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// <Route path="/" element={<PrivateRoute><LayOut /></PrivateRoute>} >
//           <Route index element={<DashBoard />} />
//           <Route path="dashboard" element={<DashBoard />} />
//           <Route path="p/" element={<ProjectManager />} />
//           <Route path="p/:projectId/" element={<ProjectManager />} />
//           <Route path="p/:projectId/:areaAlias" element={<ProjectManager />} />
//         </Route>
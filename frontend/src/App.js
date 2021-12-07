import { BrowserRouter,Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./utils";

import AuthPage from "./components/AuthPage/auth";
import DashBoard from "./components/DashBoard/dashboard";
import ProjectManager from "./components/ProjectManager/project-manager";
import  LayOut from './components/LayOut/layout'

import 'bootstrap/dist/css/bootstrap.min.css';
import './flus.css';

function App (){
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        
        <Route path="/" element={<PrivateRoute><LayOut /></PrivateRoute>} >
          <Route index element={<DashBoard />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="p/" element={<ProjectManager />} />
          <Route path="p/:projectId/" element={<ProjectManager />} />
          <Route path="p/:projectId/:areaAlias" element={<ProjectManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

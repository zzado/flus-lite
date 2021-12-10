import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './utils';

import AuthPage from './Pages/AuthPage';
import DashBoard from './Pages/DashBoard';
import ProjectListPage from './Pages/ProjectListPage';
import ProjectDetailPage from './Pages/ProjectDetailPage';
import ProjectEditPage from './Pages/ProjectEditPage';
import ProjectCreatePage from './Pages/ProjectCreatePage';
import AnalysisPageStep1 from './Pages/AnalysisPageStep1';

import LayOut from './Pages/LayOut';


import { AppContextProvider } from './Context/AppContext';
import '@fortawesome/fontawesome-svg-core/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/flus.css';
import './config';

export default function App (){
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/" element={ <AuthPage />} />
        <Route path="/" element={<PrivateRoute><AppContextProvider><LayOut /></AppContextProvider></PrivateRoute>} >
          <Route index element={<DashBoard />} />
          <Route path="dashboard/" element={<DashBoard />} />
          <Route path="p/" element={<ProjectListPage />} />
          <Route path="p/create" element={<ProjectCreatePage/>} />
          <Route path="p/:projectId/" element={<ProjectDetailPage/>} />
          <Route path="p/:projectId/edit" element={<ProjectEditPage/>} />


          <Route path="p/:projectId/:areaAlias/" element={<AnalysisPageStep1/>} />
          <Route path="p/:projectId/:areaAlias/step1/" element={<AnalysisPageStep1/>} />
          <Route path="p/:projectId/:areaAlias/step2/" element={<AnalysisPageStep1/>} />
          <Route path="p/:projectId/:areaAlias/step3/" element={<AnalysisPageStep1/>} />
          <Route path="p/:projectId/:areaAlias/step4/" element={<AnalysisPageStep1/>} />
          <Route path="p/:projectId/:areaAlias/step5/" element={<AnalysisPageStep1/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './utils';

import AppLayOut from './Pages/AppLayOut';
import AnalysisPageLayOut from './Pages/AnalysisPageLayOut';


import AuthPage from './Pages/AuthPage';
import DashBoard from './Pages/DashBoard';

import ProjectListPage from './Pages/ProjectListPage';
import ProjectDetailPage from './Pages/ProjectDetailPage';
import ProjectEditPage from './Pages/ProjectEditPage';
import ProjectCreatePage from './Pages/ProjectCreatePage';

import AssetCreatePage from './Pages/AssetCreatePage';
import AssetDetailPage from './Pages/AssetDetailPage';

import AnalysisPageStep1 from './Pages/AnalysisPageStep1';

import { AppContextProvider } from './Context/AppContext';
import { AnalysisContextProvider } from './Context/AnalysisContext';
import '@fortawesome/fontawesome-svg-core/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/flus.css';
import './config';

export default function App (){
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/" element={ <AuthPage />} />
        <Route path="/" element={<PrivateRoute><AppContextProvider><AppLayOut /></AppContextProvider></PrivateRoute>} >
          <Route index element={<DashBoard />} />
          <Route path="dashboard/" element={<DashBoard />} />
          <Route path="p/" element={<ProjectListPage />} />
          <Route path="p/create" element={<ProjectCreatePage/>} />
          <Route path="p/:projectId/" element={<ProjectDetailPage/>} />
          <Route path="p/:projectId/edit" element={<ProjectEditPage/>} />

          <Route path="a/:projectId/:areaAlias/create" element={<AssetCreatePage/>} />
          <Route path="a/:projectId/:areaAlias/:assetId" element={<AssetDetailPage/>} />
          <Route path="a/:projectId/:areaAlias/:assetId/edit" element={<AssetCreatePage/>} />
          

          <Route path="p/:projectId/:areaAlias/" element={<AnalysisContextProvider><AnalysisPageLayOut/></AnalysisContextProvider>}>
            <Route index element={<AnalysisPageStep1 />} />
            <Route path="step1/" element={<AnalysisPageStep1/>} />
            <Route path="step2/" element={<AnalysisPageStep1/>} />
            <Route path="step3/" element={<AnalysisPageStep1/>} />
            <Route path="step4/" element={<AnalysisPageStep1/>} />
            <Route path="step5/" element={<AnalysisPageStep1/>} />
          </Route>
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
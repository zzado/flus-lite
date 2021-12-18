import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './utils';

import AppLayOut from './Pages/AppLayOut';
import WorkSpaceLayOut from './Pages/WorkSpaceLayOut';


import AuthPage from './Pages/AuthPage';
import DashBoard from './Pages/DashBoard';

import ProjectListPage from './Pages/ProjectListPage';
import ProjectDetailPage from './Pages/ProjectDetailPage';
import ProjectEditPage from './Pages/ProjectEditPage';
import ProjectCreatePage from './Pages/ProjectCreatePage';

import AssetCreatePage from './Pages/AssetCreatePage';
import AssetDetailPage from './Pages/AssetDetailPage';
import AssetEditPage from './Pages/AssetEditPage';

import WorkSpaceStep1 from './Pages/WorkSpaceStep1';
import WorkSpaceStep2 from './Pages/WorkSpaceStep2';
import VulEditPage from './Pages/VulEditPage';

import VulListByAssetPage from './Pages/VulListByAssetPage';
import { AppContextProvider } from './Context/AppContext';
import { WorkSpaceContextProvider } from './Context/WorkSpaceContext';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'realgrid/dist/realgrid-style.css'
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

          <Route path="a/:projectId/:areaAlias/create" element={<WorkSpaceContextProvider><AssetCreatePage/></WorkSpaceContextProvider>} />
          <Route path="a/:projectId/:areaAlias/:assetId" element={<WorkSpaceContextProvider><AssetDetailPage/></WorkSpaceContextProvider>} />
          <Route path="a/:projectId/:areaAlias/:assetId/edit" element={<WorkSpaceContextProvider><AssetEditPage/></WorkSpaceContextProvider>} />
          
          <Route path="v-a/:projectId/:areaAlias/:assetId" element={<WorkSpaceLayOut step={2}><VulListByAssetPage/></WorkSpaceLayOut>}/>
          
          <Route path="v/:vulId" element={<WorkSpaceLayOut step={2}><VulEditPage/></WorkSpaceLayOut>} />

          <Route path="w/:projectId/:areaAlias/step1" element={<WorkSpaceContextProvider><WorkSpaceLayOut step={1}><WorkSpaceStep1/></WorkSpaceLayOut></WorkSpaceContextProvider>} />
          <Route path="w/:projectId/:areaAlias/step2" element={<WorkSpaceContextProvider><WorkSpaceLayOut step={2}><WorkSpaceStep2/></WorkSpaceLayOut></WorkSpaceContextProvider>} />
          <Route path="w/:projectId/:areaAlias/step3" element={<WorkSpaceContextProvider><WorkSpaceLayOut step={3}><WorkSpaceStep1/></WorkSpaceLayOut></WorkSpaceContextProvider>} />
          <Route path="w/:projectId/:areaAlias/step4" element={<WorkSpaceContextProvider><WorkSpaceLayOut step={4}><WorkSpaceStep1/></WorkSpaceLayOut></WorkSpaceContextProvider>} />
          <Route path="w/:projectId/:areaAlias/step5" element={<WorkSpaceContextProvider><WorkSpaceLayOut step={5}><WorkSpaceStep1/></WorkSpaceLayOut></WorkSpaceContextProvider>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
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
import VulEditPage from './Pages/VulEditPage';


import WorkSpaceStep3 from './Pages/WorkSpaceStep3';
import WorkSpaceStep5 from './Pages/WorkSpaceStep5';
import AssetGridPage from './Pages/AssetGridPage';
import VulGridPage from './Pages/VulGridPage';

import VulListByAssetPage from './Pages/VulListByAssetPage';
import { AppContextProvider } from './Context/AppContext';
import { AssetContextProvider } from './Context/AssetContext';
import { VulsByAssetContextProvider } from './Context/VulsByAssetContext';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'realgrid/dist/realgrid-style.css'
//import 'realgrid/dist/realgrid-white.css'
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

          <Route path="a/:projectId/:areaAlias/" element={<AssetContextProvider><WorkSpaceLayOut step={1}/></AssetContextProvider>}>
            <Route path="create/" element={<AssetCreatePage/>}/>
            <Route path=":assetId" element={<AssetDetailPage/>}/>
            <Route path=":assetId/edit" element={<AssetEditPage/>}/>
          </Route>
          

          <Route path="w/:projectId/:areaAlias/step1" element={<AssetContextProvider><WorkSpaceLayOut step={1}><WorkSpaceStep1/></WorkSpaceLayOut></AssetContextProvider>} />
          
          <Route path="w/:projectId/:areaAlias/asset-grid" element={<AssetContextProvider><WorkSpaceLayOut step={1}><AssetGridPage/></WorkSpaceLayOut></AssetContextProvider>} />


          <Route path="/v-a/:projectId/:areaAlias/:assetId/vul-grid" element={
            <VulsByAssetContextProvider>
              <WorkSpaceLayOut step={1}>
                <VulGridPage/>
              </WorkSpaceLayOut>
            </VulsByAssetContextProvider>}/>
          
          <Route path="v-a/:projectId/:areaAlias/:assetId" element={
            <VulsByAssetContextProvider>
              <WorkSpaceLayOut step={1}>
                <VulListByAssetPage/>
              </WorkSpaceLayOut>
            </VulsByAssetContextProvider>}/>


          <Route path="v/:projectId/:areaAlias/:assetId/:vulId" element={<WorkSpaceLayOut step={1}><VulEditPage/></WorkSpaceLayOut>} />

          
          <Route path="w/:projectId/:areaAlias/step3" element={<AssetContextProvider><WorkSpaceLayOut step={3}><WorkSpaceStep3/></WorkSpaceLayOut></AssetContextProvider>} />
          <Route path="w/:projectId/:areaAlias/step4" element={<AssetContextProvider><WorkSpaceLayOut step={4}><WorkSpaceStep1/></WorkSpaceLayOut></AssetContextProvider>} />
          <Route path="w/:projectId/:areaAlias/step5" element={<AssetContextProvider><WorkSpaceLayOut step={5}><WorkSpaceStep5/></WorkSpaceLayOut></AssetContextProvider>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
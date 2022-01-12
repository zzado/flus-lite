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


import WorkSpaceStep3 from './Pages/WorkSpaceStep3';
import WorkSpaceStep4 from './Pages/WorkSpaceStep4'
import WorkSpaceStep5 from './Pages/WorkSpaceStep5';
import AssetGridPage from './Pages/AssetGridPage';
import VulsByAssetGridPage from './Pages/VulsByAssetGridPage';

import VulListByAssetPage from './Pages/VulListByAssetPage';
import { AppContextProvider } from './Context/AppContext';
import VulsByAreaGridPage from './Pages/VulsByAreaGridPage';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'realgrid/dist/realgrid-style.css'
//import 'realgrid/dist/realgrid-white.css'
import './Assets/css/flus.css';
import './config';

export default function App (){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/" element={ <AuthPage />} />
        <Route path="/" element={
          <PrivateRoute>
            <AppContextProvider>
              <AppLayOut />
            </AppContextProvider>
          </PrivateRoute>} >

          <Route index element={<DashBoard />} />
          <Route path="dashboard/" element={<DashBoard />} />
          
          <Route path="p/" element={<ProjectListPage />} />
          <Route path="p/create" element={<ProjectCreatePage/>} />
          <Route path="p/:projectId/" element={<ProjectDetailPage/>} />
          <Route path="p/:projectId/edit" element={<ProjectEditPage/>} />

          <Route path="a/:projectId/:areaAlias/" element={<WorkSpaceLayOut step={0}/>}>
            <Route path="create/" element={<AssetCreatePage/>}/>
            <Route path=":assetId/edit" element={<AssetEditPage/>}/>
            <Route path=":assetId" element={<AssetDetailPage/>}/>  
          </Route>
          
          <Route path="w/:projectId/:areaAlias/step1" element={<WorkSpaceLayOut step={0}><WorkSpaceStep1/></WorkSpaceLayOut>} />
          <Route path="w/:projectId/:areaAlias/step2" element={<WorkSpaceLayOut step={1}><WorkSpaceStep2/></WorkSpaceLayOut>} />
          <Route path="w/:projectId/:areaAlias/step3" element={<WorkSpaceLayOut step={2}><WorkSpaceStep3/></WorkSpaceLayOut>} />
          <Route path="w/:projectId/:areaAlias/step4" element={<WorkSpaceLayOut step={3}><WorkSpaceStep4/></WorkSpaceLayOut>} />
          <Route path="w/:projectId/:areaAlias/step5" element={<WorkSpaceLayOut step={4}><WorkSpaceStep5/></WorkSpaceLayOut>} />
          
          <Route path="w/:projectId/:areaAlias/asset-grid" element={<WorkSpaceLayOut step={0}><AssetGridPage/></WorkSpaceLayOut>}/>
          <Route path="w/:projectId/:areaAlias/vul-grid" element={<WorkSpaceLayOut step={1}><VulsByAssetGridPage/></WorkSpaceLayOut>}/>
          <Route path="w/:projectId/:areaAlias/vuls-grid" element={<WorkSpaceLayOut step={2}><VulsByAreaGridPage/></WorkSpaceLayOut>}/>
          
          
          <Route path="v-a/:projectId/:areaAlias/:assetId" element={<WorkSpaceLayOut step={1}><VulListByAssetPage/></WorkSpaceLayOut>}/>
          <Route path="v-a/:projectId/:areaAlias/:assetId/vul-grid" element={<WorkSpaceLayOut step={1}><VulsByAssetGridPage/></WorkSpaceLayOut>}/>
          <Route path="v/:projectId/:areaAlias/:vulId" element={<WorkSpaceLayOut step={1}><VulEditPage/></WorkSpaceLayOut>} />


        </Route>

      </Routes>
    </BrowserRouter>
  );
}
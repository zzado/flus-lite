import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { PrivateRoute } from 'utils';

import AppLayOut from 'Pages/AppLayOut';
import WorkSpaceLayOut from './Pages/Workspace/WorkSpaceLayOut';


import AuthPage from 'Pages/AuthPage';
import DashBoard from 'Pages/DashBoard';

import { ProjectDetail, ProjectList, ProjectEdit, ProjectCreate } from 'Pages/Project';
import { AssetCreate, AssetDetail, AssetEdit, AssetGridVeiw } from 'Pages/Asset';
import { VulEditPage, VulListByAssetPage, VulsByAreaGridView, VulsByAssetGridView } from 'Pages/Vulnerability';
import { WorkSpaceStep1, WorkSpaceStep2, WorkSpaceStep3, WorkSpaceStep4, WorkSpaceStep5 } from 'Pages/Workspace';

import { AppContextProvider } from 'Context/AppContext';

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
          
          <Route path="p/" element={<ProjectList />} />
          <Route path="p/create" element={<ProjectCreate/>} />
          <Route path="p/:projectId/" element={<ProjectDetail/>} />
          <Route path="p/:projectId/edit" element={<ProjectEdit/>} />

          <Route path="a/:projectId/:areaAlias/" element={<WorkSpaceLayOut step={0}/>}>
            <Route path="create/" element={<AssetCreate/>}/>
            <Route path=":assetId/edit" element={<AssetEdit/>}/>
            <Route path=":assetId" element={<AssetDetail/>}/>  
          </Route>
          
          <Route path="w/:projectId/:areaAlias/step1" element={<WorkSpaceLayOut step={0}><WorkSpaceStep1/></WorkSpaceLayOut>} />
          <Route path="w/:projectId/:areaAlias/step2" element={<WorkSpaceLayOut step={1}><WorkSpaceStep2/></WorkSpaceLayOut>} />
          <Route path="w/:projectId/:areaAlias/step3" element={<WorkSpaceLayOut step={2}><WorkSpaceStep3/></WorkSpaceLayOut>} />
          <Route path="w/:projectId/:areaAlias/step4" element={<WorkSpaceLayOut step={3}><WorkSpaceStep4/></WorkSpaceLayOut>} />
          <Route path="w/:projectId/:areaAlias/step5" element={<WorkSpaceLayOut step={4}><WorkSpaceStep5/></WorkSpaceLayOut>} />
          
          <Route path="w/:projectId/:areaAlias/asset-grid" element={<WorkSpaceLayOut step={0}><AssetGridVeiw/></WorkSpaceLayOut>}/>
          <Route path="w/:projectId/:areaAlias/vul-grid" element={<WorkSpaceLayOut step={1}><VulsByAssetGridView/></WorkSpaceLayOut>}/>
          <Route path="w/:projectId/:areaAlias/vuls-grid" element={<WorkSpaceLayOut step={2}><VulsByAreaGridView/></WorkSpaceLayOut>}/>
          
          
          <Route path="v-a/:projectId/:areaAlias/:assetId" element={<WorkSpaceLayOut step={1}><VulListByAssetPage/></WorkSpaceLayOut>}/>
          
          <Route path="v/:projectId/:areaAlias/:vulId" element={<WorkSpaceLayOut step={1}><VulEditPage/></WorkSpaceLayOut>} />


        </Route>

      </Routes>
    </BrowserRouter>
  );
}
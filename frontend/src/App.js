import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './utils';

import AuthPage from './Pages/AuthPage';
import DashBoard from './Pages/DashBoard';
import ProjectListPage from './Pages/ProjectListPage';
import ProjectDetailPage from './Pages/ProjectDetailPage';
import LayOut from './Pages/LayOut';
import ProjectUpdatePage from './Pages/ProjectUpdatePage';

import { AppContextProvider } from './Context/AppContext';
import '@fortawesome/fontawesome-svg-core/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/css/flus.css';

export default function App (){
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/" element={ <AuthPage />} />
        <Route path="/" element={<PrivateRoute><AppContextProvider><LayOut /></AppContextProvider></PrivateRoute>} >
          <Route index element={<DashBoard />} />
          <Route path="dashboard/" element={<DashBoard />} />
          <Route path="p/" element={<ProjectListPage />} />
          <Route path="p/:projectId/" element={<ProjectDetailPage />} />
          <Route path="p/:projectId/update" element={<ProjectUpdatePage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
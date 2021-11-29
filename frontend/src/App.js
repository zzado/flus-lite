import { BrowserRouter,Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/login";
import MainPage from "./components/MainPage/main";
import './App.css';

function Index (){
  return (
    <div>halo</div>
  );
}

function App (){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

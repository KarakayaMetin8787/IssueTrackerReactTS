import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import SelectUserType from './pages/SelectUserType/SelectUserType';
import SuperAdminDashboard from './pages/SuperAdminDashboard/SuperAdminDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard/DeveloperDashboard';
import LoginRegistration from './pages/Login_Registration/LoginRegistration';
import { LoginProvider } from './context/LoginContext';
import React from 'react';
import { ModalProvider } from './context/ModalContext';
import ParticleApp from './components/particleEffect/ParticleContainer';


const App: React.FC = () => {

  return (
    <BrowserRouter>
    <ParticleApp/>
      <LoginProvider>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<LoginRegistration />} />
          <Route path="/usertypeselect" element={<SelectUserType />} />
          <Route path="/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dev" element={<DeveloperDashboard />} />
        </Routes>
      </ModalProvider>
      </LoginProvider>
    </BrowserRouter>
  );
};

export default App;

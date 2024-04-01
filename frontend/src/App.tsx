import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/main.scss';

import LoginHome from './components/pages/LoginHome/LoginHome';
import Login from './components/pages/Login/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginHome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
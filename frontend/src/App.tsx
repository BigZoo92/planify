/* eslint-disable prettier/prettier */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/main.scss';

import Calendrier from './components/pages/calendrier/Calendrier';
import Navbar from './components/custom/navbar/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/calendrier" element={<Calendrier />} />
        </Routes>
      </Router>
      <Navbar />
    </>
  );
};


export default App;
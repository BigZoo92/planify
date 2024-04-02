import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './sass/main.scss';

import Accueil from './components/pages/accueil/Accueil';
import Calendrier from './components/pages/calendrier/Calendrier';
import Navbar from './components/custom/navbar/Navbar';

const App: React.FC = () => {
    const [coursFictifs] = useState([
        {
            id: 1,
            group: 'MMI3-FA-DW',
            subject: 'Prod. disp. inter. DWA',
            staff: 'Ben Amor Soufian',
            classroom: 'I03',
            date: '2024-04-02',
            notes: 'Cours de développement web avancé',
            starttime: '09:00',
            endtime: '13:00',
        },
        {
            id: 2,
            group: 'MMI3-FA-DW',
            subject: 'Portfolio CN',
            staff: 'Ben Amor Soufian',
            classroom: 'I03',
            date: '2024-04-02',
            notes: 'Cours de développement web avancé',
            starttime: '13:00',
            endtime: '18:00',
        },
        {
            id: 3,
            group: 'MMI3-FA-DW',
            subject: 'Portfolio CN',
            staff: 'Ben Amor Soufian',
            classroom: 'I03',
            date: '2024-04-03',
            notes: 'Cours de développement web avancé',
            starttime: '13:00',
            endtime: '18:00',
        },
    ]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<Accueil coursFictifs={coursFictifs} />}
                />
                <Route
                    path="/calendrier"
                    element={<Calendrier coursFictifs={coursFictifs} />}
                />
            </Routes>
        </Router>
    );
};

export default App;

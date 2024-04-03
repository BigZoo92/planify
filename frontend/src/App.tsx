import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./sass/main.scss";

import Accueil from "./components/pages/accueil/Accueil";
import Calendrier from "./components/pages/calendrier/Calendrier";
import Evenement from "./components/pages/evenement/Evenement";
import Navbar from "./components/custom/navbar/Navbar";
import Menu from "./components/custom/menu/Menu";
import Agenda from "./components/pages/agenda/Agenda";

const App: React.FC = () => {
    const [coursFictifs] = useState([
        {
            id: 1,
            group: "MMI3-FA-CN; MMI3-FA-DW",
            subject: "Portfolio CN",
            staff: "Lepage Thérèse",
            classroom: "Amphi C",
            date: "2024-04-02",
            notes: "Préparation TOEIC",
            starttime: "10:00",
            endtime: "12:00",
        },
        {
            id: 2,
            group: "MMI3-FA-DW",
            subject: "Dév web DWA",
            staff: "Ben Amor Soufian",
            classroom: "I03",
            date: "2024-04-02",
            notes: "",
            starttime: "13:00",
            endtime: "16:00",
        },
        {
            id: 3,
            group: "MMI3-FA-tous",
            subject: "TOEIC",
            staff: "Lepage Thérèse",
            classroom: "Amphi C",
            date: "2024-04-03",
            notes: "TOEIC",
            starttime: "09:00",
            endtime: "12:00",
        },
        {
            id: 4,
            group: "MMI3-FA-DW",
            subject: "Dév web DWA",
            staff: "Yahiaoui Saadi",
            classroom: "E58",
            date: "2024-04-03",
            notes: "",
            starttime: "13:30",
            endtime: "16:30",
        },
        {
            id: 5,
            group: "MMI3-FA-DW",
            subject: "Dispositifs inter DWA",
            staff: "Verdier Colin",
            classroom: "E58",
            date: "2024-04-04",
            starttime: "09:00",
            endtime: "11:00",
        },
        {
            id: 6,
            group: "MMI3-FA-DW",
            subject: "Dispositifs inter DWA",
            staff: "Verdier Colin",
            classroom: "E58",
            date: "2024-04-04",
            starttime: "11:00",
            endtime: "12:00",
        },
        {
            id: 7,
            group: "MMI3-FA-DW",
            subject: "Prod. disp. inter. DWA",
            staff: "Ben Amor Soufian; Le Cadet Olivier; Verdier Colin",
            classroom: "I03",
            date: "2024-04-04",
            notes: "Soutenances de conception",
            starttime: "13:00",
            endtime: "16:00",
        },
        {
            id: 8,
            group: "MMI3-FA-tous",
            subject: "Présentation voyage pédagogique",
            staff: "Fournerie Cédric",
            date: "2024-04-04",
            notes: "https://tinyurl.com/4f8we3na",
            starttime: "18:00",
            endtime: "19:00",
        },
        {
            id: 9,
            group: "MMI3-FA-DW",
            subject: "Dév web DWA",
            staff: "Yahiaoui Saadi",
            classroom: "E58",
            date: "2024-04-05",
            notes: "",
            starttime: "09:00",
            endtime: "12:00",
        },
        {
            id: 10,
            group: "MMI3-FA-DW",
            subject: "Dév web DWA",
            staff: "Yahiaoui Saadi",
            classroom: "E58",
            date: "2024-04-05",
            notes: "",
            starttime: "13:00",
            endtime: "16:00",
        },
    ]);

    return (
        <Router>
            <Menu />
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
                <Route path="/new" element={<Evenement />} />
                <Route path="/agenda" element={<Agenda coursFictifs={coursFictifs} />} />
            </Routes>
        </Router>
    );
};

export default App;

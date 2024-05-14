// Global dependencies
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";

// Pages
import { Accueil } from "./pages/Accueil";
import { Calendrier } from "./pages/Calendrier";
import { Agenda } from "./pages/Agenda";
import { Compte } from "./pages/Compte";

// Styles
import "./assets/styles/Main.scss";
import { UserProvider, TimetableProvider } from "./providers";

const App: React.FC = () => {
    const [openModal, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!openModal);

    return (
        <Router>
            <UserProvider>
                <TimetableProvider>
                    <Menu />
                    <Modal isOpen={openModal} onClose={toggleModal} />
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/calendrier" element={<Calendrier />} />
                        <Route path="/agenda" element={<Agenda />} />
                        {/* <Route path="/messagerie" element={<Messagerie />} /> */}
                        <Route path="/compte" element={<Compte />} />
                    </Routes>
                    <Navbar onNewEvent={toggleModal} />
                </TimetableProvider>
            </UserProvider>
        </Router>
    );
};

export default App;

import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

// Components
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";

// Pages
import { Accueil } from "./pages/Accueil";
import { LoginHome } from "./pages/LoginHome";
import { Calendrier } from "./pages/Calendrier";
import { Agenda } from "./pages/Agenda";
import { Compte } from "./pages/Compte";

// Styles
import "./assets/styles/Main.scss";

const App: React.FC = () => {
    const [openModal, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!openModal);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<MainContent toggleModal={toggleModal} />}
                />
                <Route path="/signup" element={<LoginHome />} />
                <Route path="/calendrier" element={<Calendrier />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/compte" element={<Compte />} />
            </Routes>
        </Router>
    );
};

// Define a new component that will properly use the `useLocation` hook
const MainContent: React.FC<{ toggleModal: () => void }> = ({
    toggleModal,
}) => {
    const location = useLocation();
    const isSignupPage = location.pathname === "/signup";

    return (
        <>
            {!isSignupPage && <Menu />}
            {!isSignupPage && <Modal isOpen={false} onClose={toggleModal} />}
            <Navbar onNewEvent={toggleModal} />
        </>
    );
};

export default App;

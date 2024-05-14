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
import { Auth } from "./pages/Auth";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import { Accueil } from "./pages/Accueil";
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
                <Route path="/" element={<Auth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/*"
                    element={<MainContent toggleModal={toggleModal} />}
                />
            </Routes>
        </Router>
    );
};

const MainContent: React.FC<{ toggleModal: () => void }> = ({
    toggleModal,
}) => {
    const location = useLocation();
    const hideNavbarAndMenu = ["/", "/login", "/signup"].includes(
        location.pathname
    );

    return (
        <>
            {!hideNavbarAndMenu && <Menu />}
            {!hideNavbarAndMenu && (
                <Modal isOpen={false} onClose={toggleModal} />
            )}
            {!hideNavbarAndMenu && <Navbar onNewEvent={toggleModal} />}
            <Routes>
                <Route path="accueil" element={<Accueil />} />
                <Route path="calendrier" element={<Calendrier />} />
                <Route path="agenda" element={<Agenda />} />
                <Route path="compte" element={<Compte />} />
            </Routes>
        </>
    );
};

export default App;

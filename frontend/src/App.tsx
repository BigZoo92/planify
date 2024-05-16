// Dependencies
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

// Utils
import { UserProvider, TimetableProvider } from "./providers";

// Components
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { Modal } from "./components/Modal";

// Pages
import { Auth } from "./pages/Auth";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import { Profile } from "./pages/Auth/Profile";
import { Accueil } from "./pages/Accueil";
import { Calendrier } from "./pages/Calendrier";
import { Agenda } from "./pages/Agenda";

// Styles
import "./assets/styles/Main.scss";

const App: React.FC = () => {
    return (
        <Router>
            <UserProvider>
                <TimetableProvider>
                    <MainContentWrapper />
                </TimetableProvider>
            </UserProvider>
        </Router>
    );
};

const MainContentWrapper: React.FC = () => {
    const location = useLocation();
    const mbContent = ["/login", "/signup"].includes(location.pathname);

    return (
        <div id="root" className={!mbContent ? "mb" : ""}>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/*" element={<MainContent />} />
            </Routes>
        </div>
    );
};

const MainContent: React.FC = () => {
    const location = useLocation();
    const [openModal, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!openModal);

    const hideMenu = [
        "/",
        "/login",
        "/signup",
        "/calendrier",
        "/profile",
    ].includes(location.pathname);
    const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);

    return (
        <>
            <UserProvider>
                <TimetableProvider>
                    {!hideMenu && <Menu />}
                    {!hideMenu && (
                        <Modal isOpen={openModal} onClose={toggleModal} />
                    )}
                    {!hideNavbar && <Navbar onNewEvent={toggleModal} />}
                    <Routes>
                        <Route path="accueil" element={<Accueil />} />
                        <Route path="calendrier" element={<Calendrier />} />
                        <Route path="agenda" element={<Agenda />} />
                        <Route path="profile" element={<Profile />} />
                    </Routes>
                </TimetableProvider>
            </UserProvider>
        </>
    );
};

export default App;

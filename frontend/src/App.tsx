// Dependencies
import { useState, useEffect, useRef } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { gsap } from "gsap";

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
import { Notifications } from "./pages/Notifications";
import { Messagerie } from "./pages/Messagerie";
import { Agenda } from "./pages/Agenda";
import { AgendaUnique } from "./pages/AgendaUnique";

// Styles
import "./assets/styles/Main.scss";

// Providers
import { UserProvider, TimetableProvider } from "./providers";

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
        <div className={!mbContent ? "mb" : "main-content"}>
            <Routes location={location} key={location.pathname}>
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
    const toggleModal = () => {
        setModalOpen(!openModal);
    };

    const hideMenu =
        ["/", "/login", "/signup", "/calendrier", "/profile"].includes(
            location.pathname
        ) || /\/agenda\/\d+/.test(location.pathname);

    const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);

    return (
        <>
            {!hideMenu && <Menu />}
            <Routes location={location} key={location.pathname}>
                <Route
                    path="accueil"
                    element={
                        <PageWrapper>
                            <Accueil />
                        </PageWrapper>
                    }
                />
                <Route
                    path="calendrier"
                    element={
                        <PageWrapper>
                            <Calendrier />
                        </PageWrapper>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <PageWrapper>
                            <Profile />
                        </PageWrapper>
                    }
                />
                <Route
                    path="messagerie"
                    element={
                        <PageWrapper>
                            <Messagerie />
                        </PageWrapper>
                    }
                />
                <Route
                    path="notifications"
                    element={
                        <PageWrapper>
                            <Notifications />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/agenda"
                    element={
                        <PageWrapper>
                            <Agenda />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/agenda/:agendaId"
                    element={
                        <PageWrapper>
                            <AgendaUnique />
                        </PageWrapper>
                    }
                />
            </Routes>
            {!hideMenu && <Modal isOpen={openModal} onClose={toggleModal} />}
            {!hideNavbar && <Navbar onNewEvent={toggleModal} />}
        </>
    );
};

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    const pageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                pageRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
        }, pageRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div className="main-content" ref={pageRef}>
            {children}
        </div>
    );
};

export default App;

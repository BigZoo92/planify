import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Searchbar } from "../SearchBar";
import UserImage from "../../assets/images/users-image/placeholder.png";
import {
    House,
    Calendar,
    ChatCircle,
    Lifebuoy,
    Gear,
    CalendarDots,
    SignOut,
    IconWeight,
    BellRinging,
} from "@phosphor-icons/react";
import "./Menu.scss";
import { useUser } from "../../providers/UserProvider";

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);

    if (!user) {
        return null;
    }

    const fullName = `${user.firstName} ${user.lastName}`;

    const ouvertureMenu = () => {
        setIsOpen(!isOpen);
    };

    const fermetureMenu = () => {
        setIsOpen(false);
    };

    const styleNavLink = ({ isActive }: { isActive: boolean }) => ({
        className: isActive ? "nav-link active" : "nav-link",
        iconWeight: isActive ? "bold" : ("regular" as IconWeight),
    });

    return (
        <header className="header-container">
            <div className="menu">
                <div
                    className={`hamburger ${isOpen ? "open" : ""}`}
                    onClick={ouvertureMenu}
                >
                    <span></span>
                    <span></span>
                </div>
                {/* <Link to="/notifications">
                    <div className="notifications">
                        <BellRinging size={30} />
                    </div>
                </Link> */}
                {isOpen && (
                    <div className="overlay" onClick={fermetureMenu}></div>
                )}
                <ul className={`menu-items ${isOpen ? "menu-open" : ""}`}>
                    <div className="menu-content">
                        <Searchbar onSearch={() => {}} />
                        <div className="li-wrapper">
                            <li>
                                <NavLink
                                    to="/accueil"
                                    onClick={fermetureMenu}
                                    className={
                                        styleNavLink({
                                            isActive:
                                                location.pathname ===
                                                "/accueil",
                                        }).className
                                    }
                                >
                                    <House
                                        size={20}
                                        weight={
                                            styleNavLink({
                                                isActive:
                                                    location.pathname ===
                                                    "/accueil",
                                            }).iconWeight
                                        }
                                    />
                                    Accueil
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/agenda"
                                    onClick={fermetureMenu}
                                    className={
                                        styleNavLink({
                                            isActive:
                                                location.pathname === "/agenda",
                                        }).className
                                    }
                                >
                                    <CalendarDots
                                        size={20}
                                        weight={
                                            styleNavLink({
                                                isActive:
                                                    location.pathname ===
                                                    "/agenda",
                                            }).iconWeight
                                        }
                                    />
                                    Agenda
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/calendrier"
                                    onClick={fermetureMenu}
                                    className={
                                        styleNavLink({
                                            isActive:
                                                location.pathname ===
                                                "/calendrier",
                                        }).className
                                    }
                                >
                                    <Calendar
                                        size={20}
                                        weight={
                                            styleNavLink({
                                                isActive:
                                                    location.pathname ===
                                                    "/calendrier",
                                            }).iconWeight
                                        }
                                    />
                                    Calendrier
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/messagerie"
                                    onClick={fermetureMenu}
                                    className={
                                        styleNavLink({
                                            isActive:
                                                location.pathname ===
                                                "/messagerie",
                                        }).className
                                    }
                                >
                                    <ChatCircle
                                        size={20}
                                        weight={
                                            styleNavLink({
                                                isActive:
                                                    location.pathname ===
                                                    "/messagerie",
                                            }).iconWeight
                                        }
                                    />
                                    Messagerie
                                </NavLink>
                            </li>
                        </div>
                    </div>
                    <div className="menu-footer">
                        <div className="li-wrapper">
                            <li>
                                <NavLink
                                    to="/support"
                                    onClick={fermetureMenu}
                                    className={
                                        styleNavLink({
                                            isActive:
                                                location.pathname ===
                                                "/support",
                                        }).className
                                    }
                                >
                                    <Lifebuoy
                                        size={20}
                                        weight={
                                            styleNavLink({
                                                isActive:
                                                    location.pathname ===
                                                    "/support",
                                            }).iconWeight
                                        }
                                    />
                                    Support
                                </NavLink>
                            </li>
                        </div>
                        <div className="user-wrapper">
                            <Link to="/profile" onClick={fermetureMenu}>
                                <div className="user-info-wrapper">
                                    <img src={UserImage} alt="User" />
                                    <div className="user-info">
                                        <p className="user-info-name">
                                            {fullName}
                                        </p>
                                        <p className="user-info-email">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </ul>
            </div>
        </header>
    );
};

export default Menu;

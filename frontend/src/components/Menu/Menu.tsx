import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Searchbar from "../SearchBar/Searchbar";
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
                <Link to="/notifications">
                    <div className="notifications">
                        <BellRinging size={30} weight="bold" />
                    </div>
                </Link>
                {isOpen && (
                    <div className="overlay" onClick={fermetureMenu}></div>
                )}
                <ul className={`menu-items ${isOpen ? "menu-open" : ""}`}>
                    <div className="menu-content">
                        <Searchbar onSearch={() => console.log("search")} />
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
                                    to="/agendas"
                                    onClick={fermetureMenu}
                                    className={
                                        styleNavLink({
                                            isActive:
                                                location.pathname ===
                                                "/agendas",
                                        }).className
                                    }
                                >
                                    <CalendarDots
                                        size={20}
                                        weight={
                                            styleNavLink({
                                                isActive:
                                                    location.pathname ===
                                                    "/agendas",
                                            }).iconWeight
                                        }
                                    />
                                    Agendas
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
                            <li>
                                <NavLink
                                    to="/parametres"
                                    onClick={fermetureMenu}
                                    className={
                                        styleNavLink({
                                            isActive:
                                                location.pathname ===
                                                "/parametres",
                                        }).className
                                    }
                                >
                                    <Gear
                                        size={20}
                                        weight={
                                            styleNavLink({
                                                isActive:
                                                    location.pathname ===
                                                    "/parametres",
                                            }).iconWeight
                                        }
                                    />
                                    Paramètres
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
                            <div className="user-logout">
                                <SignOut size={20} />
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </header>
    );
};

export default Menu;

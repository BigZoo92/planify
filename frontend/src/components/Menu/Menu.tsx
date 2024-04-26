import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import LogoPlanify from "../../assets/icons/logo/svg/logo-planify-black.svg";
import UserImage from "../../assets/images/users-image/placeholder.png";
import {
    House,
    Calendar,
    ChatCircle,
    Lifebuoy,
    Gear,
    CalendarDots,
    SignOut,
} from "@phosphor-icons/react";
import "./Menu.scss";

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const ouvertureMenu = () => {
        setIsOpen(!isOpen);
    };

    const fermetureMenu = () => {
        setIsOpen(false);
    };

    const styleNavLink = ({ isActive }) => ({
        className: isActive ? "nav-link active" : "nav-link",
        iconWeight: isActive ? "bold" : "regular",
    });

    return (
        <header className="header-wrapper">
            <div className="menu">
                <Link to="/">
                    <div className="logo-wrapper">
                        <img
                            id="calendrier-logo"
                            src={LogoPlanify}
                            alt="Logo Planify"
                        />
                    </div>
                </Link>
                <div
                    className={`hamburger ${isOpen ? "open" : ""}`}
                    onClick={ouvertureMenu}
                >
                    <span></span>
                    <span></span>
                </div>
                {isOpen && (
                    <ul className="menu-items">
                        <div className="menu-content">
                            <div className="logo-wrapper">
                                <img
                                    id="calendrier-logo"
                                    src={LogoPlanify}
                                    alt="Logo Planify"
                                />
                            </div>
                            <SearchBar onSearch={() => console.log("search")} />
                            <div className="li-wrapper">
                                <li>
                                    <NavLink
                                        to="/"
                                        onClick={fermetureMenu}
                                        {...styleNavLink}
                                    >
                                        <House
                                            size={20}
                                            weight={
                                                styleNavLink({
                                                    isActive:
                                                        location.pathname ===
                                                        "/",
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
                                        {...styleNavLink}
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
                                        {...styleNavLink}
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
                                        {...styleNavLink}
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
                                        {...styleNavLink}
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
                                        {...styleNavLink}
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
                                <div className="user-info-wrapper">
                                    <img src={UserImage} alt="User" />
                                    <div className="user-info">
                                        <p className="user-info-name">
                                            Lorem Nom
                                        </p>
                                        <p className="user-info-email">
                                            lorem.nom@lorem.com
                                        </p>
                                    </div>
                                </div>
                                <div className="user-logout">
                                    <SignOut size={20} />
                                </div>
                            </div>
                        </div>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Menu;

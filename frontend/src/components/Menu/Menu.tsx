import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoPlanify from "../../assets/icons/logo/svg/logo-planify-black.svg";
import "./Menu.scss";

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const ouvertureMenu = () => {
        setIsOpen(!isOpen);
    };

    const fermetureMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="menu">
            <div
                className={`hamburger ${isOpen ? "open" : ""}`}
                onClick={ouvertureMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            {isOpen && (
                <ul className="menu-items">
                    <div className="logo-wrapper">
                        <img
                            id="calendrier-logo"
                            src={LogoPlanify}
                            alt="Logo Planify"
                        />
                    </div>
                    <div className="li-wrapper">
                        <li>
                            <NavLink to="/" onClick={fermetureMenu}>
                                Accueil
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/calendrier" onClick={fermetureMenu}>
                                Calendrier
                            </NavLink>
                        </li>
                    </div>
                    <span>Alpha V0.0.4</span>
                </ul>
            )}
        </div>
    );
};

export default Menu;

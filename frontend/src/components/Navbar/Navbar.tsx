import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, House, User, Plus, ChatCircle } from "@phosphor-icons/react";
import styles from "./Navbar.module.scss";

interface NavbarProps {
    onNewEvent: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNewEvent }) => {
    const leftNavLink = [
        { path: "/accueil", icon: <House size={20} weight="bold" /> },
        { path: "/calendrier", icon: <Calendar size={20} weight="bold" /> },
    ];

    const rightNavLink = [
        { path: "/messagerie", icon: <ChatCircle size={20} weight="bold" /> },
        { path: "/profile", icon: <User size={20} weight="bold" /> },
    ];

    return (
        <nav className={styles.navbar}>
            <svg
                className={styles.navbarBackground}
                width="390"
                height="117"
                viewBox="0 0 390 117"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3.35095 15.5676H0V116.551H390V15.5618L277.576 0.256363C277.576 0.256363 249.739 -3.17211 241.592 15.0466C237.689 23.7737 235.539 29.273 234.237 32.98C233.073 36.2898 230.229 52.5872 211.011 54.5823C191.793 56.5774 181.145 54.5823 181.145 54.5823C181.145 54.5823 164.142 53.0606 158.432 35.5425C152.723 18.0244 146.431 -0.498527 125.367 0.094253C104.303 0.686783 3.35095 15.5676 3.35095 15.5676Z"
                    fill="white"
                />
            </svg>
            <ul className={styles.navLinkWrapper}>
                {leftNavLink.map((link, index) => (
                    <li key={index} className={styles.navLink}>
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.active : ""}`
                            }
                        >
                            {link.icon}
                        </NavLink>
                    </li>
                ))}
                <li className={styles.navEvent}>
                    <button className={styles.btnEvent} onClick={onNewEvent}>
                        <Plus size={20} weight="bold" />
                    </button>
                </li>
                {rightNavLink.map((link, index) => (
                    <li
                        key={index + leftNavLink.length}
                        className={styles.navLink}
                    >
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.active : ""}`
                            }
                        >
                            {link.icon}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;

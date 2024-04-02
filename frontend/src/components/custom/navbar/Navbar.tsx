/* eslint-disable prettier/prettier */
import React from 'react';
import './Navbar.scss';
import { Plus, House, User } from '@phosphor-icons/react';

interface NavbarProps {
    // Props si nécessaire
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <a href="/calendrier">
                        <House size={24} />
                    </a>
                </li>
                <li>
                    <a href="/calendrier">
                        <User size={24} />
                    </a>
                </li>
                <li className="active">
                    <a href="/compte">
                        <Plus size={24} />
                    </a>
                    <span className="dot"></span>
                </li>
                <li>
                    <a href="/calendrier">
                        <User size={24} />
                    </a>
                </li>
                <li>
                    <a href="/calendrier">
                        <User size={24} />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
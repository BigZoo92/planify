/* eslint-disable prettier/prettier */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { Calendar, House, User, Plus } from '@phosphor-icons/react';

interface NavbarProps {
    // Props si nécessaire
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        // <nav className="navbar">
        //     <ul className="nav-links">
        //         <li>
        //             <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
        //                 <House size={24} />
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/calendrier" className={({ isActive }) => isActive ? 'active' : ''}>
        //                 <Calendar size={24} />
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/new" className="plus-item">
        //                 <Plus size={24} />
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/test2" className={({ isActive }) => isActive ? 'active' : ''}>
        //                 <User size={24} />
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to="/test3" className={({ isActive }) => isActive ? 'active' : ''}>
        //                 <User size={24} />
        //             </NavLink>
        //         </li>
        //     </ul>
        // </nav>
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <NavLink to="/new" className="btn-event">
                        <span>Créez un évènement</span>
                        <div className="svg-link">
                            <Plus size={17.5} weight="bold" />
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/agenda" className="link-event">
                        <Calendar size={20} weight="bold" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
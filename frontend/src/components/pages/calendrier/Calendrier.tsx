import React from 'react';
import LogoPlanify from '../../../assets/icons/logo/svg/logo-planify-black.svg';
import SearchBar from '../../custom/searchbar/Searchbar';
import { Sliders } from "@phosphor-icons/react";
import CalendarCard from '../../custom/cardCalendrier/CardCalendrier';
import './Calendrier.scss';
import '../../custom/searchbar/Searchbar.scss';

interface CalendrierProps {
    uneProp?: string;
}

const Calendrier: React.FC = () => {
    const handleSearch = (value: string) => {
        console.log(`Recherche pour: ${value}`);
    };
    return (
        <div className="page-wrapper calendrier">
            <div className="logo-wrapper">
                <img id="calendrier-logo" src={LogoPlanify} alt="Logo Planify" />
            </div>
            <div className="search-wrapper">
                {/* <SearchBar onSearch={handleSearch} /> */}
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="input-wrapper"
                />
                <div className="filter-wrapper">
                    <Sliders size={32} color="currentColor" />
                </div>
            </div>
            <CalendarCard
                group="MMI3-FA-DW"
                subject="Prod. disp. inter. DWA"
                staff="Ben Amor Soufian"
                classroom="I03"
                date="22/04/2024"
                notes="Cours de développement web avancé"
                starttime="13:00"
                endtime="18:00"
            />
            <CalendarCard
                group="MMI3-FA-DW"
                subject="Dév web DWA"
                staff="Ben Amor Soufian"
                classroom="I03"
                date="22/04/2024"
                notes="Cours de développement web avancé"
                starttime="13:00"
                endtime="18:00"
            />
            <CalendarCard
                group="MMI3-FA-DW"
                subject="Portfolio CN"
                staff="Ben Amor Soufian"
                classroom="I03"
                date="22/04/2024"
                notes="Cours de développement web avancé"
                starttime="13:00"
                endtime="18:00"
            />
            <CalendarCard
                group="MMI3-FA-DW"
                subject="Dév web DWA"
                staff="Ben Amor Soufian"
                classroom="I22"
                date="22/04/2024"
                notes="Cours de développement web avancé"
                starttime="13:00"
                endtime="18:00"
            />
        </div>
    );
};

export default Calendrier;

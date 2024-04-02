import React, { useState, useEffect } from 'react';
import LogoPlanify from '../../../assets/icons/logo/svg/logo-planify-white.svg';
import Image from '../../../assets/images/element/image.svg';
import CalendarCard from '../../custom/cardCalendrier/CardCalendrier';
import './Accueil.scss';

interface AccueilProps {
    coursFictifs: Array<{
        id: number;
        group: string;
        subject: string;
        staff: string;
        classroom: string;
        date: string;
        notes: string;
        starttime: string;
        endtime: string;
    }>;
}

const Accueil: React.FC<AccueilProps> = ({ coursFictifs }) => {
    const [prochainCours, setProchainCours] = useState(null);

    useEffect(() => {
        const maintenant = new Date();
        const coursProches = coursFictifs
            .map((cours) => ({
                ...cours,
                dateCours: new Date(`${cours.date}T${cours.starttime}`),
            }))
            .filter((cours) => cours.dateCours > maintenant)
            .sort((a, b) => a.dateCours.getTime() - b.dateCours.getTime());

        if (coursProches.length > 0) {
            setProchainCours(coursProches[0]);
        }
    }, [coursFictifs]);
    return (
        <div className="page-wrapper accueil">
            <div className="logo-wrapper">
                <img
                    id="calendrier-logo"
                    src={LogoPlanify}
                    alt="Logo Planify"
                />
            </div>
            <div className="accueil-header-wrapper">
                <img src={Image} alt="" />
            </div>
            <div className="accueil-content-wrapper">
                <h2>Prochains cours</h2>
                {prochainCours ? (
                    <CalendarCard
                        key={prochainCours.id}
                        group={prochainCours.group}
                        subject={prochainCours.subject}
                        staff={prochainCours.staff}
                        classroom={prochainCours.classroom}
                        date={prochainCours.date}
                        notes={prochainCours.notes}
                        starttime={prochainCours.starttime}
                        endtime={prochainCours.endtime}
                    />
                ) : (
                    <p>Aucun cours à venir.</p>
                )}
            </div>
        </div>
    );
};

export default Accueil;

import React from 'react';
import './CardCalendrier.scss';

interface CalendarCardProps {
    group: string;
    subject: string;
    staff: string;
    classroom: string;
    date: string;
    notes: string | null;
    starttime: string;
    endtime: string;
}

const getColor = (subject: string): string => {
    switch (subject) {
        case 'Portfolio CN':
            return 'var(--color-blue)'; // Bleu
        case 'Dév web DWA':
            return 'var(--color-orange)'; // Orange
        case 'Prod. disp. inter. DWA':
            return 'var(--color-pink)'; // Vert
        default:
            return 'var(--color-white)'; // Gris par défaut
    }
};

const CardCalendrier: React.FC<CalendarCardProps> = ({
    group,
    subject,
    staff,
    classroom,
    date,
    notes,
    starttime,
    endtime,
}) => {
    const setColor = getColor(subject);

    return (
        <div className="calendar-wrapper">
            <div className="card-date">
                <span>Lundi {date}</span>
            </div>
            <div className="card-cours" style={{ backgroundColor: setColor }}>
                <div className="card-temps">
                    <span>{starttime}</span>
                    <hr />
                    <span>{endtime}</span>
                </div>
                <div className="card-description">
                    <h2 className="card-titre">
                        {subject} - {staff}
                    </h2>
                    {notes && <p className="notes">Remarques : {notes}</p>}
                    <div className="card-bottom">
                        <hr />
                        <div className="card-bottom-texte">
                            <p className="group">{group}</p>
                            <p className="salle">{classroom}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCalendrier;

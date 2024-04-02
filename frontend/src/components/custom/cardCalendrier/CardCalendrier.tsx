import React from 'react';
import './CardCalendrier.scss';
import Element from '../../../assets/images/element/element.svg';
import { UsersThree, MapPin, Briefcase } from '@phosphor-icons/react';

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
            return 'var(--color-blue)';
        case 'Dév web DWA':
            return 'var(--color-orange)';
        case 'Prod. disp. inter. DWA':
            return 'var(--color-pink)';
        default:
            return 'var(--color-white)';
    }
};

const getAdjustedColor = (subject: string): string => {
    switch (subject) {
        case 'Portfolio CN':
            return 'var(--color-blue-light)';
        case 'Dév web DWA':
            return 'var(--color-orange-light)';
        case 'Prod. disp. inter. DWA':
            return 'var(--color-pink-light)';
        default:
            return 'var(--color-white)';
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
    const adjustedColor = getAdjustedColor(subject);

    const getReadableDate = (courseDate: string) => {
        const now = new Date();
        const today = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const courseDateTime = new Date(courseDate);
        const courseDay = new Date(
            courseDateTime.getFullYear(),
            courseDateTime.getMonth(),
            courseDateTime.getDate()
        );

        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'numeric',
        };
        const formattedDate = courseDay.toLocaleDateString('fr-FR', options);

        if (courseDay.valueOf() === today.valueOf()) {
            return "Aujourd'hui";
        } else if (courseDay.valueOf() === tomorrow.valueOf()) {
            return 'Demain';
        } else if (courseDay.valueOf() === nextWeek.valueOf()) {
            return 'Lundi prochain';
        } else {
            return formattedDate;
        }
    };

    return (
        <div className="calendar-wrapper">
            <div className="card-date">
                <span>{getReadableDate(date)}</span>
            </div>
            <div className="card-cours" style={{ backgroundColor: setColor }}>
                <svg
                    width="103"
                    height="73"
                    viewBox="0 0 103 73"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="element"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M79.3463 -91.64C96.6954 -96.7396 115.389 -86.6312 129.814 -75.7074C144.064 -64.9162 152.131 -48.5951 158.349 -31.8141C164.821 -14.3483 173.663 5.14892 166.079 22.1592C158.597 38.94 136.99 42.3173 121.16 51.5963C107.311 59.7138 95.3888 72.8968 79.3463 72.9991C63.2671 73.1017 47.8398 64.1661 37.1444 52.1321C27.5511 41.3382 30.5783 24.9259 24.8351 11.666C18.1108 -3.85939 -4.67571 -15.656 0.857984 -31.6466C6.42916 -47.7455 33.0892 -40.9165 46.6077 -51.2496C60.7147 -62.0324 62.3221 -86.6359 79.3463 -91.64Z"
                        style={{ fill: adjustedColor }}
                    />
                </svg>
                <div
                    className="card-temps"
                    style={{ borderColor: adjustedColor }}
                >
                    <span>{starttime}</span>
                    <hr />
                    <span>{endtime}</span>
                </div>
                <div className="card-description">
                    <h2 className="card-titre">{subject}</h2>
                    {notes && <p className="notes">{notes}</p>}
                    <div className="card-bottom">
                        <hr />
                        <div className="card-bottom-texte">
                            <div className="card-texte-wrapper">
                                <UsersThree size={15} color="currentColor" />
                                <p>{group}</p>
                            </div>
                            <div className="card-texte-wrapper">
                                <MapPin size={15} color="currentColor" />
                                <p>{classroom}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardCalendrier;

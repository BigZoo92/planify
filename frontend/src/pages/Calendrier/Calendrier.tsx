import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { v4 as uuidv4 } from "uuid";

// Components
import { CardCalendrier } from "../../components/CardCalendrier";
import { getTimetableFromCelcat } from "../../utils/queries";

// Styles
import "react-calendar/dist/Calendar.css";
import "./Calendrier.scss";
import { WarningCircle } from "@phosphor-icons/react";

const Calendrier: React.FC = () => {
    const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
    const [cours, setCours] = useState([]);

    useEffect(() => {
        (async () => {
            const url = import.meta.env.VITE_URL_SCRAPING;
            const coursFictifs = await getTimetableFromCelcat(url);
            const coursAvecId = coursFictifs.map((course) => ({
                ...course,
                id: course.id || uuidv4(),
            }));
            setCours(coursAvecId);
        })();
    }, []);

    const onChangeDate = (date) => {
        setDateSelectionnee(date);
    };

    const filtreCours = cours.filter((course) => {
        const dateParts = course.data.date.split("/");
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        const dateCours = new Date(formattedDate);

        return (
            dateCours.getFullYear() === dateSelectionnee.getFullYear() &&
            dateCours.getMonth() === dateSelectionnee.getMonth() &&
            dateCours.getDate() === dateSelectionnee.getDate()
        );
    });

    const formateDate = (date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString("fr-FR", options);
        const [day, month, year] = formattedDate.split(" ");
        return { day, month, year };
    };

    const getRelativeDayText = (selectedDate) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (
            selectedDate.getDate() === today.getDate() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getFullYear() === today.getFullYear()
        ) {
            return "Aujourd'hui";
        } else if (
            selectedDate.getDate() === tomorrow.getDate() &&
            selectedDate.getMonth() === tomorrow.getMonth() &&
            selectedDate.getFullYear() === tomorrow.getFullYear()
        ) {
            return "Demain";
        } else {
            return selectedDate.toLocaleDateString("fr-FR", {
                weekday: "long",
            });
        }
    };

    const currentDate = formateDate(dateSelectionnee);
    const relativeDayText = getRelativeDayText(dateSelectionnee);

    return (
        <main className="calendrier-wrapper">
            <Calendar onChange={onChangeDate} value={dateSelectionnee} />
            {filtreCours.length > 0 && (
                <div className="date-display">
                    <div className="date-content">
                        <p className="day">{currentDate.day}</p>
                        <div className="date-separator">
                            <p id="month">{currentDate.month}</p>
                            <p id="year">{currentDate.year}</p>
                        </div>
                    </div>
                    <span className="tag">{relativeDayText}</span>
                </div>
            )}
            <div className="calendar-wrapper">
                {filtreCours.length === 0 ? (
                    <p className="deactivated">
                        <WarningCircle size={20} weight="bold" />
                        Aucun évènement trouvé
                    </p>
                ) : (
                    filtreCours.map((course) => (
                        <CardCalendrier
                            key={course.id}
                            group={course.data.group}
                            subject={course.summary}
                            staff={course.data.staff}
                            classroom={course.location}
                            date={course.data.date}
                            notes={course.data.notes}
                            starttime={course.start}
                            endtime={course.end}
                        />
                    ))
                )}
            </div>
        </main>
    );
};

export default Calendrier;

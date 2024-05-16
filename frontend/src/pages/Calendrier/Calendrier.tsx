import React from "react";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";

// Components
import { CardCalendrier } from "../../components/CardCalendrier";
import { getTimetableFromCelcat } from "../../utils/queries";

// Styles
import "react-calendar/dist/Calendar.css";
import "./Calendrier.scss";

const Calendrier: React.FC = () => {
    const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
    const [cours, setCours] = useState([]);

    useEffect(() => {
        (async () => {
            const url = import.meta.env.VITE_URL_SCRAPING;
            const coursFictifs = await getTimetableFromCelcat(url);
            setCours(coursFictifs);
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

    return (
        <main className="calendrier-wrapper">
            <Calendar onChange={onChangeDate} value={dateSelectionnee} />
            <div className="calendar-wrapper">
                {filtreCours.map((course) => (
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
                ))}
            </div>
        </main>
    );
};

export default Calendrier;

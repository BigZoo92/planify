import React, { useState } from "react";
import LogoPlanify from "../../assets/icons/logo/svg/logo-planify-black.svg";
import CalendarCard from "../../components/CardCalendrier/CardCalendrier";
import "./Calendrier.scss";
import "../../components/SearchBar/Searchbar.scss";
import SearchBar from "../../components/SearchBar/Searchbar";

interface CalendrierProps {
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

const Calendrier: React.FC<CalendrierProps> = ({ coursFictifs }) => {
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const onClickDateCours = (date) => {
        setSelectedDate(date);
    };

    const filtreCours = coursFictifs.filter(
        (course) => selectedDate === null || course.date === selectedDate
    );

    const renderDateElements = () => {
        const dates = [
            "2024-04-01",
            "2024-04-02",
            "2024-04-03",
            "2024-04-04",
            "2024-04-05",
            "2024-04-06",
            "2024-04-07",
        ];

        const today = new Date().toISOString().split("T")[0];

        return dates.map((date) => {
            const numeroJour = new Date(date).toLocaleDateString("fr-FR", {
                weekday: "short",
            });
            const lettreJour = numeroJour.charAt(0).toUpperCase();

            const dateClass = `date-element ${date === selectedDate ? "selected" : ""} ${date === today ? "today" : ""}`;

            return (
                <div
                    key={date}
                    className={dateClass}
                    onClick={() => onClickDateCours(date)}
                >
                    <div className="day-letter">{lettreJour}</div>
                    {date.substring(8)}
                </div>
            );
        });
    };

    return (
        <div className="page-wrapper calendrier">
            <div className="logo-wrapper absolute">
                <img
                    id="calendrier-logo"
                    src={LogoPlanify}
                    alt="Logo Planify"
                />
            </div>
            <SearchBar />
            <div className="date-wrapper">{renderDateElements()}</div>
            <div className="calendar-wrapper">
                {filtreCours.map((course) => (
                    <CalendarCard
                        key={course.id}
                        group={course.group}
                        subject={course.subject}
                        staff={course.staff}
                        classroom={course.classroom}
                        date={course.date}
                        notes={course.notes}
                        starttime={course.starttime}
                        endtime={course.endtime}
                    />
                ))}
            </div>
        </div>
    );
};

export default Calendrier;

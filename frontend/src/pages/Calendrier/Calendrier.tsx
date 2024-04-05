import React, { useState } from "react";
import LogoPlanify from "../../assets/icons/logo/svg/logo-planify-black.svg";
import CalendarCard from "../../components/CardCalendrier/CardCalendrier";
import "./Calendrier.scss";
import "../../components/SearchBar/Searchbar.scss";
import SearchBar from "../../components/SearchBar/Searchbar";
import { WeekContainer } from "../../components/WeekContainer/WeekContainer";

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

    return (
        <div className="page-wrapper calendrier">
            <div className="logo-wrapper absolute">
                <img
                    id="calendrier-logo"
                    src={LogoPlanify}
                    alt="Logo Planify"
                />
            </div>
            <SearchBar onSearch={() => console.log("search")} />
            <WeekContainer
                selectedDate={selectedDate}
                onClick={onClickDateCours}
            />
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

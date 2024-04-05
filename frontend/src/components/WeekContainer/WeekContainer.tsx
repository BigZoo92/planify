import React from "react";
import "./WeekContainer.scss";

interface WeekContainerProps {
    selectedDate: string;
    onClick: (date: string) => void;
}

export const WeekContainer: React.FC<WeekContainerProps> = ({
    selectedDate,
    onClick,
}) => {
    const weekDates = getCurrentWeekDates();
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="date-wrapper">
            {weekDates.map((day, index) => {
                const date = day.toISOString().split("T")[0];
                const numeroJour = day.toLocaleDateString("fr-FR", {
                    weekday: "short",
                });
                const lettreJour = numeroJour.charAt(0).toUpperCase();

                const dateClass = `date-element ${date === selectedDate ? "selected" : ""} ${
                    date === today ? "today" : ""
                }`;

                return (
                    <div
                        key={index}
                        className={dateClass}
                        onClick={() => onClick(date)}
                    >
                        <div className="day-letter">{lettreJour}</div>
                        {date.substring(8)}
                    </div>
                );
            })}
        </div>
    );
};

const getCurrentWeekDates = (): Date[] => {
    const dates: Date[] = [];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const firstDayOfWeek =
        today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(firstDayOfWeek + i);
        dates.push(date);
    }

    return dates;
};

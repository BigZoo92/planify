import React, { useState, useEffect } from "react";
import ReactSwipe from "react-swipe";
import {
    format,
    addMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    parseISO,
} from "date-fns";
import { fr } from "date-fns/locale";
import CardCalendrier from "../../custom/cardCalendrier/CardCalendrier";
import "./Agenda.scss";

interface Cours {
    id: number;
    group: string;
    subject: string;
    staff: string;
    classroom?: string;
    date: string;
    notes?: string;
    starttime: string;
    endtime: string;
}

interface AgendaProps {
    coursFictifs: Cours[];
}

const Agenda: React.FC<AgendaProps> = ({ coursFictifs }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [activeIndex, setActiveIndex] = useState(1);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    useEffect(() => {
        if (reactSwipeEl) {
            reactSwipeEl.slide(1, 100);
        }
    }, [currentMonth]);

    let reactSwipeEl: ReactSwipe | null;

    const onSwipe = (index: number) => {
        if (index !== activeIndex) {
            const difference = index - activeIndex;
            const newMonth = addMonths(currentMonth, difference);
            setCurrentMonth(newMonth);
            setActiveIndex(index);
        }
    };

    const renderCalendarForMonth = (date: Date) => {
        const startDay = startOfMonth(date);
        const endDay = endOfMonth(date);
        const days = eachDayOfInterval({ start: startDay, end: endDay });
        const today = new Date();

        return (
            <div className="agenda-wrapper">
                <h2>{format(date, "MMMM yyyy", { locale: fr })}</h2>
                <div className="days-grid">
                    {days.map((day) => {
                        const dayHasCourse = coursFictifs.some((cours) =>
                            isSameDay(day, parseISO(cours.date))
                        );
                        const isToday = isSameDay(day, today);
                        return (
                            <div
                                key={day.toString()}
                                className={`day ${isToday ? "today" : ""} ${dayHasCourse ? "has-course" : ""}`}
                                onClick={() => setSelectedDay(day)}
                            >
                                {format(day, "d", { locale: fr })}
                                {dayHasCourse && <span className="dot"></span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const coursesForSelectedDay = selectedDay
        ? coursFictifs.filter((cours) =>
              isSameDay(selectedDay, parseISO(cours.date))
          )
        : [];

    return (
        <div className="page-wrapper agenda">
            <ReactSwipe
                swipeOptions={{
                    continuous: false,
                    startSlide: 1,
                    callback: onSwipe,
                }}
                ref={(el) => (reactSwipeEl = el)}
            >
                <div>{renderCalendarForMonth(addMonths(currentMonth, -1))}</div>
                <div>{renderCalendarForMonth(currentMonth)}</div>
                <div>{renderCalendarForMonth(addMonths(currentMonth, 1))}</div>
            </ReactSwipe>
            {coursesForSelectedDay.length > 0 && (
                <div className="card-wrapper">
                    {coursesForSelectedDay.map((cours) => (
                        <CardCalendrier
                            key={cours.id}
                            group={cours.group}
                            subject={cours.subject}
                            staff={cours.staff}
                            classroom={cours.classroom ?? ""}
                            date={cours.date}
                            notes={cours.notes ?? ""}
                            starttime={cours.starttime}
                            endtime={cours.endtime}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Agenda;

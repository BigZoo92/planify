import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import { useGesture } from "@use-gesture/react";
import { gsap } from "gsap";

// Components
import { CardCalendrier } from "../../components/CardCalendrier";

// Styles
import "react-calendar/dist/Calendar.css";
import "./Calendrier.scss";
import { WarningCircle } from "@phosphor-icons/react";
import { useTimetable } from "../../providers";

const Calendrier: React.FC = () => {
    const [dateSelectionnee, setDateSelectionnee] = useState(new Date());
    const [view, setView] = useState<"month" | "week">("month");
    const { events } = useTimetable();
    const calendarRef = useRef<HTMLDivElement>(null);
    const dateContentRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLSpanElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const deactivatedRef = useRef<HTMLParagraphElement>(null);
    const mainRef = useRef<HTMLElement>(null);

    const onChangeDate = (date: Date) => {
        setDateSelectionnee(date);
    };

    const filtreCours = events.filter((course) => {
        if (!course.data || !course.data.date) return false;

        const dateParts = course.data.date.split("/");
        if (dateParts.length !== 3) return false;

        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        const dateCours = new Date(formattedDate);

        return (
            dateCours.getFullYear() === dateSelectionnee.getFullYear() &&
            dateCours.getMonth() === dateSelectionnee.getMonth() &&
            dateCours.getDate() === dateSelectionnee.getDate()
        );
    });

    const formateDate = (date: Date) => {
        const options = { day: "numeric", month: "long", year: "numeric" };
        //@ts-ignore
        const formattedDate = date.toLocaleDateString("fr-FR", options);
        const [day, month, year] = formattedDate.split(" ");
        return { day, month, year };
    };

    const getRelativeDayText = (selectedDate: Date) => {
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

    const bind = useGesture({
        onDrag: ({ direction: [dy] }) => {
            if (dy < 0) {
                gsap.to(calendarRef.current, {
                    y: -100,
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        setView("week");
                        gsap.fromTo(
                            calendarRef.current,
                            { y: 100, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.5 }
                        );
                    },
                });
            } else if (dy > 0 && view !== "month") {
                gsap.to(calendarRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        setView("month");
                        gsap.fromTo(
                            calendarRef.current,
                            { y: -100, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.5 }
                        );
                    },
                });
            }
        },
    });

    useEffect(() => {
        if (dateContentRef.current && tagRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(
                dateContentRef.current.querySelectorAll("p"),
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.3, stagger: 0.1 }
            ).fromTo(
                tagRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.3 }
            );
        }
    }, [dateSelectionnee]);

    useEffect(() => {
        if (cardsRef.current.length > 0) {
            gsap.fromTo(
                cardsRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 }
            );
        }
    }, [filtreCours]);

    useEffect(() => {
        if (filtreCours.length === 0 && deactivatedRef.current) {
            gsap.fromTo(
                deactivatedRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 }
            );
        }
    }, [filtreCours]);

    useEffect(() => {
        if (mainRef.current) {
            mainRef.current.style.touchAction = "none";
        }
    }, []);

    const getWeekDays = (date: Date) => {
        const startDate = new Date(date);
        const day = startDate.getDay();
        const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
        const weekStart = new Date(startDate.setDate(diff));
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            weekDays.push(new Date(weekStart));
            weekStart.setDate(weekStart.getDate() + 1);
        }
        return weekDays;
    };

    const weekDays = getWeekDays(dateSelectionnee);

    return (
        <main className="calendrier-wrapper" {...bind()} ref={mainRef}>
            <div className="react-calendar-wrapper" ref={calendarRef}>
                {view === "month" ? (
                    <Calendar
                        onChange={onChangeDate}
                        value={dateSelectionnee}
                        view="month"
                    />
                ) : (
                    <div className="week-view">
                        {weekDays.map((day, index) => (
                            <div
                                key={index}
                                className={`week-day ${
                                    day.toDateString() ===
                                    dateSelectionnee.toDateString()
                                        ? "selected"
                                        : ""
                                }`}
                                onClick={() => onChangeDate(day)}
                            >
                                <div className="day-label">
                                    {day
                                        .toLocaleDateString("fr-FR", {
                                            weekday: "short",
                                        })
                                        .charAt(0)}
                                </div>
                                <div className="day-number">
                                    {day.getDate()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="hr-actions"></div>
            </div>
            {filtreCours.length > 0 && (
                <div className="date-display">
                    <div className="date-content" ref={dateContentRef}>
                        <p className="day">{currentDate.day}</p>
                        <div className="date-separator">
                            <p id="month">{currentDate.month}</p>
                            <p id="year">{currentDate.year}</p>
                        </div>
                    </div>
                    <span className="tag" ref={tagRef}>
                        {relativeDayText}
                    </span>
                </div>
            )}
            <div className="calendar-wrapper">
                {filtreCours.length === 0 ? (
                    <p className="deactivated" ref={deactivatedRef}>
                        <WarningCircle size={20} weight="bold" />
                        Aucun évènement trouvé pour ce jour
                    </p>
                ) : (
                    filtreCours.map((course, index) => (
                        <div
                            style={{ width: "100%" }}
                            key={index}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                        >
                            <CardCalendrier
                                group={course.data.group}
                                subject={course.summary}
                                staff={course.data.staff}
                                classroom={course.location}
                                date={course.data.date}
                                notes={course.data.notes}
                                starttime={course.start}
                                endtime={course.end}
                            />
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default Calendrier;

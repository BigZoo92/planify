// Dependencies
import React, { useState, useEffect, useCallback, useMemo } from "react";

// Components
import { CardCalendrier } from "../../components/CardCalendrier";
import Searchbar from "../../components/SearchBar/Searchbar";

// Utils
import { useUser } from "../../providers/UserProvider";
import { useTimetable } from "../../providers";

// Styles
import "./Accueil.scss";
import { Calendar, MapPin, WarningCircle } from "@phosphor-icons/react";

// Types
import { Event } from "../../schema";

const Accueil: React.FC = () => {
    const [weather, setWeather] = useState({
        temp: "",
        condition: "",
        sunrise: "",
        sunset: "",
        location: "",
    });

    const { user } = useUser();
    const { events } = useTimetable();

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                const response = await fetch(
                    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=48.787899,2.190408&days=1&aqi=no&alerts=no&lang=fr`
                );
                const data = await response.json();
                setWeather({
                    temp: `${data.current.temp_c} °C`,
                    condition: data.current.condition.text,
                    sunrise: data.forecast.forecastday[0].astro.sunrise,
                    sunset: data.forecast.forecastday[0].astro.sunset,
                    location: data.location.name,
                });
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeatherData();
    }, []);

    const filterEventsByWeek = useCallback(
        (allCourses: Event[], weekOffset = 0) => {
            const currentDate = new Date();
            const startOfWeek = new Date(
                currentDate.setDate(
                    currentDate.getDate() -
                        currentDate.getDay() +
                        weekOffset * 7
                )
            );
            const endOfWeek = new Date(
                currentDate.setDate(startOfWeek.getDate() + 6)
            );

            return allCourses.filter((course) => {
                if (!course.data || !course.data.date) return false;

                const [day, month, year] = course.data.date.split("/");
                const courseDate = new Date(`${year}-${month}-${day}`);
                const courseEndTime = new Date(
                    `${year}-${month}-${day}T${course.end}:00`
                ).getTime();
                const currentTime = Date.now();

                return (
                    courseDate >= startOfWeek &&
                    courseDate <= endOfWeek &&
                    courseEndTime >= currentTime
                );
            });
        },
        []
    );

    const filterEventsByDay = useCallback((allCourses: Event[]) => {
        const currentDate = new Date().toISOString().split("T")[0];
        return allCourses.filter((course) => {
            if (!course.data || !course.data.date) return false;

            const [day, month, year] = course.data.date.split("/");
            const courseDate = new Date(`${year}-${month}-${day}`)
                .toISOString()
                .split("T")[0];
            return courseDate === currentDate;
        });
    }, []);

    const eventsToday = useMemo(
        () => filterEventsByDay(events),
        [events, filterEventsByDay]
    );
    const eventsThisWeek = useMemo(
        () => filterEventsByWeek(events),
        [events, filterEventsByWeek]
    );
    const eventsNextWeek = useMemo(
        () => filterEventsByWeek(events, 1),
        [events, filterEventsByWeek]
    );

    const recapText =
        eventsToday.length > 0
            ? `Vous avez ${eventsToday.length} évènements aujourd'hui`
            : "Vous n'avez pas d'évènements pour aujourd'hui";

    if (!user) {
        return null;
    }

    return (
        <main className="accueil-wrapper">
            <section className="header-wrapper">
                <div className="header-infos">
                    <h1>Bonjour, {user.firstName} 👋</h1>
                    <div className="header-location">
                        <MapPin size={15} weight="bold" />
                        <span>
                            {weather.location} - {weather.temp}
                        </span>
                    </div>
                </div>
            </section>
            <Searchbar onSearch={() => {}} />
            <section className="recap-wrapper">
                <h2>{recapText}</h2>
                <div className="recap-infos">
                    <span className="nb-cours">Bonne journée !</span>
                </div>
            </section>
            <section className="calendar-wrapper">
                <div className="calendar-header">
                    <Calendar size={25} weight="bold" />
                    <h2>Évènements à venir</h2>
                </div>
                <span className="span-calendar">Cette semaine</span>
                {eventsThisWeek.length > 0 ? (
                    eventsThisWeek.map((timetable, index) => (
                        <CardCalendrier
                            key={index}
                            {...timetable.data}
                            subject={timetable.summary}
                            starttime={timetable.start}
                            endtime={timetable.end}
                        />
                    ))
                ) : (
                    <p className="deactivated">
                        <WarningCircle size={20} weight="bold" />
                        Aucun évènement cette semaine
                    </p>
                )}
                <span className="span-calendar">Semaine prochaine</span>
                {eventsNextWeek.length > 0 ? (
                    eventsNextWeek.map((timetable, index) => (
                        <CardCalendrier
                            key={index}
                            {...timetable.data}
                            subject={timetable.summary}
                            starttime={timetable.start}
                            endtime={timetable.end}
                        />
                    ))
                ) : (
                    <p className="deactivated">
                        <WarningCircle size={20} weight="bold" />
                        Aucun évènement trouvé
                    </p>
                )}
            </section>
        </main>
    );
};

export default Accueil;

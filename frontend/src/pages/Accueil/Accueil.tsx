// Dependencies
import React from "react";
import { useState, useEffect } from "react";

// Components
import CalendarCard from "../../components/CardCalendrier/CardCalendrier";

// Utils
import { getTimetableFromCelcat } from "../../utils/queries";
import { useUser } from "../../providers/UserProvider";

// Schema
import { Event } from "../../schema";

// Styles
import "./Accueil.scss";
import { Calendar, MapPin, WarningCircle } from "@phosphor-icons/react";
import Searchbar from "../../components/SearchBar/Searchbar";

const Accueil: React.FC = () => {
    const [timetables, setTimetables] = useState<Event[]>([]);
    const [weather, setWeather] = useState({
        temp: "",
        condition: "",
        sunrise: "",
        sunset: "",
        location: "",
    });

    const { user } = useUser();

    useEffect(() => {
        (async () => {
            const newTimetables = await getTimetableFromCelcat(
                import.meta.env.VITE_URL_SCRAPING
            );
            setTimetables(newTimetables);
            console.log(newTimetables);
            fetchWeatherData();
        })();
    }, [setTimetables]);

    const fetchWeatherData = async () => {
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
    };

    const filterEventsByWeek = (allCourses, weekOffset = 0) => {
        const currentDate = new Date();
        const currentWeekDay = currentDate.getDay();
        const startOfWeek = new Date(
            currentDate.setDate(
                currentDate.getDate() - currentWeekDay + weekOffset * 7
            )
        );
        const endOfWeek = new Date(
            currentDate.setDate(startOfWeek.getDate() + 6)
        );

        return allCourses.filter((course) => {
            const [day, month, year] = course.data.date.split("/");
            const courseDate = new Date(`${year}-${month}-${day}`);
            const courseStartTime = new Date(
                `${year}-${month}-${day}T${course.start}:00`
            ).getTime();
            const courseEndTime = new Date(
                `${year}-${month}-${day}T${course.end}:00`
            ).getTime();
            const currentTime = new Date().getTime();

            return (
                courseDate >= startOfWeek &&
                courseDate <= endOfWeek &&
                courseEndTime >= currentTime
            );
        });
    };

    const filterEventsByDay = (allCourses) => {
        const currentDate = new Date().toISOString().split("T")[0];
        return allCourses.filter((course) => {
            const [day, month, year] = course.data.date.split("/");
            const courseDate = new Date(`${year}-${month}-${day}`)
                .toISOString()
                .split("T")[0];
            return courseDate === currentDate;
        });
    };

    const eventsThisWeek = filterEventsByWeek(timetables);
    const eventsNextWeek = filterEventsByWeek(timetables, 1);
    const eventsToday = filterEventsByDay(timetables);
    const nbCoursesToday = eventsToday.length;

    const recapText =
        nbCoursesToday > 0
            ? `Vous avez ${nbCoursesToday} évènements aujourd'hui`
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
                        <CalendarCard
                            key={index}
                            group={timetable.data.group}
                            subject={timetable.summary}
                            staff={timetable.data.staff}
                            classroom={timetable.location}
                            date={timetable.data.date}
                            notes={timetable.data.notes}
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
                        <CalendarCard
                            key={index}
                            group={timetable.data.group}
                            subject={timetable.summary}
                            staff={timetable.data.staff}
                            classroom={timetable.location}
                            date={timetable.data.date}
                            notes={timetable.data.notes}
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

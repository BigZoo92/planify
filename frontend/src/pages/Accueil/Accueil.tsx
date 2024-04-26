import { useState, useEffect } from "react";
import CalendarCard from "../../components/CardCalendrier/CardCalendrier";
import SearchBar from "../../components/SearchBar/Searchbar";
import { getTimetableFromCelcat } from "../../utils/queries";
import "./Accueil.scss";
import { Event } from "../../schema";

const Accueil: React.FC = () => {
    const [timetables, setTimetables] = useState<Event[]>([]);
    const [weather, setWeather] = useState({
        temp: "",
        condition: "",
        sunrise: "",
        sunset: "",
        location: "",
    });

    useEffect(() => {
        (async () => {
            const newTimetables = await getTimetableFromCelcat(
                import.meta.env.VITE_URL_SCRAPING
            );
            console.log("Récupération Celcat : ", newTimetables);
            setTimetables(newTimetables);
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

    const dateActuelle = new Date();
    const optionsJour = { weekday: "long" };
    const nomDuJour = dateActuelle.toLocaleDateString("fr-FR", optionsJour);
    const optionsDate = { day: "2-digit", month: "long" };
    const dateDuJour = dateActuelle.toLocaleDateString("fr-FR", optionsDate);

    const filterUpcomingAndCurrentCourses = (allCourses) => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime();

        return allCourses.filter((course) => {
            const [day, month, year] = course.data.date.split("/");
            const courseDate = new Date(`${year}-${month}-${day}`);
            const courseStartTime = new Date(
                `${year}-${month}-${day}T${course.start}:00`
            ).getTime();
            const courseEndTime = new Date(
                `${year}-${month}-${day}T${course.end}:00`
            ).getTime();

            const isToday =
                courseDate.toDateString() === currentDate.toDateString();
            const isCurrentOrUpcoming =
                (courseStartTime <= currentTime &&
                    courseEndTime >= currentTime) ||
                courseStartTime >= currentTime;

            return isToday && isCurrentOrUpcoming;
        });
    };

    const filtreTableauDate = filterUpcomingAndCurrentCourses(timetables);

    return (
        <main className="page-wrapper accueil">
            <div className="accueil-content-wrapper">
                <h1 className="accueil-date">{dateDuJour}</h1>
                <h2 className="accueil-date-nom">
                    {nomDuJour.charAt(0).toUpperCase() + nomDuJour.slice(1)}
                </h2>
                <div className="meteo-wrapper">
                    <div className="meteo-infos">
                        <h2>Météo</h2>
                        <span>{weather.temp}</span>
                        <div className="meteo-location">
                            <h3>Localisation</h3>
                            <p>{weather.location}</p>
                        </div>
                    </div>
                    <div className="meteo-soleil">
                        <div className="meteo-content">
                            <h3>Lever du soleil</h3>
                            <p>{weather.sunrise}</p>
                        </div>
                        <div className="meteo-content">
                            <h3>Coucher du soleil</h3>
                            <p>{weather.sunset}</p>
                        </div>
                    </div>
                </div>
                <SearchBar onSearch={() => console.log("wesh")} />
                <h2>Prochains évènements</h2>
                <div className="calendar-wrapper">
                    {filtreTableauDate.length > 0 ? (
                        filtreTableauDate.map((timetable, index) => (
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
                        <p className="deactivated">Aucun cours à venir.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Accueil;

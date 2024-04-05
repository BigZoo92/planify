import React, { useState, useEffect } from "react";
import CalendarCard from "../../components/CardCalendrier/CardCalendrier";
import "./Accueil.scss";
import SearchBar from "../../components/SearchBar/Searchbar";
import { CalendarEvent, getTimetableFromUrl } from "../../utils/queries";

const Accueil = () => {
    const [timetables, setTimetables] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        (async () => {
            console.log("newTimetables");
            const newTimetables = await getTimetableFromUrl(
                "https://chronos.iut-velizy.uvsq.fr/EDT/g235272.html"
            );
            console.log(newTimetables);
            setTimetables(newTimetables);
        })();
    }, [setTimetables]);

    const dateActuelle = new Date();
    const optionsJour: { weekday: "long" | "short" | "narrow" } = {
        weekday: "long",
    };
    const nomDuJour = dateActuelle.toLocaleDateString("fr-FR", optionsJour);
    const optionsDate: {
        day: "2-digit" | "numeric";
        month: "long" | "short" | "narrow";
    } = {
        day: "2-digit",
        month: "long",
    };
    const dateDuJour = dateActuelle.toLocaleDateString("fr-FR", optionsDate);

    return (
        <div className="page-wrapper accueil">
            <div className="accueil-content-wrapper">
                <h1 className="accueil-date">{dateDuJour}</h1>
                <h2 className="accueil-date-nom">
                    {nomDuJour.charAt(0).toUpperCase() + nomDuJour.slice(1)}
                </h2>
                <div className="meteo-wrapper">
                    <div className="meteo-infos">
                        <h2>Météo</h2>
                        <span>15 °C</span>
                        <div className="meteo-location">
                            <h3>Localisation</h3>
                            <p>Vélizy Villacoublay</p>
                        </div>
                    </div>
                    <div className="meteo-soleil">
                        <div className="meteo-content">
                            <h3>Lever du soleil</h3>
                            <p>07:19</p>
                        </div>
                        <div className="meteo-content">
                            <h3>Coucher du soleil</h3>
                            <p>20:26</p>
                        </div>
                    </div>
                </div>
                <SearchBar onSearch={() => console.log("wesh")} />
                <h2>Prochains évènements</h2>
                <div className="calendar-wrapper">
                    {timetables.length > 0 ? (
                        timetables.map((timetable, index) => (
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
                        <p className="cours-absent">Aucun cours à venir.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Accueil;

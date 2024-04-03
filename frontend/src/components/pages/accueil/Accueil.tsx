import React, { useState, useEffect } from "react";
import CalendarCard from "../../custom/cardCalendrier/CardCalendrier";
import "./Accueil.scss";
import SearchBar from "../../custom/searchbar/Searchbar";

interface AccueilProps {
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

const Accueil: React.FC<AccueilProps> = ({ coursFictifs }) => {
    const [prochainsCours, setProchainsCours] = useState([]);

    useEffect(() => {
        const maintenant = new Date();
        const demain = new Date();
        demain.setDate(maintenant.getDate() + 1);
        demain.setHours(0, 0, 0, 0);

        const coursDuLendemain = coursFictifs
            .map((cours) => ({
                ...cours,
                dateCours: new Date(`${cours.date}T${cours.starttime}`),
            }))
            .filter((cours) => {
                const debutJourneeDemain = demain.getTime();
                const finJourneeDemain = debutJourneeDemain + 86400000;
                return (
                    cours.dateCours.getTime() >= debutJourneeDemain &&
                    cours.dateCours.getTime() < finJourneeDemain
                );
            })
            .sort((a, b) => a.dateCours.getTime() - b.dateCours.getTime());

        setProchainsCours(coursDuLendemain);
    }, [coursFictifs]);

    const dateActuelle = new Date();
    const optionsJour = { weekday: "long" };
    const nomDuJour = dateActuelle.toLocaleDateString("fr-FR", optionsJour);
    const optionsDate = { day: "2-digit", month: "long" };
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
                        <span>16 °C</span>
                        <div className="meteo-location">
                            <h3>Localisation</h3>
                            <p>Vélizy Villacoublay</p>
                        </div>
                    </div>
                    <div className="meteo-soleil">
                        <div className="meteo-content">
                            <h3>Lever du soleil</h3>
                            <p>05:48</p>
                        </div>
                        <div className="meteo-content">
                            <h3>Coucher du soleil</h3>
                            <p>19:59</p>
                        </div>
                    </div>
                </div>
                <SearchBar />
                <h2>Prochains évènements</h2>
                <div className="accueil-prochain-wrapper">
                    {prochainsCours.length > 0 ? (
                        prochainsCours.map((cours) => (
                            <CalendarCard
                                key={cours.id}
                                group={cours.group}
                                subject={cours.subject}
                                staff={cours.staff}
                                classroom={cours.classroom}
                                date={cours.date}
                                notes={cours.notes}
                                starttime={cours.starttime}
                                endtime={cours.endtime}
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

import React, { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import styles from "./SearchBar.module.scss";
import { listPublicAgendas, subscribeToAgenda, listUserSubscribedAgendas } from "../../utils/queries/agenda";
import { useUser } from "../../providers/UserProvider";
import { Agenda } from "../../schema";

const Searchbar: React.FC = () => {
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Agenda[]>([]);
    const [publicAgendas, setPublicAgendas] = useState<Agenda[]>([]);
    const [subscribedAgendas, setSubscribedAgendas] = useState<number[]>([]);
    const resultWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchAgendas = async () => {
            const [agendas, subscribed] = await Promise.all([
                listPublicAgendas(),
                listUserSubscribedAgendas(user.id),
            ]);
            setPublicAgendas(agendas);
            setSubscribedAgendas(subscribed.map((agenda: Agenda) => agenda.id));
        };
        fetchAgendas();
    }, [user.id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const fetchSearchResults = useCallback(() => {
        if (searchTerm.trim() === "") {
            setSearchResults([]);
            return;
        }

        const filteredAgendas = publicAgendas.filter(agenda =>
            agenda.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredAgendas);
    }, [searchTerm, publicAgendas]);

    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            fetchSearchResults();
        }, 300);

        return () => clearTimeout(debounceFetch);
    }, [searchTerm, fetchSearchResults]);

    useEffect(() => {
        if (resultWrapperRef.current && searchResults.length > 0) {
            gsap.fromTo(resultWrapperRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 });
        }
    }, [searchResults]);

    const handleSubscribe = async (agendaId: number) => {
        try {
            const response = await subscribeToAgenda(user.id, agendaId);
            if (response) {
                setSubscribedAgendas([...subscribedAgendas, agendaId]);
                gsap.fromTo(`#agenda-${agendaId}`, { scale: 0.8 }, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
            }
        } catch (error) {
            console.error("Erreur lors de l'abonnement à l'agenda:", error);
            alert("Échec de l'abonnement à l'agenda. Veuillez réessayer.");
        }
    };

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Rechercher un évènement, un agenda..."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            {searchTerm && (
                <div ref={resultWrapperRef} className={styles.resultWrapper}>
                    <h2>Résultats de recherche</h2>
                    {searchResults.length === 0 ? (
                        <p>Aucun résultat trouvé</p>
                    ) : (
                        <>
                            <h3>Agendas</h3>
                            <ul>
                                {searchResults.map((agenda) => (
                                    <li key={agenda.id} id={`agenda-${agenda.id}`}>
                                        {agenda.name}
                                        <button
                                            onClick={() => handleSubscribe(agenda.id)}
                                            className={
                                                subscribedAgendas.includes(agenda.id)
                                                    ? styles.subscribedButton
                                                    : styles.subscribeButton
                                            }
                                            style={{ marginLeft: '8px' }}
                                            disabled={subscribedAgendas.includes(agenda.id)}
                                        >
                                            {subscribedAgendas.includes(agenda.id)
                                                ? "Abonné"
                                                : "S'abonner"}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Searchbar;

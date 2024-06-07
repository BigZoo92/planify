import React, { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import styles from "./SearchBar.module.scss";
import { listAgendas, listPublicAgendas, subscribeToAgenda } from "../../utils/queries/agenda";
import { listEvents } from "../../utils/queries/events/list";
import { useUser } from "../../providers/UserProvider";
import { Agenda, Event } from "../../schema";

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
    let timeoutId: NodeJS.Timeout;
    return ((...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    }) as T;
}

interface SearchBarProps {
    onSearch: (agendas: Agenda[], events: Event[]) => void;
}

const Searchbar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<{
        agendas: Agenda[];
        events: Event[];
    }>({ agendas: [], events: [] });
    const [publicAgendas, setPublicAgendas] = useState<Agenda[]>([]);
    const resultWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPublicAgendas = async () => {
            const agendas = await listPublicAgendas();
            setPublicAgendas(agendas);
        };

        fetchPublicAgendas();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const fetchSearchResults = useCallback(
        async (term: string) => {
            if (term.trim() === "") {
                setSearchResults({ agendas: [], events: [] });
                onSearch([], []);
                return;
            }

            const userId = user.id;
            const userAgendas = await listAgendas(userId);
            const allAgendas = [...userAgendas, ...publicAgendas];
            const events: Event[] = [];
            for (const agenda of allAgendas) {
                const agendaEvents = await listEvents(agenda.id);
                events.push(...agendaEvents);
            }

            const filteredAgendas = allAgendas.filter(
                (agenda) => agenda.name && agenda.name.includes(term)
            );
            const filteredEvents = events.filter(
                (event) => event.summary && event.summary.includes(term)
            );

            setSearchResults({
                agendas: filteredAgendas,
                events: filteredEvents,
            });
            onSearch(filteredAgendas, filteredEvents);
        },
        [user.id, publicAgendas, onSearch]
    );

    const debouncedFetchSearchResults = useCallback(
        debounce(fetchSearchResults, 300),
        [fetchSearchResults]
    );

    useEffect(() => {
        if (searchTerm) {
            debouncedFetchSearchResults(searchTerm);
        }
    }, [searchTerm, debouncedFetchSearchResults]);

    useEffect(() => {
        if (
            resultWrapperRef.current &&
            searchResults.agendas.length + searchResults.events.length > 0
        ) {
            gsap.fromTo(
                resultWrapperRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
        }
    }, [searchResults]);

    const handleSubscribe = async (agendaId: number) => {
        try {
            const response = await subscribeToAgenda(user.id, agendaId);
            if (response) {
                alert("Vous êtes maintenant abonné à cet agenda.");
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
                    {searchResults.agendas.length === 0 &&
                    searchResults.events.length === 0 ? (
                        <p>Aucun résultat trouvé</p>
                    ) : (
                        <>
                            <h3>Agendas</h3>
                            <ul>
                                {searchResults.agendas.map((agenda) => (
                                    <li key={agenda.id}>
                                        {agenda.name}
                                        <button
                                            onClick={() => handleSubscribe(agenda.id)}
                                            className={styles.subscribeButton}
                                        >
                                            S'abonner
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <h3>Événements</h3>
                            <ul>
                                {searchResults.events.map((event) => (
                                    <li key={event.id}>{event.summary}</li>
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

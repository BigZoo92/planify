import React, { useState, useEffect, useCallback } from "react";
import styles from "./SearchBar.module.scss";
import { listAgendas } from "../../utils/queries/agenda/list";
import { listEvents } from "../../utils/queries/events/list";
import { useUser } from "../../providers/UserProvider";
import { Agenda, Event } from "../../schema";

// Fonction debounce pour limiter la fréquence des appels API
function debounce(fn: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
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
            const agendas = await listAgendas(userId, term);
            const events: Event[] = [];
            for (const agenda of agendas) {
                const agendaEvents = await listEvents(agenda.id, term);
                events.push(...agendaEvents);
            }
            setSearchResults({ agendas, events });
            onSearch(agendas, events);
        },
        [user.id, onSearch]
    );

    // Débouncer la fonction fetchSearchResults
    const debouncedFetchSearchResults = useCallback(
        debounce(fetchSearchResults, 300),
        [fetchSearchResults]
    );

    useEffect(() => {
        debouncedFetchSearchResults(searchTerm);
    }, [searchTerm, debouncedFetchSearchResults]);

    return (
        <div className={styles.searchWrapper}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.resultWrapper}>
                <h3>Résultats de recherche</h3>
                {searchResults.agendas.length === 0 &&
                searchResults.events.length === 0 ? (
                    <p>Aucun résultat trouvé</p>
                ) : (
                    <>
                        <h4>Agendas</h4>
                        <ul>
                            {searchResults.agendas.map((agenda) => (
                                <li key={agenda.id}>{agenda.name}</li>
                            ))}
                        </ul>
                        <h4>Événements</h4>
                        <ul>
                            {searchResults.events.map((event) => (
                                <li key={event.id}>{event.name}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default Searchbar;

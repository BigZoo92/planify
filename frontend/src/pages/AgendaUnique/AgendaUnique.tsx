// React and React Router
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Animation Library
import gsap from "gsap";

// Schema
import { Agenda as AgendaBackend, Event } from "../../schema";

// Queries
import { getAgenda } from "../../utils/queries/agenda";
import { listEvents } from "../../utils/queries";

// Assets
import NoEvents from "../../assets/images/element/no-events.svg";

// Icons
import { CaretLeft, DotsThreeVertical } from "@phosphor-icons/react";

// Styles
import styles from "./AgendaUnique.module.scss";
import { CreateEvent } from "../../components/Form/EventForm";

const AgendaUnique: React.FC = () => {
    const { agendaId } = useParams<{ agendaId: string }>();
    const [agenda, setAgenda] = useState<AgendaBackend | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();
    const eventsRef = useRef<HTMLDivElement | null>(null);
    const noEventsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!agendaId) return;

        const fetchAgenda = async () => {
            try {
                const agendaIdNumber = parseInt(agendaId);
                const fetchedAgenda = await getAgenda(agendaIdNumber);
                const fetchedEvents = await listEvents(agendaIdNumber);
                setAgenda(fetchedAgenda);
                setEvents(fetchedEvents);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des événements : ",
                    error
                );
            }
        };

        fetchAgenda();
    }, [agendaId]);

    useEffect(() => {
        if (events.length > 0 && eventsRef.current) {
            gsap.fromTo(
                eventsRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
            );
        } else if (events.length === 0 && noEventsRef.current) {
            gsap.fromTo(
                noEventsRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
        }
    }, [events]);

    if (!agenda) return null;

    return (
        <main className={styles.agendaUnique}>
            <div className={styles.agendaUniqueHeader}>
                <div className={styles.agendaUniqueHeaderLeft}>
                    <button
                        className={styles.agendaNavigation}
                        onClick={() => navigate("/agenda")}
                    >
                        <CaretLeft size={25} weight="bold" />
                    </button>
                    <h1>{agenda.name}</h1>
                </div>
                <button className={styles.agendaActions}>
                    <DotsThreeVertical size={25} weight="bold" />
                </button>
            </div>
            {events.length > 0 ? (
                <div className={styles.eventWrapper} ref={eventsRef}>
                    <span>{events.length} évènements trouvés</span>
                    {events.map((event, index) => (
                        <div key={index} className={styles.eventCard}>
                            <h2>{event.summary}</h2>
                            <div className={styles.eventDateWrapper}>
                                <div className={styles.eventDate}>
                                    <h3>Date</h3>
                                    <p>
                                        {new Date(
                                            event.start
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        {new Date(
                                            event.end
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className={styles.eventDate}>
                                    <h3>Heure</h3>
                                    <p>
                                        {new Date(
                                            event.start
                                        ).toLocaleTimeString()}
                                    </p>
                                    <p>
                                        {new Date(
                                            event.end
                                        ).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.eventLocation}>
                                <h3>Lieu de l'évènement</h3>
                                <p>{event.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div ref={noEventsRef} className={styles.noEvents}>
                    <img src={NoEvents} alt="No events" />
                    <p>Vous n'avez pas encore d'événements</p>
                </div>
            )}
            <CreateEvent
                agendaId={parseInt(agendaId)}
                onCancel={() => {}}
                onClose={() => {}}
            />
        </main>
    );
};

export default AgendaUnique;

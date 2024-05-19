import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";

// Schema
import { Agenda as AgendaBackend, Event } from "../../schema";

// Queries
import { getAgenda } from "../../utils/queries/agenda";
import { listEvents } from "../../utils/queries";

// Assets
import NoEvents from "../../assets/images/element/no-events.svg";

// Styles
import styles from "./AgendaUnique.module.scss";
import { CaretLeft, DotsThreeVertical } from "@phosphor-icons/react";

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
                console.error("Error fetching agenda or events:", error);
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
                <div ref={eventsRef}>
                    {events.map((e, index) => (
                        <div key={index} className={styles.eventCard}>
                            <div>{e.summary}</div>
                            <div>{e.start.toString()}</div>
                            <div>{e.end.toString()}</div>
                            <div>{e.location}</div>
                            {/* <div>{e.type}</div> */}
                        </div>
                    ))}
                </div>
            ) : (
                <div ref={noEventsRef} className={styles.noEvents}>
                    <img src={NoEvents} alt="No events" />
                    <p>Vous n'avez pas encore d'événements</p>
                </div>
            )}
        </main>
    );
};

export default AgendaUnique;

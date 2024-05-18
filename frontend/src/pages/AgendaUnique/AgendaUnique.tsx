import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Schema
import { Agenda as AgendaBackend, Event } from "../../schema";

// Queries
import { getAgenda } from "../../utils/queries/agenda";
import { listEvents } from "../../utils/queries";

// Styles
import styles from "./AgendaUnique.module.scss";

const AgendaUnique: React.FC = () => {
    const { agendaId } = useParams<{ agendaId: string }>();
    const [agenda, setAgenda] = useState<AgendaBackend | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!agendaId) return;
        console.log(agendaId);
        const fetchAgenda = async () => {
            try {
                const agendaIdNumber = parseInt(agendaId);
                const fetchedAgenda = await getAgenda(agendaIdNumber);
                const fetchedEvents = await listEvents(agendaIdNumber);
                setAgenda(fetchedAgenda);
                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Error fetching agendas:", error);
            }
        };

        fetchAgenda();
    }, [agendaId]);

    if (!agenda) return null;

    return (
        <main className={styles.agendaAdminWrapper}>
            <button onClick={() => navigate("/agenda")}>
                Go back to Agenda
            </button>
            <h1>{agenda.name}</h1>
            {events.map((e, index) => (
                <div key={index}>
                    <div>{e.summary}</div>
                    <div>{e.start.toString()}</div>
                    <div>{e.end.toString()}</div>
                    <div>{e.location}</div>
                    {/* <div>{e.type}</div> */}
                </div>
            ))}
        </main>
    );
};

export default AgendaUnique;

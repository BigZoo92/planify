import React, { useEffect, useState } from "react";
import CreateAgendaForm from "../../components/Form/CreateAgendaForm";
import { Agenda, Event } from "../../schema";
import { getAgenda } from "../../utils/queries/agenda";
import { useUser } from "../../providers";
import "./AgendaAdmin.scss";
import { useParams } from "react-router-dom";
import { listEvents } from "../../utils/queries";
import CreateEventForm from "../../components/Form/CreateEventForm";

const AgendaAdmin: React.FC = () => {
    const { agendaId } = useParams<{ agendaId: string }>();
    const [agenda, setAgenda] = useState<Agenda | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

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
        <section className="agenda_admin_container">
            <h1>{agenda.name}</h1>
            <CreateEventForm agendaId={parseInt(agendaId)}></CreateEventForm>
            {events.map((e, index) => (
                <div key={index}>
                    <div>{e.summary}</div>
                    <div>{e.start.toString()}</div>
                    <div>{e.end.toString()}</div>
                    <div>{e.location}</div>
                </div>
            ))}
        </section>
    );
};

export default AgendaAdmin;

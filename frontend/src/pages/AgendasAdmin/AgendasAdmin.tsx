import React, { useEffect, useState } from "react";
import CreateAgendaForm from "../../components/Form/CreateAgendaForm";
import { Agenda } from "../../schema";
import { listAgendasAdmin } from "../../utils/queries/agenda";
import { useUser } from "../../providers";
import "./AgendasAdmin.scss";
import { Link } from "react-router-dom";

const AgendasAdmin: React.FC = () => {
    const [agendas, setAgendas] = useState<Agenda[]>([]);
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;

        const fetchAgendas = async () => {
            try {
                const fetchedAgendas = await listAgendasAdmin(user.id);
                setAgendas(fetchedAgendas);
            } catch (error) {
                console.error("Error fetching agendas:", error);
            }
        };

        fetchAgendas();
    }, [user]);

    return (
        <section className="agenda_admin_container">
            <h1>Our Agendas</h1>
            <div className="agenda_chip_container">
                {agendas.length !== 0 ? (
                    agendas.map((agenda) => (
                        <Link
                            key={agenda.id}
                            className="agenda_chip"
                            to={`/agendaAdmin/${agenda.id}`}
                        >
                            {agenda.name}
                        </Link>
                    ))
                ) : (
                    <div>No agendas yet</div>
                )}
            </div>
            <h2>Create an Agenda</h2>
            <CreateAgendaForm />
        </section>
    );
};

export default AgendasAdmin;

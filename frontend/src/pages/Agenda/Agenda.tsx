import React, { useEffect, useState } from "react";
import CreateAgendaForm from "../../components/Form/CreateAgendaForm";
import { Agenda as AgendaBackend } from "../../schema";
import { listAgendasAdmin } from "../../utils/queries/agenda";
import { useUser } from "../../providers";
import { Link } from "react-router-dom";

import styles from "./Agenda.module.scss";
import { Calendar, DotsThree, User } from "@phosphor-icons/react";

const Agenda: React.FC = () => {
    const [agendas, setAgendas] = useState<AgendaBackend[]>([]);
    const [selectedType, setSelectedType] = useState<string>("Tous");
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

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", options);
    };

    const filterAgendas = (type: string) => {
        if (type === "Tous") {
            return agendas;
        }
        return agendas.filter((agenda) => agenda.type === type);
    };

    const handleTypeChange = (type: string) => {
        setSelectedType(type);
    };

    return (
        <main className={styles.agendaWrapper}>
            <h1>Agenda</h1>
            <div className={styles.agendaNav}>
                <button
                    onClick={() => handleTypeChange("Tous")}
                    className={selectedType === "Tous" ? styles.active : ""}
                >
                    Tous
                </button>
                <button
                    onClick={() => handleTypeChange("ACADEMIC")}
                    className={selectedType === "ACADEMIC" ? styles.active : ""}
                >
                    Académique
                </button>
                <button
                    onClick={() => handleTypeChange("Personnel")}
                    className={
                        selectedType === "Personnel" ? styles.active : ""
                    }
                >
                    Personnel
                </button>
                <button
                    onClick={() => handleTypeChange("URL")}
                    className={selectedType === "URL" ? styles.active : ""}
                >
                    URL
                </button>
            </div>
            <div className={styles.agendaList}>
                {filterAgendas(selectedType).length !== 0 ? (
                    filterAgendas(selectedType).map((agenda) => (
                        <Link to={`/agenda/${agenda.id}`} key={agenda.id}>
                            <div className={styles.agendaCard}>
                                <div className={styles.agendaHeader}>
                                    <h2>{agenda.name}</h2>
                                    <button className={styles.agendaActions}>
                                        <DotsThree size={30} weight="bold" />
                                    </button>
                                </div>
                                <div className={styles.agendaContent}>
                                    <div className={styles.agendaItems}>
                                        <User size={15} weight="bold" />
                                        <span>3</span>
                                    </div>
                                    <div className={styles.agendaItems}>
                                        <Calendar size={15} weight="bold" />
                                        <span>
                                            {formatDate(agenda.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>Vous n'avez pas encore d'agenda</div>
                )}
            </div>
            <h2>Créez un agenda</h2>
            <CreateAgendaForm />
        </main>
    );
};

export default Agenda;

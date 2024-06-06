import { useEffect, useState, useRef } from "react";
import { Agenda as AgendaBackend } from "../../schema";
import {
    listAgendasAdmin,
    removeAgenda,
    updateAgenda,
} from "../../utils/queries/agenda";
import { useUser } from "../../providers";
import { Link } from "react-router-dom";
import { ModalEdit } from "../../components/Agenda/ModalEdit";
import styles from "./Agenda.module.scss";
import {
    Calendar,
    DotsThree,
    User,
    WarningCircle,
} from "@phosphor-icons/react";
import gsap from "gsap";

const Agenda: React.FC = () => {
    const [agendas, setAgendas] = useState<AgendaBackend[]>([]);
    const [selectedType, setSelectedType] = useState<string>("Tous");
    const [editAgenda, setEditAgenda] = useState<AgendaBackend | null>(null);
    const { user } = useUser();
    const agendaListRef = useRef<HTMLDivElement | null>(null);
    const deactivatedRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        if (!user) return;

        const fetchAgendas = async () => {
            try {
                const fetchedAgendas = await listAgendasAdmin(user.id);
                setAgendas(fetchedAgendas);
                if (agendaListRef.current) {
                    gsap.fromTo(
                        agendaListRef.current.children,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
                    );
                }
            } catch (error) {
                console.error("Error fetching agendas:", error);
            }
        };

        fetchAgendas();
    }, [user]);

    useEffect(() => {
        if (agendaListRef.current) {
            gsap.fromTo(
                agendaListRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
            );
        }

        if (deactivatedRef.current) {
            gsap.fromTo(
                deactivatedRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
        }
    }, [selectedType]);

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

    const handleEdit = (agenda: AgendaBackend) => {
        setEditAgenda(agenda);
    };

    const handleDelete = async (agendaId: number) => {
        const success = await removeAgenda(agendaId);
        if (success) {
            setAgendas((prevAgendas) =>
                prevAgendas.filter((agenda) => agenda.id !== agendaId)
            );
        }
    };

    const handleSaveEdit = async (updatedAgenda: AgendaBackend) => {
        const success = await updateAgenda(updatedAgenda);
        if (success) {
            setAgendas((prevAgendas) =>
                prevAgendas.map((agenda) =>
                    agenda.id === updatedAgenda.id ? updatedAgenda : agenda
                )
            );
        }
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
                    onClick={() => handleTypeChange("UNIVERSITAIRE")}
                    className={
                        selectedType === "UNIVERSITAIRE" ? styles.active : ""
                    }
                >
                    Universitaire
                </button>
                <button
                    onClick={() => handleTypeChange("PERSONNEL")}
                    className={
                        selectedType === "PERSONNEL" ? styles.active : ""
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
            <div className={styles.agendaList} ref={agendaListRef}>
                {filterAgendas(selectedType).length !== 0 ? (
                    filterAgendas(selectedType).map((agenda) => (
                        <div key={agenda.id} className={styles.agendaCard}>
                            <div className={styles.agendaHeader}>
                                <h2>{agenda.name}</h2>
                                <button
                                    className={styles.agendaActions}
                                    onClick={() => handleEdit(agenda)}
                                >
                                    <DotsThree size={30} weight="bold" />
                                </button>
                            </div>
                            <Link to={`/agenda/${agenda.id}`} key={agenda.id}>
                                <div className={styles.agendaContent}>
                                    <div className={styles.agendaItems}>
                                        <User size={15} weight="bold" />
                                        <span>3</span>
                                    </div>
                                    <div className={styles.agendaItems}>
                                        <Calendar size={15} weight="bold" />
                                        <span>
                                            {formatDate(
                                                agenda.createdAt.toString()
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="deactivated" ref={deactivatedRef}>
                        <WarningCircle size={20} weight="bold" />
                        Vous n'avez pas encore d'agendas
                    </p>
                )}
            </div>
            {editAgenda && (
                <ModalEdit
                    agenda={editAgenda}
                    onClose={() => setEditAgenda(null)}
                    onSave={handleSaveEdit}
                />
            )}
        </main>
    );
};

export default Agenda;

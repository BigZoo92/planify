import { useState } from "react";
import { Agenda } from "../../../schema";
import { Link } from "react-router-dom";
import { Share, Calendar, PencilSimple, Trash, X } from "@phosphor-icons/react";
import { removeAgenda } from "../../../utils/queries/agenda/delete";
import styles from "./ModalEdit.module.scss";

interface ModalEditProps {
    agenda: Agenda;
    onClose: () => void;
    onSave: (updatedAgenda: Agenda) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({ agenda, onClose, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(agenda.name);
    const [type, setType] = useState<"UNIVERSITAIRE" | "PERSONNEL">(
        agenda.type
    );

    const handleSave = () => {
        onSave({ ...agenda, name, type });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        const success = await removeAgenda(agenda.id);
        if (success) {
            onClose();
            alert("Agenda supprimé avec succès.");
        } else {
            alert("Erreur lors de la suppression de l'agenda.");
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.closeIcon} onClick={onClose}>
                <X size={24} />
            </div>
            {isEditing ? (
                <form>
                    <label>
                        Nom:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Type:
                        <select
                            value={type}
                            onChange={(e) =>
                                setType(
                                    e.target.value as
                                        | "UNIVERSITAIRE"
                                        | "PERSONNEL"
                                )
                            }
                        >
                            <option value="UNIVERSITAIRE">Universitaire</option>
                            <option value="PERSONNEL">Personnel</option>
                        </select>
                    </label>
                    <button type="button" onClick={handleSave}>
                        Sauvegarder
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Annuler
                    </button>
                </form>
            ) : (
                <div className={styles.modalContent}>
                    <Link to={`/agenda/${agenda.id}`} key={agenda.id}>
                        <div className={styles.buttonRow}>
                            <Calendar size={24} />
                            <div className={styles.buttonLabel}>
                                Accéder à l'agenda
                            </div>
                        </div>
                    </Link>
                    <div
                        className={styles.buttonRow}
                        onClick={() => alert("Partager l'agenda")}
                    >
                        <Share size={24} />
                        <div className={styles.buttonLabel}>Partager</div>
                    </div>
                    <div
                        className={styles.buttonRow}
                        onClick={() => setIsEditing(true)}
                    >
                        <PencilSimple size={24} />
                        <div className={styles.buttonLabel}>Modifier</div>
                    </div>
                    <div
                        className={`${styles.buttonRow} ${styles.deleteButton}`}
                        onClick={handleDelete}
                    >
                        <Trash size={24} />
                        <div className={styles.buttonLabel}>Supprimer</div>
                    </div>
                </div>
            )}
            <div className={styles.modalContent}>
                <h2>Modifier l'Agenda</h2>
                <label>
                    Nom:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Type:
                    <select
                        value={type}
                        onChange={(e) =>
                            setType(
                                e.target.value as "UNIVERSITAIRE" | "PERSONNEL"
                            )
                        }
                    >
                        <option value="UNIVERSITAIRE">Universitaire</option>
                        <option value="PERSONNEL">Personnel</option>
                    </select>
                </label>
                <button onClick={handleSave}>Sauvegarder</button>
                <button onClick={onClose}>Annuler</button>
            </div>
        </div>
    );
};

export default ModalEdit;

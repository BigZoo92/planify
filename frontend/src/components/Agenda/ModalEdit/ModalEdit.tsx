import { useState } from "react";
import { Agenda } from "../../../schema";
import styles from "./ModalEdit.module.scss";

interface ModalEditProps {
    agenda: Agenda;
    onClose: () => void;
    onSave: (updatedAgenda: Agenda) => void;
}

const ModalEdit: React.FC<ModalEditProps> = ({ agenda, onClose, onSave }) => {
    const [name, setName] = useState(agenda.name);
    const [type, setType] = useState(agenda.type);

    const handleSave = () => {
        onSave({ ...agenda, name, type });
        onClose();
    };

    return (
        <div className={styles.modal}>
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

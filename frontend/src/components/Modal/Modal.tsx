import React from "react";
import { X } from "@phosphor-icons/react";
import "./Modal.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Ajouter un évènement 📅</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-wrapper">
                        <label htmlFor="nom">Nom de l'événement:</label>
                        <input type="text" id="nom" name="nom" placeholder="Nom de l'évènement" />
                    </div>
                    <div className="form-wrapper">
                        <label htmlFor="description">Description de l'événement:</label>
                        <textarea id="description" name="description" placeholder="Description de l'évènement"></textarea>
                    </div>
                    <div className="form-wrapper">
                        <label htmlFor="date">Date de l'événement:</label>
                        <input type="date" id="date" name="date" placeholder="Date" />
                    </div>
                    <div className="grid-wrapper">
                        <div className="form-wrapper">
                            <label htmlFor="heureDebut">Heure de début:</label>
                            <input type="time" id="heureDebut" name="heureDebut" />
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="heureFin">Heure de fin:</label>
                            <input type="time" id="heureFin" name="heureFin" />
                        </div>
                    </div>
                    <div className="form-wrapper">
                        <label htmlFor="lieu">Lieu de l'événement:</label>
                        <input type="text" id="lieu" name="lieu" placeholder="Lieu de l'évènement" />
                    </div>
                    <div className="btn-wrapper">
                        <input type="submit" value="Créer l'évènement" />
                        <button type="button" className="close-button" onClick={onClose}>
                            <X size={20} weight="bold" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
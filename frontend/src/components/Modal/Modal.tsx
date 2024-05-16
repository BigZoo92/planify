import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { X } from "@phosphor-icons/react";
import { gsap } from "gsap";
import "./Modal.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface EventFormInputs {
    nom: string;
    description: string;
    date: string;
    heureDebut: string;
    heureFin: string;
    lieu: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EventFormInputs>();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
            gsap.to(overlayRef.current, {
                opacity: 1,
                visibility: "visible",
                duration: 0.5,
                ease: "power3.out",
            });
            gsap.fromTo(
                modalRef.current,
                { y: "100%" },
                { y: "0%", duration: 0.5, ease: "power3.out" }
            );
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                visibility: "hidden",
                duration: 0.5,
                ease: "power3.in",
            });
            gsap.to(modalRef.current, {
                y: "100%",
                duration: 0.5,
                ease: "power3.in",
                onComplete: () => {
                    document.body.classList.remove("no-scroll");
                    reset();
                },
            });
        }

        return () => {
            document.body.classList.remove("no-scroll");
            reset();
        };
    }, [isOpen, reset]);

    const onSubmit: SubmitHandler<EventFormInputs> = (data) => {
        console.log(data);
        onClose();
    };

    const handleCancel = () => {
        onClose();
        reset();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" ref={overlayRef}></div>
            <div className="modal visible" ref={modalRef}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Ajouter un évènement</h2>
                        <button className="close-button" onClick={handleCancel}>
                            <X size={20} weight="bold" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-wrapper">
                            <label htmlFor="nom">Nom de l'événement:</label>
                            <input
                                {...register("nom", {
                                    required: "Ce champ est requis",
                                })}
                                type="text"
                                id="nom"
                                name="nom"
                                placeholder="Nom de l'évènement"
                            />
                            {errors.nom && (
                                <p className="error-message">
                                    {errors.nom.message}
                                </p>
                            )}
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="description">
                                Description de l'événement:
                            </label>
                            <textarea
                                {...register("description", {
                                    required: "Ce champ est requis",
                                })}
                                id="description"
                                name="description"
                                placeholder="Description de l'évènement"
                            ></textarea>
                            {errors.description && (
                                <p className="error-message">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="date">Date de l'événement:</label>
                            <input
                                {...register("date", {
                                    required: "Ce champ est requis",
                                })}
                                type="date"
                                id="date"
                                name="date"
                                placeholder="Date"
                            />
                            {errors.date && (
                                <p className="error-message">
                                    {errors.date.message}
                                </p>
                            )}
                        </div>
                        <div className="grid-wrapper">
                            <div className="form-wrapper">
                                <label htmlFor="heureDebut">
                                    Heure de début:
                                </label>
                                <input
                                    {...register("heureDebut", {
                                        required: "Ce champ est requis",
                                    })}
                                    type="time"
                                    id="heureDebut"
                                    name="heureDebut"
                                />
                                {errors.heureDebut && (
                                    <p className="error-message">
                                        {errors.heureDebut.message}
                                    </p>
                                )}
                            </div>
                            <div className="form-wrapper">
                                <label htmlFor="heureFin">Heure de fin:</label>
                                <input
                                    {...register("heureFin", {
                                        required: "Ce champ est requis",
                                    })}
                                    type="time"
                                    id="heureFin"
                                    name="heureFin"
                                />
                                {errors.heureFin && (
                                    <p className="error-message">
                                        {errors.heureFin.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="lieu">Lieu de l'événement:</label>
                            <input
                                {...register("lieu", {
                                    required: "Ce champ est requis",
                                })}
                                type="text"
                                id="lieu"
                                name="lieu"
                                placeholder="Lieu de l'évènement"
                            />
                            {errors.lieu && (
                                <p className="error-message">
                                    {errors.lieu.message}
                                </p>
                            )}
                        </div>
                        <div className="btn-wrapper">
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={handleCancel}
                            >
                                Annuler
                            </button>
                            <input type="submit" value="Créer l'évènement" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;

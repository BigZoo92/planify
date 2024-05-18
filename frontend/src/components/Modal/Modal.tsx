// Dependencies
import React, { useEffect, useRef } from "react";
import { useLocation, matchPath } from "react-router-dom";

// Components
import { CreateAgenda } from "../Form/AgendaForm";
import { CreateEvent } from "../Form/EventForm";

// Assets
import { X } from "@phosphor-icons/react";
import { gsap } from "gsap";

// Styles
import "./Modal.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const isAgendaPage = location.pathname === "/agenda";
    const match = matchPath("/agenda/:agendaId", location.pathname);
    const isEventPage = !!match;

    const agendaId = match?.params.agendaId
        ? parseInt(match.params.agendaId)
        : null;

    const modalRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
            if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                    opacity: 1,
                    visibility: "visible",
                    duration: 0.5,
                    ease: "power3.out",
                });
            }
            if (modalRef.current) {
                gsap.fromTo(
                    modalRef.current,
                    { y: "100%" },
                    { y: "0%", duration: 0.5, ease: "power3.out" }
                );
            }
        } else {
            if (overlayRef.current) {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    visibility: "hidden",
                    duration: 0.5,
                    ease: "power3.in",
                });
            }
            if (modalRef.current) {
                gsap.to(modalRef.current, {
                    y: "100%",
                    duration: 0.5,
                    ease: "power3.in",
                    onComplete: () => {
                        document.body.classList.remove("no-scroll");
                    },
                });
            }
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" ref={overlayRef}></div>
            <div className="modal visible" ref={modalRef}>
                <div className="modal-content">
                    <div className="modal-header">
                        {isAgendaPage ? (
                            <h2>Créez un nouvel agenda</h2>
                        ) : isEventPage ? (
                            <h2>Ajouter un évènement</h2>
                        ) : (
                            <h2>Ajouter un élément</h2>
                        )}
                        <button className="close-button" onClick={handleCancel}>
                            <X size={20} weight="bold" />
                        </button>
                    </div>
                    {isAgendaPage ? (
                        <CreateAgenda
                            onCancel={handleCancel}
                            onClose={onClose}
                        />
                    ) : isEventPage ? (
                        <CreateEvent
                            agendaId={parseInt(agendaId)}
                            onCancel={handleCancel}
                            onClose={onClose}
                        />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default Modal;

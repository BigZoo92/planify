import { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

// Components
import { CreateAgenda } from "../Form/AgendaForm";
import { CreateEvent } from "../Form/EventForm";

// Assets
import { gsap } from "gsap";

// Styles
import "./Modal.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { agendaId } = useParams<{ agendaId: string }>();
    const isAgendaPage = location.pathname === "/agenda";
    const isEventPage = /^\/agenda\/\d+$/.test(location.pathname);

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
                    onClose();
                },
            });
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal-overlay"
                ref={overlayRef}
                onClick={handleCancel}
            ></div>
            <div className="modal visible" ref={modalRef}>
                <div className="hr-actions"></div>
                {/* <div className="modal-header">
                    <button
                        className="cancel"
                        type="button"
                        onClick={handleCancel}
                    >
                        Annuler
                    </button>
                    <h2>
                        {isAgendaPage
                            ? "Créer un agenda"
                            : "Créer un événement"}
                    </h2>
                    <button className="submit" type="submit">
                        Créer
                    </button>
                </div> */}
                <div className="modal-content">
                    {isAgendaPage ? (
                        <CreateAgenda onClose={onClose} />
                    ) : isEventPage ? (
                        <CreateEvent
                            agendaId={parseInt(agendaId)}
                            onCancel={handleCancel}
                            onClose={onClose}
                        />
                    ) : (
                        <CreateEvent
                            agendaId={parseInt(agendaId)}
                            onCancel={handleCancel}
                            onClose={onClose}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEvent } from "../../../utils/queries";
import { Event } from "../../../schema";
import { z } from "zod";
import { getAdress } from "../../../utils/queries/events/geopify";
import { gsap } from "gsap";

export const EventSchemaForm = z.object({
    summary: z.string().nonempty("Le titre est requis"),
    location: z.string().nonempty("Le lieu est requis"),
    start: z.string().nonempty("La date de début est requise"),
    end: z.string().nonempty("La date de fin est requise"),
    data: z.any().optional(),
});

interface CreateEventProps {
    agendaId?: number;
    userId?: number;
    onCancel: () => void;
    onClose: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({
    agendaId,
    userId,
    onCancel,
    onClose,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Event>({
        resolver: zodResolver(EventSchemaForm),
    });

    const [locationInput, setLocationInput] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (locationInput.length > 2) {
            const fetchSuggestions = async () => {
                const results = await getAdress(locationInput);
                setSuggestions(results);
            };
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [locationInput]);

    useEffect(() => {
        if (suggestions.length > 0 && listRef.current) {
            gsap.fromTo(
                listRef.current.children,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
            );
        }
    }, [suggestions]);

    const onSubmit = async (data: Event) => {
        const result = await createEvent({
            ...data,
            agendaId,
            userId,
        });
        if (result) {
            alert("L'événement a été créé avec succès");
            onClose();
            window.location.reload();
        } else {
            alert("La création de l'événement a échoué");
        }
    };

    const onInvalid = (errors) => {
        console.error(errors);
        alert("Veuillez corriger les erreurs avant de soumettre le formulaire");
    };

    const formatAddress = (address: string) => {
        const [primary, ...rest] = address.split(", ");
        return { primary, secondary: rest.join(", ") };
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <div className="form-group">
                <label htmlFor="summary">Titre de l'évènement</label>
                <input
                    id="summary"
                    placeholder="Entrez le titre de l'évènement"
                    {...register("summary")}
                />
                {errors.summary && <p>{errors.summary.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="location">Lieu</label>
                <input
                    id="location"
                    placeholder="Entrez le lieu de l'évènement"
                    {...register("location")}
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                />
                {errors.location && <p>{errors.location.message}</p>}
                {suggestions.length > 0 && (
                    <ul className="event-location-list" ref={listRef}>
                        {suggestions.map((suggestion, index) => {
                            const formatted = formatAddress(
                                suggestion.formatted
                            );
                            return (
                                <li
                                    className="event-location-item"
                                    key={index}
                                    onClick={() => {
                                        setLocationInput(suggestion.formatted);
                                        setSuggestions([]);
                                    }}
                                >
                                    <span className="primary">
                                        {formatted.primary}
                                    </span>
                                    ,{" "}
                                    <span className="secondary">
                                        {formatted.secondary}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="start">Début</label>
                <input
                    type="datetime-local"
                    id="start"
                    {...register("start")}
                />
                {errors.start && <p>{errors.start.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="end">Fin</label>
                <input type="datetime-local" id="end" {...register("end")} />
                {errors.end && <p>{errors.end.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="data">Données</label>
                <textarea
                    id="data"
                    placeholder="Entrez les données supplémentaires"
                    {...register("data")}
                />
                {errors.data && <p>{errors.data.message as string}</p>}
            </div>

            <div className="button-group">
                <button
                    type="button"
                    className="btn secondary full"
                    onClick={onCancel}
                >
                    Annuler
                </button>
                <button type="submit" className="btn main full">
                    Créer
                </button>
            </div>
        </form>
    );
};

export default CreateEvent;

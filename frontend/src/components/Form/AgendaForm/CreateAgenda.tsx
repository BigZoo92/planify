import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    RoleAgendaAcademic,
    createAgenda,
} from "../../../utils/queries/agenda";
import { AgendaTypeSchema } from "../../../schema";
import { z } from "zod";
import { Warning, Student, User } from "@phosphor-icons/react";

export const AgendaSchema = z.object({
    type: z.enum(
        Object.keys(AgendaTypeSchema.enum) as [
            keyof typeof AgendaTypeSchema.enum,
        ]
    ),
    name: z.string().min(1, "Le nom est requis"),
    private: z.boolean().optional(),
});

type AgendaFormData = z.infer<typeof AgendaSchema>;

interface CreateAgendaProps {
    onClose: () => void;
}

const CreateAgenda: React.FC<CreateAgendaProps> = ({ onClose }) => {
    const [selectedType, setSelectedType] =
        useState<keyof typeof AgendaTypeSchema.enum>("UNIVERSITAIRE");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<AgendaFormData>({
        resolver: zodResolver(AgendaSchema),
    });

    useEffect(() => {
        setValue("type", "UNIVERSITAIRE");
    }, [setValue]);

    const onSubmit = async (data: AgendaFormData) => {
        try {
            const response = await createAgenda({
                agendaData: {
                    ...data,
                },
                role: RoleAgendaAcademic.ADMIN,
            });
            console.log("Agenda créé avec succès!", response);
            reset();
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la création de l'agenda:", error);
            alert("Échec de la création de l'agenda. Veuillez réessayer.");
        }
    };

    const onInvalid = (errors) => {
        console.error(errors);
        alert("Veuillez corriger les erreurs avant de soumettre le formulaire");
    };

    const handleTypeSelect = (type: keyof typeof AgendaTypeSchema.enum) => {
        setSelectedType(type);
        setValue("type", type);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <div className="form-group">
                <label>Type de l'agenda</label>
                <div className="type-selector">
                    {Object.keys(AgendaTypeSchema.enum).map((type) => (
                        <div
                            key={type}
                            className={`type-option ${selectedType === type ? "selected" : ""}`}
                            onClick={() =>
                                handleTypeSelect(
                                    type as keyof typeof AgendaTypeSchema.enum
                                )
                            }
                        >
                            {type === "UNIVERSITAIRE" ? (
                                <div
                                    className={`type-image-wrapper ${selectedType === type ? "selected" : ""}`}
                                >
                                    <Student size={25} weight="bold" />
                                </div>
                            ) : (
                                <div
                                    className={`type-image-wrapper ${selectedType === type ? "selected" : ""}`}
                                >
                                    <User size={25} weight="bold" />
                                </div>
                            )}
                            <span
                                className={`type-span ${selectedType === type ? "selected" : ""}`}
                            >
                                {type}
                            </span>
                        </div>
                    ))}
                </div>
                {errors.type && (
                    <p className="error-message">
                        <Warning size={20} weight="bold" />
                        {errors.type.message}
                    </p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="name">
                    Nom de l'agenda <span style={{ color: "red" }}>*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Entrez le nom de l'agenda"
                />
                {errors.name && (
                    <p className="error-message">
                        <Warning size={20} weight="bold" />
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="private">Privé</label>
                <input type="checkbox" id="private" {...register("private")} />
            </div>
            <div className="button-group">
                <button
                    type="button"
                    className="btn secondary full"
                    onClick={onClose}
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

export default CreateAgenda;

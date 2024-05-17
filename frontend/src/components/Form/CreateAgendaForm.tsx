import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Agenda as AgendaBackend } from "../../schema";
import {
    AgendaType,
    RoleAgendaAcademic,
    createAgenda,
} from "../../utils/queries/agenda";
import { z } from "zod";
import { Warning, WarningCircle } from "@phosphor-icons/react";

export const AgendaSchema = z.object({
    type: z.nativeEnum(AgendaType),
    name: z.string().min(1, "Le nom de l'agenda est obligatoire"),
});

const CreateAgendaForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AgendaBackend>({
        resolver: zodResolver(AgendaSchema),
    });

    const onSubmit = async (data: AgendaBackend) => {
        console.log("Form data:", data);
        try {
            const response = await createAgenda({
                agendaData: {
                    ...data,
                    type: AgendaType.ACADEMIC,
                },
                role: RoleAgendaAcademic.ADMIN,
            });
            console.log("Agenda created successfully!", response);
            reset();
        } catch (error) {
            console.error("Error creating agenda:", error);
            alert("Failed to create agenda. Please try again.");
        }
    };
    const onInvalid = (errors) => console.error(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <div className="form-group">
                <label htmlFor="type">Type de l'agenda</label>
                <select id="type" {...register("type")}>
                    {Object.values(AgendaType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {errors.type && (
                    <p className="error-message">
                        <Warning size={20} weight="bold" />
                        {errors.type.message}
                    </p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="name">Nom de l'agenda</label>
                <input type="text" id="name" {...register("name")} />
                {errors.name && (
                    <p className="error-message">
                        <Warning size={20} weight="bold" />
                        {errors.name.message}
                    </p>
                )}
            </div>
            <input
                type="submit"
                value={"Créer"}
                onSubmit={onSubmit}
                className="btn main"
            />
        </form>
    );
};

export default CreateAgendaForm;

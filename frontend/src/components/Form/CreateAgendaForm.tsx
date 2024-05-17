import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    RoleAgendaAcademic,
    createAgenda,
} from "../../utils/queries/agenda";
import { AgendaTypeSchema } from "../../schema";
import { z } from "zod";
import { Warning, WarningCircle } from "@phosphor-icons/react";

export const AgendaSchema = z.object({
    type: z.nativeEnum(AgendaType),
    name: z.string().min(1, "Le nom de l'agenda est obligatoire"),
    type: AgendaTypeSchema,
    name: z.string().min(1, "Name is required"),
});

type AgendaFormData = z.infer<typeof AgendaSchema>;

const CreateAgendaForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AgendaFormData>({
        resolver: zodResolver(AgendaSchema),
    });

    const onSubmit = async (data: AgendaFormData) => {
        console.log("Form data:", data);
        try {
            const response = await createAgenda({
                agendaData: {
                    ...data,
                    type: AgendaTypeSchema.enum.UNIVERSITAIRE,
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
                    {Object.values(AgendaTypeSchema.enum).map((type) => (
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
              {/* @ts-ignore */}
                onSubmit={onSubmit}
                className="btn main"
            />
        </form>
    );
};

export default CreateAgendaForm;

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Agenda } from "../../schema";
import {
    AgendaType,
    RoleAgendaAcademic,
    createAgenda,
} from "../../utils/queries/agenda";
import { z } from "zod";

export const AgendaSchema = z.object({
    type: z.nativeEnum(AgendaType),
    name: z.string().min(1, "Name is required"),
});

const CreateAgendaForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Agenda>({
        resolver: zodResolver(AgendaSchema),
    });

    const onSubmit = async (data: Agenda) => {
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
            <div>
                <label htmlFor="type">Type</label>
                <select id="type" {...register("type")}>
                    {Object.values(AgendaType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {errors.type && <p>{errors.type.message}</p>}
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name")} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <input type="submit" value={"create agenda"} onSubmit={onSubmit} />
        </form>
    );
};

export default CreateAgendaForm;

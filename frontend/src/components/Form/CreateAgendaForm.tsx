import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Agenda, AgendaTypeSchema } from "../../schema";
import { RoleAgendaAcademic, createAgenda } from "../../utils/queries/agenda";
import { z } from "zod";

export const AgendaSchema = z.object({
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
            <div>
                <label htmlFor="type">Type</label>
                <select id="type" {...register("type")}>
                    {Object.values(AgendaTypeSchema.enum).map((type) => (
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
            {/* @ts-ignore */}
            <input type="submit" value={"create agenda"} onSubmit={onSubmit} />
        </form>
    );
};

export default CreateAgendaForm;

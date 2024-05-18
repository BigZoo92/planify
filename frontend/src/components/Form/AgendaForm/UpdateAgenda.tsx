import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AgendaSchema, Agenda } from "../../../schema";

interface UpdateAgendaProps {
    initialData: Agenda;
}

const UpdateAgenda: React.FC<UpdateAgendaProps> = ({ initialData }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Agenda>({
        resolver: zodResolver(AgendaSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: Agenda) => {
        try {
            const response = await axios.post("/api/agendas/update", data);
            if (response.status === 200) {
                alert("Agenda updated successfully!");
            } else {
                alert("Failed to update agenda. Please try again.");
            }
        } catch (error) {
            console.error("Error updating agenda:", error);
            alert("Failed to update agenda. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />
            <div>
                <label htmlFor="type">Type</label>
                <input id="type" {...register("type")} />
                {errors.type && <p>{errors.type.message}</p>}
            </div>
            <div>
                <label htmlFor="active">Active</label>
                <input type="checkbox" id="active" {...register("private")} />
                {errors.private && <p>{errors.private.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting}>
                Update Agenda
            </button>
        </form>
    );
};

export default UpdateAgenda;

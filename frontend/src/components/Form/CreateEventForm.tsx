import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEvent } from "../../utils/queries";
import { Event } from "../../schema";
import { z } from "zod";

export const EventSchemaForm = z.object({
    summary: z.string(),
    location: z.string(),
    start: z.string(),
    end: z.string(),
    data: z.any(),
});

const CreateEventForm = ({
    agendaId,
    userId,
}: {
    agendaId?: number;
    userId?: number;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Event>({
        resolver: zodResolver(EventSchemaForm),
    });

    const onSubmit = async (data: Event) => {
        const result = await createEvent({
            ...data,
            agendaId,
            userId,
        });
        if (result) {
            alert("Event created successfully");
        } else {
            alert("Event creation failed");
        }
    };

    const onInvalid = (errors) => console.error(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input id="summary" {...register("summary")} />
                {errors.summary && <p>{errors.summary.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input id="location" {...register("location")} />
                {errors.location && <p>{errors.location.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="start">Start</label>
                <input
                    type="datetime-local"
                    id="start"
                    {...register("start")}
                />
                {errors.start && <p>{errors.start.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="end">End</label>
                <input type="datetime-local" id="end" {...register("end")} />
                {errors.end && <p>{errors.end.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="data">Data</label>
                <textarea id="data" {...register("data")} />
                {errors.data && <p>{errors.data.message as string}</p>}
            </div>

            <button type="submit">Create Event</button>
        </form>
    );
};

export default CreateEventForm;

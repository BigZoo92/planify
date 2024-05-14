import { useForm, SubmitHandler, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import "./Form.scss";

interface FormProps<T> {
    onSubmit: SubmitHandler<T>;
    fields: FormField<T>[];
    buttonName: string;
    schema: ZodSchema<T>;
}

interface FormField<T> {
    name: keyof T;
    label: string;
    type: string;
    required?: boolean;
}

//@ts-ignore
const Form = <T extends Record<string, any>>({
    onSubmit,
    fields,
    buttonName,
    schema,
}: FormProps<T>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        resolver: zodResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field) => (
                <div key={String(field.name)} className="form-group">
                    <label htmlFor={String(field.name)}>{field.label}</label>
                    <input
                        type={field.type}
                        {...register(field.name as Path<T>)}
                        required={field.required}
                    />
                    {errors[field.name] && (
                        <span className="error-message">
                            {errors[field.name]?.message as string}
                        </span>
                    )}
                </div>
            ))}
            <button type="submit">{buttonName}</button>
        </form>
    );
};

export default Form;

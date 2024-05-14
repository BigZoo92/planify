import React, { useState } from "react";
import "./Form.scss";

interface FormProps {
    onSubmit: (formData: FormData) => void;
    fields: FormField[];
    buttonName: string;
}

interface FormField {
    name: string;
    label: string;
    type: string;
    required?: boolean;
}

interface FormData {
    [key: string]: string | string[] | null;
}

const Form: React.FC<FormProps> = ({ onSubmit, fields, buttonName }) => {
    const [formData, setFormData] = useState<FormData>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button type="submit">{buttonName}</button>
        </form>
    );
};

export default Form;

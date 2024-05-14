import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/Form";
import "./Signup.scss";
import { SignupFormSchema, signup } from "../../../utils/queries";

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const handleSignup = async (formData: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
    }) => {
        try {
            await signup(formData);
            navigate("/dashboard");
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    const signupFields: {
        name: keyof typeof SignupFormSchema._type;
        label: string;
        type: string;
        required: boolean;
    }[] = [
        { name: "email", label: "Email", type: "email", required: true },
        {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
        },
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            required: false,
        },
        { name: "lastName", label: "Last Name", type: "text", required: false },
    ];

    return (
        <div className="page-wrapper">
            <h1>Signup</h1>
            <Form
                onSubmit={handleSignup}
                fields={signupFields}
                buttonName="Créer un compte"
                schema={SignupFormSchema}
            />
        </div>
    );
};

export default Signup;

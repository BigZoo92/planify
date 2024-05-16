// Dependencies
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/Form";
import { SignupFormSchema, signup } from "../../../utils/queries";

// Assets
import ElementGraphique from "../../../assets/images/login/login-element--principal__2.svg";

// Styles
import styles from "./Signup.module.scss";

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
            navigate("/accueil");
        } catch (error) {
            console.error("Erreur lors de l'inscription : ", error);
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
        <main className={styles.signupWrapper}>
            <img src={ElementGraphique} alt="ElementGraphique" />
            <h1>Signup</h1>
            <Form
                onSubmit={handleSignup}
                fields={signupFields}
                buttonName="Créer un compte"
                schema={SignupFormSchema}
            />
        </main>
    );
};

export default Signup;

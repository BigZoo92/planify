// React
import React from "react";
import { useNavigate, Link } from "react-router-dom";

// Components
import { Form } from "../../../components/Form";

// Utils
import { SignupFormSchema, signup } from "../../../utils/queries";

// Assets
import ElementGraphique from "../../../assets/images/login/login-element--principal__2.svg";

// Styles
import styles from "./Signup.module.scss";
import { useUser } from "../../../providers";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const {fetchUser} = useUser()

    const handleSignup = async (formData: {
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
    }) => {
        try {
            await signup(formData);
            await fetchUser()
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de l'inscription : ", error);
        }
    };

    const signupFields: {
        name: keyof typeof SignupFormSchema._type;
        label: string;
        type: string;
        required: boolean;
        placeholder?: string;
    }[] = [
        {
            name: "email",
            label: "Email",
            type: "email",
            required: true,
            placeholder: "johndoe@gmail.com",
        },
        {
            name: "password",
            label: "Mot de passe",
            type: "password",
            required: true,
        },
        {
            name: "firstName",
            label: "Prénom",
            type: "text",
            required: true,
            placeholder: "John",
        },
        {
            name: "lastName",
            label: "Nom",
            type: "text",
            required: true,
            placeholder: "Doe",
        },
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
            <Link to="/login" className="link">
                Déjà un compte ? <strong>Connectez-vous</strong>
            </Link>
        </main>
    );
};

export default Signup;

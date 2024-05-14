import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/Form";
import "./Login.scss";
import ElementGraphique from "../../../assets/images/login/login-element--principal__2.svg";
import { LoginSchema, login } from "../../../utils/queries";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData: {
        email: string;
        password: string;
    }) => {
        try {
            await login(formData);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const loginFields: {
        name: keyof typeof LoginSchema._type;
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
    ];

    return (
        <div className="login-wrapper">
            <h1>Login</h1>
            <img src={ElementGraphique} alt="ElementGraphique" />
            <Form
                onSubmit={handleLogin}
                fields={loginFields}
                buttonName="Se connecter"
                schema={LoginSchema}
            />
        </div>
    );
};

export default Login;

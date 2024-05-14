import React from "react";
import { Form } from "../../../components/Form";
import "./Login.scss";
import ElementGraphique from "../../../assets/images/login/login-element--principal__2.svg";

const Login: React.FC = () => {
    const handleLogin = (formData: any) => {
        console.log("Login data:", formData);
    };

    const loginFields = [
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
            />
        </div>
    );
};

export default Login;

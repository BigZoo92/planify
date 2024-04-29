import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

import loginElement from "../../assets/images/login/login-element--principal.svg";
import "./LoginHome.scss";

const LoginHome: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="login-wrapper">
            <img src={loginElement} alt="loginElement" />
            <h1>Débutez votre aventure</h1>
            <div className="btn-wrapper">
                <Button variant="main" onClick={() => navigate("/signup")}>
                    Se connecter
                </Button>
                <Button variant="secondary">Créez un compte</Button>
            </div>
        </div>
    );
};

export default LoginHome;

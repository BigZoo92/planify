import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import loginElement from "../../assets/images/login/login-element--principal.svg";
import styles from "./Auth.module.scss";

const Auth: React.FC = () => {
    const navigate = useNavigate();
    return (
        <main className={styles.authWrapper}>
            <img src={loginElement} alt="loginElement" />
            <div className={styles.authContent}>
                <h1>Débutez votre aventure</h1>
                <span>Organisez votre temps comme vous le souhaitez !</span>
                <div className={styles.btnWrapper}>
                    <Button
                        variant={["main", "full"]}
                        onClick={() => navigate("/login")}
                    >
                        Se connecter
                    </Button>
                    <Button
                        variant={["secondary", "full"]}
                        onClick={() => navigate("/signup")}
                    >
                        Créez un compte
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Auth;

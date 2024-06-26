import { useNavigate, Link } from "react-router-dom";
import { Form } from "../../../components/Form";
import ElementGraphique from "../../../assets/images/login/login-element--principal__2.svg";
import { LoginSchema, login } from "../../../utils/queries";

// Styles
import styles from "./Login.module.scss";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData: {
        email: string;
        password: string;
    }) => {
        try {
            await login(formData);
            navigate("/accueil");
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
        }
    };

    const loginFields: {
        name: keyof typeof LoginSchema._type;
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
            placeholder: "Entrez votre email",
        },
        {
            name: "password",
            label: "Mot de passe",
            type: "password",
            required: true,
            placeholder: "Entrez votre mot de passe",
        },
    ];

    return (
        <main className={styles.loginWrapper}>
            <img src={ElementGraphique} alt="ElementGraphique" />
            <h1>Welcome back !</h1>
            <Form
                onSubmit={handleLogin}
                fields={loginFields}
                buttonName="Se connecter"
                schema={LoginSchema}
            />
            <Link to="/signup" className="link">
                Pas encore de compte ? <strong>Inscrivez-vous</strong>
            </Link>
        </main>
    );
};

export default Login;

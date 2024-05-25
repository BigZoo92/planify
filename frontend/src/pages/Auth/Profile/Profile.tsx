import { memo, useState, useCallback } from "react";
import { useUser } from "../../../providers/UserProvider";
import ImageUser from "../../../assets/images/users-image/placeholder.png";
import {
    Pencil,
    Moon,
    Lock,
    FileText,
    Shield,
    SignOut,
    Calendar,
    Translate,
    Bell,
} from "@phosphor-icons/react";
import { Switch } from "../../../components/Switch";
import ProfileItem from "./ProfileItem";
import styles from "./Profile.module.scss";

const Profile: React.FC = memo(function Profile() {
    const { user } = useUser();
    const [darkMode, setDarkMode] = useState(false);

    const handleToggle = useCallback(() => {
        setDarkMode((prevMode) => !prevMode);
    }, []);

    if (!user) {
        return null;
    }

    return (
        <main className={styles.profileWrapper}>
            <div className={styles.oval}>
                <img src={ImageUser} alt="Utilisateur" />
            </div>
            <header className={styles.profileHeader}>
                <h1>
                    {user.firstName} {user.lastName}
                </h1>
                <span>{user.email}</span>
            </header>
            <div className={styles.profileContent}>
                <h2>Paramètres du compte</h2>
                <ProfileItem
                    icon={<Calendar size={16} weight="bold" />}
                    text="Mes agendas"
                />
                <ProfileItem
                    icon={<Pencil size={16} weight="bold" />}
                    text="Modifier mon profil"
                />
                <ProfileItem
                    icon={<Lock size={16} weight="bold" />}
                    text="Changer le mot de passe"
                />
                <h2>Paramètres de l'appli</h2>
                <ProfileItem
                    icon={<Moon size={16} weight="bold" />}
                    text="Apparence"
                    action={
                        <Switch isOn={darkMode} handleToggle={handleToggle} />
                    }
                />
                <ProfileItem
                    icon={<Translate size={16} weight="bold" />}
                    text="Langue"
                />
                <ProfileItem
                    icon={<Bell size={16} weight="bold" />}
                    text="Notifications"
                />
                <h2>Assistance</h2>
                <ProfileItem
                    icon={<FileText size={16} weight="bold" />}
                    text="Termes et conditions"
                />
                <ProfileItem
                    icon={<Shield size={16} weight="bold" />}
                    text="Politique de confidentialité"
                />
                <hr />
                <ProfileItem
                    icon={<SignOut size={16} weight="bold" />}
                    text="Déconnexion"
                />
            </div>
        </main>
    );
});

export default Profile;

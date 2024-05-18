import React, { memo, useState, useCallback } from "react";
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
                <ProfileItem
                    icon={<Calendar size={16} weight="bold" />}
                    text="Mes agendas"
                />
                <ProfileItem
                    icon={<Pencil size={16} weight="bold" />}
                    text="Modifier les données du profil"
                />
                <ProfileItem
                    icon={<Moon size={16} weight="bold" />}
                    text="Dark mode"
                    action={
                        <Switch isOn={darkMode} handleToggle={handleToggle} />
                    }
                />
                <ProfileItem
                    icon={<Lock size={16} weight="bold" />}
                    text="Changer le mot de passe"
                />
                <ProfileItem
                    icon={<FileText size={16} weight="bold" />}
                    text="Termes et conditions"
                />
                <ProfileItem
                    icon={<Shield size={16} weight="bold" />}
                    text="Politique de confidentialité"
                />
                <ProfileItem
                    icon={<SignOut size={16} weight="bold" />}
                    text="Déconnexion"
                />
            </div>
        </main>
    );
});

export default Profile;

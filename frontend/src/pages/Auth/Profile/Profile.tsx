// Dependencies
import React, { memo } from "react";

// Utils
import { useUser } from "../../../providers/UserProvider";

// Assets
import ImageUser from "../../../assets/images/users-image/placeholder.png";

// Styles
import styles from "./Profile.module.scss";

interface User {
    id?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    urls?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserProfileProps {
    user: User;
    title: string;
}

const ProfileSection: React.FC<UserProfileProps> = memo(
    function ProfileSection({ title, user }) {
        return (
            <section>
                <h2>{title}</h2>
                <div className={styles.profileInfo}>
                    <p>
                        <strong>Prénom:</strong> {user.firstName}
                    </p>
                    <p>
                        <strong>Nom:</strong> {user.lastName}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
            </section>
        );
    }
);

const Profile: React.FC = memo(function Profile() {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    return (
        <main className={styles.profileWrapper}>
            <div className={styles.oval}>
                <img src={ImageUser} alt="User" />
            </div>
            <header className={styles.profileHeader}>
                <h1>
                    {user.firstName} {user.lastName}
                </h1>
                <span>{user.email}</span>
            </header>
            <div className={styles.profileContent}>
                <ProfileSection title="Informations" user={user} />
                <ProfileSection title="Préférences" user={user} />
                <ProfileSection title="Paramètres" user={user} />
            </div>
        </main>
    );
});

export default Profile;

import React from "react";
import { useUser } from "../../../providers/UserProvider";
import { ArrowLeft } from "@phosphor-icons/react";
import styles from "./Profile.module.scss";

const Profile: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    return (
        <main className={styles.profileWrapper}>
            <div className={styles.profileHeader}>
                <h1>Bonjour, {user.firstName} 👋</h1>
            </div>
        </main>
    );
};

export default Profile;

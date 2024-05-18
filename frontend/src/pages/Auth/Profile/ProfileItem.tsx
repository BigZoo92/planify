import React from "react";
import { CaretRight } from "@phosphor-icons/react";

// Styles
import styles from "./Profile.module.scss";

interface ProfileItemProps {
    icon: React.ReactNode;
    text: string;
    action?: React.ReactNode;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, text, action }) => {
    return (
        <div className={styles.profileItems}>
            <div className={styles.profileItemsContent}>
                {icon}
                <span>{text}</span>
            </div>
            {action ? action : <CaretRight size={16} weight="bold" />}
        </div>
    );
};

export default ProfileItem;

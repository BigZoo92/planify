import { CaretRight } from "@phosphor-icons/react";

// Styles
import styles from "./Profile.module.scss";

interface ProfileItemProps {
    icon: React.ReactNode;
    text: string;
    action?: React.ReactNode;
    onClick?: (event: Event) => Promise<void>
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, text, action, onClick }) => {
    return (
        //@ts-ignore
        <div className={styles.profileItems} onClick={onClick && onClick}>
            <div className={styles.profileItemsContent}>
                {icon}
                <span>{text}</span>
            </div>
            {action ? action : <CaretRight size={16} weight="bold" />}
        </div>
    );
};

export default ProfileItem;

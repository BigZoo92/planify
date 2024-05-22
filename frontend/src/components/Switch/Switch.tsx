import styles from "./Switch.module.scss";

interface SwitchProps {
    isOn: boolean;
    handleToggle: () => void;
}

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle }) => {
    return (
        <div className={styles.switchContainer}>
            <input
                checked={isOn}
                onChange={handleToggle}
                className={styles.switchCheckbox}
                id={`react-switch-new`}
                type="checkbox"
            />
            <label className={styles.switchLabel} htmlFor={`react-switch-new`}>
                <span className={styles.switchButton} />
            </label>
        </div>
    );
};

export default Switch;

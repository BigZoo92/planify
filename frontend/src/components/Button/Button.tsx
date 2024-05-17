import React from "react";
import "./Button.scss";

interface ButtonProps {
    children: React.ReactNode;
    variant: ("main" | "secondary" | "full")[];
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick }) => {
    return (
        <button className={`btn ${variant.join(" ")}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

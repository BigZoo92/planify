import React from 'react';
import './_Button.scss';

interface ButtonProps {
    children: React.ReactNode;
    variant: 'main' | 'secondary';
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick }) => {
    return (
        <button className={`btn ${variant}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
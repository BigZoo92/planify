import React from 'react';
import './_Login.scss';
import ElementGraphique from '../../../assets/images/login/login-element--principal__2.svg';


const Login: React.FC = () => {
    return (
        <div className="login">
            <h1>Login</h1>
            <img src={ElementGraphique} alt='ElementGraphique' />
        </div>
    );
};

export default Login;
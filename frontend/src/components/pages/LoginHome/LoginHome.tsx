import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../custom/Button/Button';

import ElementGraphique from '../../../assets/images/login/login-element--principal.svg';
import './_LoginHome.scss';
import SearchBar from '../../custom/Searchbar/SearchBar';

const LoginHome: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="login-wrapper">
            <img src={ElementGraphique} alt='ElementGraphique' />
            <h1>Débutez votre aventure</h1>
            <SearchBar />
            <div className="btn-wrapper">
                <Button variant="main" onClick={() => navigate('/login')}>
                    Se connecter
                </Button>
                <Button variant="secondary">
                    Créez un compte
                </Button>
            </div>
        </div>
    );
}

export default LoginHome;
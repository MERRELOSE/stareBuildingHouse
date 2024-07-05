import React from "react";
import { Link } from "react-router-dom";
import './header.css';
import logo from './components/Logo.png';


const Header = ({ onSignupClick, onLoginClick }) => {
    const handleGetStartedClick = () => {
        // Vérifiez si l'utilisateur n'est pas connecté (vous aurez besoin d'une méthode pour vérifier cela)
        const isLoggedIn = false; // Remplacez ceci par votre logique pour vérifier si l'utilisateur est connecté
    
        if (!isLoggedIn) {
          setIsLoginOpen(true); // Affichez la modal
        } else {
          // Gérez la navigation ou toute autre action si l'utilisateur est déjà connecté
        }
      };
    return(
        <header className="header-container">
            <div className= "der-container">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="menu" >
                    <nav>
                        <ul>
                            <Link to="/"><li>Accueil</li></Link>
                            {/* Autres éléments de menu */}
                            <Link onClick={onSignupClick} to="/Signup"><li>S'inscrire</li></Link>
                            <Link onClick={onLoginClick} to="/Login"><li>Se connecter</li></Link>
                            <Link onClick={handleGetStartedClick} to="/devis"><li>Commencer un projet</li></Link>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    );
};
export default Header;
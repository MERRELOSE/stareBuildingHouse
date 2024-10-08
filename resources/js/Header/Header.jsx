import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import logo from '../components/assets/Logo.png';
import { useAuth } from '../AuthContext/AuthContext.jsx';

const Header = ({ user }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Fonction pour afficher la boîte modale de confirmation
    const handleStartProjectClick = (e) => {
        e.preventDefault();
        if (user) {
            setShowConfirmation(true); // Afficher la modale de confirmation
        } else {
            navigate('/login', { state: { message: 'Merci de bien vouloir vous connecter avant de continuer.' } });
        }
    };

    // Fonction pour confirmer le début du devis
    const handleConfirm = () => {
        setShowConfirmation(false); // Fermer la modale
        navigate('/devis'); // Rediriger vers la page du devis
    };

    // Fonction pour annuler l'action
    const handleCancel = () => {
        setShowConfirmation(false); // Fermer la modale
    };

    const handleLogout = () => {
        confirmAlert({
            title: 'Confirmation de déconnexion',
            message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
            buttons: [
                {
                    label: 'Confirmer',
                    onClick: () => {
                        logout(); // Appelle la fonction de déconnexion
                    }
                },
                {
                    label: 'Annuler',
                    onClick: () => {}
                }
            ]
        });
    };

    const handleHome = () => {
        navigate ("/");
    }


    return (
        <header className="header-container">
            <div className="der-container">
                <div className="logo">
                    <img onClick={handleHome} src={logo} alt="Logo" />
                    <p onClick={handleHome}> Estimate</p>
                </div>
                <div className="menu">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/"><center><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M20 10a1 1 0 1 0-2 0zM6 10a1 1 0 0 0-2 0zm14.293 2.707a1 1 0 0 0 1.414-1.414zM12 3l.707-.707a1 1 0 0 0-1.414 0zm-9.707 8.293a1 1 0 1 0 1.414 1.414zM7 22h10v-2H7zm13-3v-9h-2v9zM6 19v-9H4v9zm15.707-7.707l-9-9l-1.414 1.414l9 9zm-10.414-9l-9 9l1.414 1.414l9-9zM17 22a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1zM7 20a1 1 0 0 1-1-1H4a3 3 0 0 0 3 3z"></path></svg></center><li>Accueil</li></Link>
                            </li>
                            <li>
                                <Link to="/" onClick={handleStartProjectClick}><center><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><g fill="none"><path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.95 16.264s-1.703 2.54-.707 3.535c.995.996 3.535-.707 3.535-.707"></path><path fill="white" fillRule="evenodd" d="M20.506 3.536a1 1 0 0 1 .268.928l-.317 1.402a9 9 0 0 1-2.414 4.375l-4.644 4.644c1.027 1.272 1.36 2.48 1.1 3.632c-.271 1.2-1.16 2.086-1.712 2.637l-.06.06a1 1 0 0 1-1.564-.193L9.17 17.696a1 1 0 0 0-.15-.192l-2.57-2.568l-.76-.456l3.459-3.843a.343.343 0 0 0 .007.005L13.8 6a9 9 0 0 1 4.376-2.414l1.402-.318a1 1 0 0 1 .928.269zM8.322 10.062c-.969-.565-1.9-.722-2.797-.52c-1.2.272-2.086 1.16-2.637 1.713l-.06.059a1 1 0 0 0 .193 1.564l1.796 1.078z" clipRule="evenodd"></path></g></svg></center><li>Commencer un projet</li></Link>
                            </li>
                            {user ? (
                                <>
                                    <li>
                                        <Link to="/profil"><center><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg></center><li>Profil</li></Link>
                                    </li>
                                    <li>
                                        <Link to="" onClick={handleLogout}><center><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m5-6l5-4l-5-4v3H9v2h8z"></path></svg></center><li>Se déconnecter</li></Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/Signup"><center><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"></path></svg></center><li>S'inscrire</li></Link>
                                    </li>
                                    <li>
                                        <Link to="/Login"><center><svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24"><path fill="white" d="M10 11H2.048c.502-5.053 4.765-9 9.95-9c5.523 0 10 4.477 10 10s-4.477 10-10 10c-5.185 0-9.448-3.947-9.95-9h7.95v3l5-4l-5-4z"></path></svg></center><li>Se connecter</li></Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Afficher la boîte modale si showConfirmation est true */}
            {showConfirmation && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Avant de commencer votre devis, assurez-vous d'avoir les informations suivantes :</p>
                        <ul>
                            <li>Dimensions exactes de votre maison (surface totale, nombre d'étages, etc.).</li>
                            <li>Type de matériaux que vous souhaitez utiliser (murs, toit, fondations).</li>
                            <li>Une estimation de votre budget pour mieux ajuster vos choix.</li>
                            <li>Les détails de votre terrain (localisation, type de terrain).</li>
                            <li>Le nombre de pièces et la configuration (chambres, salles de bain, etc.).</li>
                            <li>Le type de toit (tôle, tuiles, etc.).</li>
                            <li>Des options supplémentaires comme une terrasse, un garage, etc.</li>
                        </ul>
                        <p>Êtes-vous prêt à commencer ?</p>
                        <button onClick={handleConfirm}>Oui, continuer</button>
                        <button onClick={handleCancel}>Annuler</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

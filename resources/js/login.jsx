// Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import './login.css';


const Login = ({ onSignupClick }) => {
    const navigate = useNavigate();
    const handleLoginClick = (e) => {
        // Gestion de la connexion
        e.preventDefault();
        navigate ('/devis');
    };

  return (
    <div>
    <Header onSignupClick={onSignupClick} onLoginClick={handleLoginClick} />
    <center>
        <main className='centre'>
            <form className='ctanext' onSubmit={handleLoginClick} >
                <div className="header">
                    <div className="texts"><h2>Connexion</h2></div>
                    <div className="underline"></div>
                </div>
                <div className="cta">
                    <div className="input">
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"></path></svg>
                        <input type="email" name="email" className="text" placeholder='Email' required />
                    </div>

                    <div className="input">
                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                        <input type="password" name="password" className="text" placeholder='Password' required />
                    </div>
                </div>
                <div className="forgot-password">Mot de passe oublié? <Link className='lin'>Clique ici !</Link></div>
                <p>Vous n'avez pas de compte ? <Link onClick={onSignupClick} to= "/signup" className='inscription'>S'inscrire</Link></p>
                <div className="submit_container">
                    <button type="submits" className= "submits" >Se connecter</button>
                </div>
            </form>
            </main>
    </center>
        <Footer/>
    </div>
  );
};

export default Login;











































/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import Header from './header';

const Login = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Connexion");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (action === "Inscription") {
            try {
                const response = await axios.get('http://localhost:8000/api/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword
                });
                if (response.status === 201) {
                    alert('User registered successfully');
                    setAction("Connexion");
                }
            } catch (error) {
                if (error.response) {
                    // Erreur avec une réponse du serveur
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    // Erreur sans réponse du serveur (erreur réseau, etc.)
                    alert('An error occurred. Please try again.');
                }
                console.error(error);
            }
        } else {
            // Logique pour la connexion
            navigate('/devis');
        }
    };
    
    return (
        <div>
            <Header />
            <center>
                <div className="container" style={{ backgroundColor: '#ddd', textAlign: 'center', alignItems: "center", borderRadius: '38px', width: '400px', height: '500px', display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="header">
                            <div className="texts">{action}</div>
                            <div className="underline"></div>
                        </div>
                        <div className="inputs">
                            {action === "Connexion" ? null : (
                                <div className="input">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>
                                    <input type="text" name="name" className="text" placeholder="Name" value={formData.name} onChange={handleChange} required />
                                </div>
                            )}

                            <div className="input">
                                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"></path></svg>
                                <input type="email" name="email" className="text" placeholder='Email' value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="input">
                                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                                <input type="password" name="password" className="text" placeholder='Password' value={formData.password} onChange={handleChange} required />
                            </div>
                            {action === "Connexion" ? null : (
                                <div className="input">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                                    <input type="password" name="confirmPassword" className="text" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required />
                                </div>
                            )}
                        </div>
                        {action === "Inscription" ? null : (
                            <div className="forgot-password">Mot de passe oublié? <Link className='link'>Clique ici !</Link></div>
                        )}

                        <div className="submit_container">
                            <button type="submit" className={action === "Connexion" ? "submit gray" : "submit"} onClick={() => setAction("Inscription")}>S'inscrire</button>
                            <button type="submit" className={action === "Inscription" ? "submit gray" : "submit"} onClick={() => setAction("Connexion")}>Se connecter</button>
                        </div>
                    </form>
                </div>
            </center>
            <footer>
                <p>&copy; 2024 - Application de Devis pour la Construction d'une Maison. Tous droits réservés.</p>
            </footer>
        </div>
    );
}

export default Login;*/

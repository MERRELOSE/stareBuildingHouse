import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import Header from './header';
import Footer from './footer';

const Signup = ({ onLoginClick }) => {
  const handleSignupClick = () => {
    // Gestion de la connexion
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigue = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    navigue = ('/login')
    // Ajoutez ici votre logique de soumission du formulaire
  };

  return (
    <div>
      <Header onSignupClick={handleSignupClick} onLoginClick={onLoginClick} />
      <center>
      <main>
        <form  className='next' onSubmit={handleSubmit} onChange={handleChange}>
            <div className="header">
              <div className="texts"><h2>Inscription</h2></div>
              <div className="underline"></div>
            </div>
            <div className='cta'>
            <div className="input">
              <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>
              <input type="text" name="name" className="text" placeholder="Username" required />
            </div>
              <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"></path></svg>
                <input type="email" name="email" className="text" placeholder="Email" required />
              </div>
              <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                <input type="password" name="password" className="text" placeholder="Password" required />
              </div>
              <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                <input type="password" name="confirmPassword" className="text" placeholder="Confirm Password"  required />
              </div>
            </div>
           
            <p>Vous avez déjà un compte ? <Link onClick={onLoginClick} to='/login' className='connexion'>Se connecter</Link></p>
            <div className="submit_container">
              <button type="submit" className="submit" >S'inscrire</button>
            </div>
        </form>
      </main>
      </center>
      <Footer/>
    </div>
  );
};

export default Signup;

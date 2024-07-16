import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import './login.css';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate input fields
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error('Failed to log in.');
      }
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Login successful!');
        navigate('/devis');
      } else {
        setError(data.message || 'Invalid login credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    }
  };


  return (
    <div>
      <Header />
      <center>
        <main className="centre">
          <form className="ctanext" onSubmit={handleSubmit}>
            <div className="header">
              <div className="texts"><h2>Connexion</h2></div>
              <div className="underline"></div>
            </div>
            <div className="cta">
              <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"></path></svg>
                <input type="email" name="email" className="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                <input type="password" name="password" className="text" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}

            <div className="forgot-password">Mot de passe oublié? <Link className='lin'>Clique ici !</Link></div>
            <p>Vous n'avez pas de compte ? <Link to="/signup" className='inscription'>S'inscrire</Link></p>
            <div className="submit_container">
              <button className='submits' type="submit">Se connecter</button>
            </div>
          </form>
        </main>
      </center>
      <Footer />
    </div>
  );
};

export default Login;

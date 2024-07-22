import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './login.css';


const Login = ({setUser}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Ajout de l'état isLoading
  const location = useLocation();



  // Récupérer le token CSRF
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Logique de soumission du formulaire
    setIsLoading(true); // Définir isLoading à true au début de la soumission du formulaire

    // Validate input fields
    if (!email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs obligatoires.');
      setIsLoading(false); // Remettre isLoading à false en cas d'erreur
      return;
    }

  // Afficher les données pour vérifier
  console.log({
  email,
  password,
  })

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken // Utilisation du token CSRF récupéré
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        console.log('Connexion réussie !');
        localStorage.setItem('accessToken', data.access_token);
        // Optionnel : Gérer le profil utilisateur côté client si nécessaire
        setUser(data.user); // Stocker les détails de l'utilisateur dans l'état si nécessaire
        navigate('/');
      } else {
        // Handle authentication errors
        if (response.status === 401) {
          setError('Identifiants de connexion invalides.');
        } else {
          setError(data.message || 'Erreur lors de la connexion.');
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Une erreur inattendue s\'est produite.');
    } finally {
      setIsLoading(false); // Remettre isLoading à false après la soumission du formulaire
    }
  };

  return (
    <div>
      <center>
        <main className="centre"><br />
        {location.state && location.state.message && 
          (
            <div className="alert-warning">{location.state.message}</div>
          )
        }
        {error && <div className="alert-danger">{error}</div>}
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
              <button className='submits' type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Se connecter'} </button>
            </div>
          </form>
        </main>
      </center>
    </div>
  );
};

export default Login;

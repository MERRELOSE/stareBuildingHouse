import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';
import Header from './header';
import Footer from './footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password, confirmPassword } = formData;
  
    // Client-side validation
    const formErrors = {};
    if (!name.trim()) {
      formErrors.name = 'Le nom est obligatoire.';
    }
    if (!email.trim()) {
      formErrors.email = 'L\'adresse électronique est obligatoire.';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Format d\'email non valide.';
    }
    if (!password.trim()) {
      formErrors.password = 'Le mot de passe est requis.';
    } else if (password.length < 8) {
      formErrors.password = 'Le mot de passe doit comporter au moins 8 caractères.';
    }
    if (!confirmPassword.trim()) {
      formErrors.confirmPassword = 'La confirmation du mot de passe est requise.';
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    // Send signup data to the server
    setIsLoading(true);


    // Afficher les données pour vérifier
  console.log({
    name,
    email,
    password,
    confirmPassword
  })

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            name,
            email,
            password,
            password_confirmation: confirmPassword // Assurez-vous que ce nom est correct
        }),
    });
  
      const data = await response.json();
  
      if (response.ok) {
        // Signup successful
        console.log('Inscription réussie !');
        navigate('/login');
      } else {
        // Signup error from server
        if (data.errors) {
          // Handle specific errors
          if (data.errors.email) {
            setErrors({ email: 'Email déjà pris.' });
          }
          if (data.errors.password_confirmation) {
            setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas.' });
          }
        } else {
          // Generic error
          setErrors({ message: 'L\'inscription a échoué. Veuillez réessayer.' });
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Handle specific errors from server response
      if (error instanceof SyntaxError) {
          setErrors({ message: 'Réponse inattendue du serveur. Veuillez réessayer plus tard.' });
      } else {
          setErrors({ message: 'L\'inscription a échoué. Veuillez réessayer.' });
      }
  } finally {
      setIsLoading(false);
  }
  };
  return (
    <div>
      <Header />
      <center>
        <main>
          <form className={`next ${errors.length > 0 ? 'next-error' : ''}`}   method="POST" onSubmit={handleSubmit} >
            <div className="header">
              <div className="texts">
                <h2>Signup</h2>
              </div>
              <div className="underline"></div>
            </div>
            <div className="cta">
              <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"></path></svg>
                <input type="text" name="name" className="text" placeholder="Username"  value={formData.name} onChange={handleChange} />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div>
                <div className="input">
                  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"></path></svg>
                  <input type="email" name="email" className="text" placeholder="Email" autoComplete="email" value={formData.email} onChange={handleChange} />
                </div>
                {errors.email && <p className="error">{errors.email}</p>}
              </div> 
              <div>
                <div className="input">
                  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"> <path fill="black" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                  <input type="password" name="password" className="text" placeholder="Password" autoComplete="new-password" value={formData.password} onChange={handleChange} />
                  
                </div>
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div>
              <div className="input">
                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 24 24"><path fill="black" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"></path></svg>
                <input type="password" name="confirmPassword" className="text" placeholder="Confirm Password" autoComplete="new-password" value={formData.confirmPassword} onChange={handleChange} /> 
              </div>
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              </div>
              
              {errors.apiError && <p className="error">{errors.apiError}</p>}
            </div>
              <p>Already have an account? <Link to="/login" className="connexion">Sign In</Link></p>
              <div className="submit_container">
              <button className="submitss" type="submit"  disabled={isLoading}>{isLoading ? 'Loading...' : 'S\'inscrire'} </button>
            </div>
          </form>
        </main>
      </center>
      <Footer />
    </div>
  );
};

export default Signup;

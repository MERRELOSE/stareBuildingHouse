// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        // Implémentez la logique de connexion ici
        // Par exemple, une requête API pour vérifier les identifiants et récupérer l'utilisateur
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(true);
            setUser(data.user);
        } else {
            throw new Error('Login failed');
        }
    };
    const navigate = useNavigate();
    const logout = () => {
        setIsAuthenticated(false); // Déconnecte l'utilisateur
        setUser(null); // Réinitialise les données utilisateur
        navigate('/login'); // Redirige vers la page de connexion
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

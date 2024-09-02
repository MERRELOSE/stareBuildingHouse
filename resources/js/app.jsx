import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import Signup from './Signup';
import Footer from './Footer';
import ProfilePage from './ProfilePage';
import Devis from './Devis';

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <AuthProvider>
            <Router>
                <Header user={user} />
                <div>
                    <Routes>
                        <Route path="/" element={<Home user={user} />} />
                        <Route path="/login" element={<Login setUser={setUser} />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/devis/*" element={<Devis />} /> {/* Gestion des étapes du devis */}
                    </Routes>
                </div>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

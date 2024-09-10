import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext/AuthContext.jsx';
import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';
import Header from './Header/Header.jsx';
import Signup from './Signup/Signup.jsx';
import Footer from './Footer/Footer.jsx';
import ProfilePage from './Profile/ProfilePage.jsx';
import Devis from './SwitchFile/Devis.jsx';

const App = () => {
    const [user, setUser] = useState(null);

    return (
            <Router>
                <AuthProvider>
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
                </AuthProvider>
                
            </Router>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

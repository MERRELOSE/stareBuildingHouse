import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Devis from './devis';
import Devis1 from './devis1';
import Devis2 from './devis2';
import Devis3 from './devis3';
import Devis4 from './devis4';
import Header from './header';
import Signup from './signup';
import Footer from './footer';
import ProfilePage from './ProfilePage';
import { AuthProvider } from './AuthContext';

console.log("Le composant App s'est bien chargé");
const App = () => {
    const [user, setUser] = useState(null);


    console.log("Le composant App est en cours de rendu");
    return (

    <AuthProvider>
        <Router>
            <Header user={user} />
            <div>
                <Routes>
                    <Route path="/" element={<Home  user={user} />} />
                    <Route path="/header" element={<Header />} />
                    <Route path="/login" element={<Login  setUser={setUser} />} />
                    <Route path="/ProfilePage" element={<ProfilePage />} />
                    <Route path="/devis" element={<Devis />} />
                    <Route path="/devis1" element={<Devis1 />} />
                    <Route path="/devis2" element={<Devis2 />} />
                    <Route path="/devis3" element={<Devis3 />} />
                    <Route path="/devis4" element={<Devis4 />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/footer" element={<Footer />} />
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
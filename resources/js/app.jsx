import React from 'react';
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

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/header" element={<Header />} />
                <Route path="/login" element={<Login />} />
                <Route path="/devis" element={<Devis />} />
                <Route path="/devis1" element={<Devis1 />} />
                <Route path="/devis2" element={<Devis2 />} />
                <Route path="/devis3" element={<Devis3 />} />
                <Route path="/devis4" element={<Devis4 />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/footer" element={<Footer />} />
            </Routes>
        </Router>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
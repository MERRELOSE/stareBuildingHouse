// devis.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header'
import Footer from './footer'
import './devis4.css'


const Devis = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate ('/devis5');
    };
    return (
        <div>
            <Header />
            <center>
                <main>
                    <h4>Etape:5 sur 6:</h4>
                    <form className='formdevis4' onSubmit={handleSubmit}>
                            <div className=''>
                                 <h4 >Informations supplémentaires (facultaif)</h4>
                            </div>
                        <textarea name="" id="" minLength={10} maxLength={500} placeholder='Plus votre projet est détaillé, plus votre dévis sera précis. Décrivez précisément votre projet, par exemple: Quelle est la surperficie habitable de votre terrain? Combien de pièces au total? Précisez avec précision toutes les dimensions si possible...' className='textarea4' />
                        <div className='daddybtncta'>
                            <button type="submit" name='précédent' className='btncta1' >Précédent</button>
                            <button type="submit" name='suivant' to ='./devis1' className='btncta2' >Suivant</button>
                        </div>
                    </form>
                </main>
            </center>
            <Footer/>
        </div> 
    );
};

export default Devis;

// devis.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './devis.css'


const Devis = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate ('/devis1');
    };
    const handleClick = (e) => {
        e.preventDefault();
        alert("Vous serai rediriger vers la page accueil");
        navigate ('/home');
    };
    return (
        <div>
            <center>
                <main>
                    <h1>Page Devis</h1>
                    <h4>Etape1 sur 6:</h4>
                    <form className='formdevis1' onSubmit={handleSubmit}>
                        <h4>Quelle est la nature de votre projet ?</h4><br />
                        <div className='daddykey'>
                            <div className='key'>
                                {/*icône svg*/}
                                <input type="radio" name="" id="" />
                                <label htmlFor="">Livré clé en main</label>
                            </div>
                            <div className='key'>
                                 {/*icône svg*/}
                                 <input type="radio" name="" id="" />
                                 <label htmlFor="">Livré hors eau hors air</label>
                            </div>
                            <div className='key'>
                                 {/*icône svg*/}
                                 <input type="radio" name="" id="" />
                                 <label htmlFor="">Gros oeuvre uniquement</label>
                            </div>
                            <div className='key'>
                                 {/*icône svg*/}
  
                                 <label htmlFor="">Autres</label>
                            </div>
                        </div><br />
                        <textarea name="" id="" minLength={10} maxLength={100} placeholder='Précisez la nature de votre projet ...' className='textarea' />
                        <div className='daddybtncta' >
                            <button type="submit" name='annuler' className='btncta1'onClick={handleClick}>Annuler</button>
                            <button type="submit" name='suivant' to ='./devis1' className='btncta2' >Suivant</button>
                        </div>
                    </form>
                </main>
            </center>
        </div> 
    );
};

export default Devis;

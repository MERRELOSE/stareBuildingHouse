// devis.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './devis2.css'


const Devis = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate ('/devis3');
    };
    return (
        <div>
            <center>
                <main>
                    <h4>Etape:3 sur 6:</h4>
                    <form className='formdevis2' onSubmit={handleSubmit}>
                        <h4>Combien de pièce souhaitez-vous construire ?</h4>
                        <div className='daddykey2'>
                            <div className='key2'>
                                <label htmlFor="">Entrez une valeur positive ...</label>
                                <input type="number" name="" id="" placeholder='Nombres de pièce' />
                            </div>
                            <h4>Combien d'étage souhaitez-vous construire ?</h4>
                            <div className='key2'>
                                {/*icône svg*/}
                                <label htmlFor="">Entrez une valeur positive ...</label>
                                <input type="integer" name="" id="" minLength={1} maxLength={2} placeholder='Nombres étage...' />
                            </div><br />
                            <div className='radio2'>
                                 <input type="radio" name="" id="" />
                                 <h4 htmlFor="">Maison individuelle plain-pied</h4>
                            </div>
                        </div>
                        <textarea name="" id="" minLength={10} maxLength={100} placeholder='Message (facultaif) ...' className='textarea' />
                        <div className='daddybtncta'>
                            <button type="submit" name='précédent' className='btncta1' >Précédent</button>
                            <button type="submit" name='suivant' to ='./devis1' className='btncta2' >Suivant</button>
                        </div>
                    </form>
                </main>
            </center>
        </div> 
    );
};

export default Devis;

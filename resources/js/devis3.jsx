// devis1.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './devis3.css'



const Devis1 = () => {
    const navigate =useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate ('/devis4');
    };
    return (
        <div>
            <center>
                <main>
                    <h4>Etape:4 sur 6:</h4>
                    <form className='formdevis1' action="" onSubmit={handleSubmit}>
                        <h4>Quel type de construction souhaitez-vous?(facultatif)</h4><br />
                        <div className='daddykey'>
                            <div className='key'>
                                {/*icône svg*/}
                                <input type="radio" name="" id="" />
                                <label htmlFor="">Parping</label>
                            </div>
                            <div className='key'>
                                 {/*icône svg*/}
                                 <input type="radio" name="" id="" />
                                 <label htmlFor="">En brique</label>
                            </div>
                            <div className='key'>
                                 {/*icône svg*/}
                                 <input type="radio" name="" id="" />
                                 <label htmlFor="">Autres</label>
                            </div>
                        </div><br />
                        <textarea name="" id="" minLength={2} maxLength={4} placeholder='Quelle est la surface habitable de votre construction en m² ...?' className='textarea' />
                        <div className='daddybtncta'>
                            <button type="submit" name='précédent' to="/devis" className='btncta1' >Précédent</button>
                            <button type="submit" name='suivant' className='btncta2' >Suivant</button>
                        </div>
                    </form>
                </main>
            </center>
        </div> 
    );
};

export default Devis1;

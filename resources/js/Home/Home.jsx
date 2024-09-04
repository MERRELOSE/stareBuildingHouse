import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Home.css';
import maison from '../components/assets/Constructiondemaison1.jpg';
import plan from '../components/assets/Constructiondemaisonplan.jpg';
import plan1 from '../components/assets/plan1.jpg';
import plan2 from '../components/assets/plan2.jpg';
import plan3 from '../components/assets/plan3.jpg';
import plan4 from '../components/assets/plan4.jpg';
import plan5 from '../components/assets/plan5.jpg';
import plan6 from '../components/assets/plan6.jpg';
import detail from '../components/assets/construction.mp4';


    
    const Home = ({ user }) => {
        const navigate = useNavigate();

        const handleGetStartedClick = (e) => {
            e.preventDefault();
            if ( user ) {
                navigate('/devis');
            } else {
                navigate('/login', { state: { message: 'Merci de bien vouloir vous connecter avant de continuer:)' } });
            }
        };
    return (
            <div className='Home'>
                <main>
                    <section className="hero-section">
                        <div className="hero-content">
                            <h2>{user && <p>Bonjour, {user.name}!</p>}Obtenez des devis précis pour votre projet de maison</h2>
                            <p>Utilisez notre application pour créer des devis personnalisés et détaillés en quelques étapes simples.</p>
                            <Link to="" onClick={handleGetStartedClick} className="cta-button">Commencer Maintenant</Link>
                        </div><br/>
                        <div className="hero">
                            <div className="hero-image">
                                <img src={maison} alt="Construction de maison" />
                            </div>
                            <div className="paragraphe">
                                <h3>Simple et éfficace</h3>
                                <p>Créez facilement des estimations à partir de votre téléphone, tablette ou ordinateur. Copiez les éléments d'un modèle d'estimation précédent ou importez-les depuis votre base de données relative aux postes de dépenses. Une fois terminé, envoyez l'estimation au client pour recuellir sa signature et son approbation en ligne. </p>
                            </div>
                        </div>
                        
                        <div className="hero1">
                            <div className="paragraphe2">
                                <h3>Gestion du profil</h3>
                                <p>Des calculs précis permettent de générer des estimations compétitives. Obtenez plus de contrats grâce à des estimations rapides basées sur ds calculs précis. Une plateforme cloud garantit que vous travaillez toujours avec les derniers documents et vouys permet de collaborer efficacement avec chaque équipe de construction.</p>
                            </div>
                            <div className="hero-image2">
                                <img src={plan} alt="Plan de construction de maison" />
                            </div>
                        </div>
                    </section>
                    <section className="features-section">
                        <h2>Nos Fonctionnalités Principales</h2>
                        <div className="features-list">
                            <div className="feature-item">
                                <h3>Création de Devis Personnalisés</h3>
                                <p>Créez des devis adaptés à vos besoins en spécifiant les dimensions, les pièces et les matériaux.</p>
                            </div>
                            <div className="feature-item">
                                <h3>Gestion de Projets</h3>
                                <p>Gérez tous vos projets de construction en un seul endroit, avec un suivi détaillé des devis.</p>
                            </div>
                            <div className="feature-item">
                                <h3>Sélection de Matériaux</h3>
                                <p>Choisissez parmi une vaste gamme de matériaux de construction et de finitions pour obtenir des devis précis.</p>
                            </div>
                            <div className="feature-item">
                                <h3>Historique et Comparaison</h3>
                                <p>Accédez à l'historique de vos devis et comparez les coûts pour prendre des décisions éclairées.</p>
                            </div>
                        </div>
                    </section>
                    <section className="image-gallery-section">
                        <h2>Galerie d'Images</h2>
                        <div className="image-gallery">
                            <img src= {plan1} alt="Projet de construction 1" />
                            <img src= {plan5} alt="Projet de construction 2" />
                            <img src= {plan3} alt="Projet de construction 3" />
                        </div>
                        <div className="image-gallery">
                            <img src= {plan4} alt="Projet de construction 1" />
                            <img src= {plan2} alt="Projet de construction 2" />
                            <img src={plan6} alt="Projet de construction 3" />
                        </div>
                    </section>
                    <section className="video-section">
                        <h2>Vidéo de Présentation</h2>
                        <div className="video-container">
                            <iframe 
                                width="560" 
                                height="315" 
                                src={detail} 
                                title="Vidéo de Présentation" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe>
                        </div>
                    </section>
                    <section className="testimonials-section">
                        <h2>Témoignages</h2>
                        <div className="testimonials-list">
                            <div className="testimonial-item">
                                <p>"Grâce à cette application, j'ai pu planifier la construction de ma maison de manière efficace et obtenir des devis détaillés rapidement. Hautement recommandé !"</p>
                                <h4>- Kennedy Merrelose</h4>
                            </div>
                            <div className="testimonial-item">
                                <p>"L'interface est intuitive et les fonctionnalités sont exactement ce dont j'avais besoin pour mon projet de rénovation."</p>
                                <h4>- Albéric Abotchi</h4>
                            </div>
                        </div>
                        <div className="testimonials-list">
                            <div className="testimonial-item">
                                <p>"Grâce à cette application, j'ai pu planifier la construction de ma maison de manière efficace et obtenir des devis détaillés rapidement. Hautement recommandé !"</p>
                                <h4>- Régis Savy</h4>
                            </div>
                            <div className="testimonial-item">
                                <p>"L'interface est intuitive et les fonctionnalités sont exactement ce dont j'avais besoin pour mon projet de rénovation."</p>
                                <h4>- Aurick Tamadaho</h4>
                            </div>
                        </div>

                    </section>
                    <section className="how-it-works-section">
                        <h2>Comment ça Marche</h2>
                        <div className="steps-list">
                            <div className="step-item">
                                <h3>1. Créez un Compte</h3>
                                <p>Inscrivez-vous et accédez à toutes les fonctionnalités de notre application.</p>
                            </div>
                            <div className="step-item">
                                <h3>2. Entrez vos Informations</h3>
                                <p>Saisissez les détails de votre projet de construction, y compris les dimensions et les matériaux.</p>
                            </div>
                            <div className="step-item">
                                <h3>3. Obtenez des Devis</h3>
                                <p>Générez des devis précis et détaillés en quelques minutes.</p>
                            </div>
                        </div>
                    </section>
                    <section className="contact-section">
                        <h2>Contactez-nous</h2>
                        <p>Vous avez des questions ou besoin d'aide ? N'hésitez pas à nous contacter.</p>
                        <form className="contact-form">
                            <div className="form-group">
                                <label>Nom:</label>
                                <input type="text" name="name" required />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label>Message:</label>
                                <textarea name="message" required></textarea>
                            </div>
                            <button href="" className="form-button" type="submit">Envoyer</button>
                        </form>
                    </section>
                </main>
            </div>
            
    );
};

export default Home;
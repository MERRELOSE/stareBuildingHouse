import React, { useState } from 'react';
import './ToitureSelector.css'; // Fichier CSS pour le style
import Verre from './components/verre.jpg'
import Ardoise from './components/ardoise.jpg'
import Métal from './components/métal.jpg'
import Etanchéité from './components/étanchéité.jpg'
import Galvanisée from './components/galvanisé.jpg'
import Tuiles from './components/Tuiles.jpg'


// Composant principal pour la sélection de toiture
const ToitureSelector = ({ nextStep, prevStep, updateQuoteData }) => {
    // États pour stocker le type et le matériau de toiture choisis
    const [typeToiture, setTypeToiture] = useState('');
    const [materialToiture, setMaterialToiture] = useState('');

    // Fonction pour gérer la sélection du type de toiture
    const handleTypeSelect = (type) => {
        setTypeToiture(type); // Mettre à jour l'état du type de toiture
        setMaterialToiture(''); // Réinitialiser l'état du matériau lorsque le type de toiture change
    };

    // Fonction pour gérer la sélection du matériau de toiture
    const handleMaterialSelect = (material) => {
        setMaterialToiture(material); // Mettre à jour l'état du matériau de toiture
        updateQuoteData({ typeToiture, materialToiture: material }); // Mettre à jour les données de devis
    };

    // Fonction pour soumettre la sélection et passer à l'étape suivante
    const handleSubmit = () => {
        if (typeToiture && materialToiture) {
            nextStep(); // Passer à l'étape suivante si les sélections sont complètes
        } else {
            alert('Veuillez sélectionner un type de toiture et un matériau.'); // Afficher une alerte si une sélection est manquante
        }
    };

    return (
        <div className="toiture-selector-container">
            <h2>Sélectionnez le type et le matériau de toiture</h2>

            {/* Section de sélection du type de toiture */}
            <div className="type-selection">
                <h3>Type de Toit</h3>
                <div className="button-group">
                    <button
                        className={`type-button ${typeToiture === 'plat' ? 'active' : ''}`} // Bouton pour le type de toiture plat
                        onClick={() => handleTypeSelect('plat')}
                    >
                        Toit Plat
                    </button>
                    <button
                        className={`type-button ${typeToiture === 'pente' ? 'active' : ''}`} // Bouton pour le type de toiture en pente
                        onClick={() => handleTypeSelect('pente')}
                    >
                        Toit en Pente
                    </button>
                    <button
                        className={`type-button ${typeToiture === 'voute' ? 'active' : ''}`} // Bouton pour le type de toiture voûté
                        onClick={() => handleTypeSelect('voute')}
                    >
                        Toit Voûté
                    </button>
                </div>
            </div>

            {/* Section de sélection des matériaux, affichée dynamiquement en fonction du type de toiture choisi */}
            {typeToiture && (
                <div className="material-selection">
                    <h2>Matériau pour le {typeToiture === 'plat' ? 'Toit Plat' : typeToiture === 'pente' ? 'Toit en Pente' : 'Toit Voûté'}</h2>
                    <div className="button-group">
                        {/* Options pour le type de toiture plat */}
                        {typeToiture === 'plat' && (
                            <>
                                <button
                                    className={`material-button ${materialToiture === 'toleGalvanisee' ? 'active' : ''}`} // Bouton pour le matériau Tôle Galvanisée
                                    onClick={() => handleMaterialSelect('toleGalvanisee')}
                                >
                                    <h3>Tôle Galvanisée</h3>
                                    <img src={Galvanisée} alt="Tôle Galvanisée" />
                                    <p>Durable et résistant à la corrosion. Idéal pour une protection longue durée.</p>
                                </button>
                                <button
                                    className={`material-button ${materialToiture === 'etanche' ? 'active' : ''}`} // Bouton pour le matériau Étanchéité
                                    onClick={() => handleMaterialSelect('etanche')}
                                >
                                    <h3>Étanchéité</h3>
                                    <img src={Etanchéité} alt="Étanchéité" />
                                    <p>Assure une protection complète contre l'humidité. Parfait pour les toits plats.</p>
                                </button>
                            </>
                        )}
                        {/* Options pour le type de toiture en pente */}
                        {typeToiture === 'pente' && (
                            <>
                                <button
                                    className={`material-button ${materialToiture === 'tuiles' ? 'active' : ''}`} // Bouton pour le matériau Tuiles
                                    onClick={() => handleMaterialSelect('tuiles')}
                                >
                                    <h3>Tuiles</h3>
                                    <img src={Tuiles} alt="Tuiles" />
                                    <p>Traditionnelles et esthétiques. Bonnes performances en termes de ventilation.</p>
                                </button>
                                <button
                                    className={`material-button ${materialToiture === 'ardoise' ? 'active' : ''}`} // Bouton pour le matériau Ardoise
                                    onClick={() => handleMaterialSelect('ardoise')}
                                >
                                    <h3>Ardoise</h3>
                                    <img src={Ardoise} alt="Ardoise" />
                                    <p>Matériau durable et élégant. Excellente résistance aux intempéries.</p>
                                </button>
                            </>
                        )}
                        {/* Options pour le type de toiture voûté */}
                        {typeToiture === 'voute' && (
                            <>
                                <button
                                    className={`material-button ${materialToiture === 'verre' ? 'active' : ''}`} // Bouton pour le matériau Verre
                                    onClick={() => handleMaterialSelect('verre')}
                                >
                                    <h3>Verre</h3>
                                    <img src={Verre}  alt="Verre" />
                                    <p>Permet une lumière naturelle abondante. Esthétique moderne.</p>
                                </button>
                                <button
                                    className={`material-button ${materialToiture === 'metal' ? 'active' : ''}`} // Bouton pour le matériau Métal
                                    onClick={() => handleMaterialSelect('metal')}
                                >
                                    <h3>Métal</h3>
                                    <img src={Métal} alt="Métal" />
                                    <p>Durable et résistant aux conditions climatiques extrêmes. Faible entretien.</p>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Boutons de navigation */}
            <div className="navigation-buttons">
                <button onClick={prevStep}>Retour</button>
                <button onClick={handleSubmit}>Suivant</button>
            </div>
        </div>
    );
};

export default ToitureSelector;

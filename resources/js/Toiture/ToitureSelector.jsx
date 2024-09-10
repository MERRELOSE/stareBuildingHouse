import React, { useState } from 'react';
import './ToitureSelector.css'; // Fichier CSS pour le style
import Verre from '../components/assets/verre.jpg';
import Ardoise from '../components/assets/ardoise.jpg';
import Métal from '../components/assets/metal.jpg';
import Etanchéité from '../components/assets/etancheite.jpg';
import Galvanisée from '../components/assets/galvanise.jpg';
import Tuiles from '../components/assets/Tuiles.jpg';

const materialsOptions = {
    plat: [
        { name: 'Tôle Galvanisée', value: 'toleGalvanisee', img: Galvanisée, desc: 'Durable et résistant à la corrosion. Idéal pour une protection longue durée.', price: 30 },
        { name: 'Étanchéité', value: 'etanche', img: Etanchéité, desc: "Assure une protection complète contre l'humidité. Parfait pour les toits plats.", price: 45 }
    ],
    pente: [
        { name: 'Tuiles', value: 'tuiles', img: Tuiles, desc: 'Traditionnelles et esthétiques. Bonnes performances en termes de ventilation.', price: 40 },
        { name: 'Ardoise', value: 'ardoise', img: Ardoise, desc: 'Matériau durable et élégant. Excellente résistance aux intempéries.', price: 70 }
    ],
    voute: [
        { name: 'Verre', value: 'verre', img: Verre, desc: 'Permet une lumière naturelle abondante. Esthétique moderne.', price: 100 },
        { name: 'Métal', value: 'metal', img: Métal, desc: 'Durable et résistant aux conditions climatiques extrêmes. Faible entretien.', price: 60 }
    ]
};

const ToitureSelector = ({ nextStep, prevStep, updateQuoteData }) => {
    const [typeToiture, setTypeToiture] = useState('');
    const [materialToiture, setMaterialToiture] = useState('');
    const [materialPrice, setMaterialPrice] = useState(0);

    const handleTypeSelect = (type) => {
        setTypeToiture(type);
        setMaterialToiture(''); // Réinitialiser le matériau lors du changement de type
        setMaterialPrice(0); // Réinitialiser le prix lors du changement de type
    };

    const handleMaterialSelect = (value) => {
        const selectedMaterial = materialsOptions[typeToiture].find(mat => mat.value === value);
        setMaterialToiture(value);
        setMaterialPrice(selectedMaterial.price);
        updateQuoteData({ typeToiture, materialToiture: value, materialPrice: selectedMaterial.price });
    };

    const handleSubmit = () => {
        if (typeToiture && materialToiture) {
            nextStep();
        } else {
            alert('Veuillez sélectionner un type de toiture et un matériau.');
        }
    };

    return (
        <div className="toiture-selector-container">
            <h2>Sélectionnez le type et le matériau de toiture</h2>
            <div className="type-selection">
                <h3>Type de Toit</h3>
                <div className="button-group">
                    {['plat', 'pente', 'voute'].map((type) => (
                        <button
                            key={type}
                            className={`type-button ${typeToiture === type ? 'active' : ''}`}
                            onClick={() => handleTypeSelect(type)}
                        >
                            Toit {type === 'plat' ? 'Plat' : type === 'pente' ? 'en Pente' : 'Voûté'}
                        </button>
                    ))}
                </div>
            </div>

            {typeToiture && (
                <div className="material-selection">
                    <h2>Matériau pour le {typeToiture === 'plat' ? 'Toit Plat' : typeToiture === 'pente' ? 'Toit en Pente' : 'Toit Voûté'}</h2>
                    <div className="button-group">
                        {materialsOptions[typeToiture].map(({ name, value, img, desc, price }) => (
                            <button
                                key={value}
                                className={`material-button ${materialToiture === value ? 'active' : ''}`}
                                onClick={() => handleMaterialSelect(value)}
                            >
                                <h3>{name}</h3>
                                <img src={img} alt={name} />
                                <p>{desc}</p>
                                <p>Prix : {price} €/m²</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {materialToiture && (
                <div className="cost-summary">
                    <h3>Coût Estimé du Matériau Sélectionné</h3>
                    <p>Prix : {materialPrice} €/m²</p>
                </div>
            )}

            <div className="navigation-buttons">
                <button onClick={prevStep}>Retour</button>
                <button onClick={handleSubmit}>Suivant</button>
            </div>
        </div>
    );
};

export default ToitureSelector;

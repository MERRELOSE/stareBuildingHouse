import React, { useState } from 'react';
import './Elevation.css';

const Elevation = ({ nextStep, prevStep, updateQuoteData }) => {
  // États pour stocker les choix de l'utilisateur concernant les murs
  const [material, setMaterial] = useState('');
  const [thickness, setThickness] = useState('');
  const [height, setHeight] = useState('');
  const [ncl, setNcl] = useState(''); // Nombre de colonnes
  const [hcl, setHcl] = useState(''); // Hauteur des colonnes
  const [nv, setNv] = useState(''); // Niveau d'élévation

  // Calcul des armatures
  const calculateArmature = () => {
    if (!ncl || !hcl || !nv) return null;

    const nclNum = parseFloat(ncl);
    const hclNum = parseFloat(hcl);
    const nvNum = parseInt(nv);

    // Calcul des barres longitudinales
    const blUnitaire = hclNum * 4 * nvNum;
    const blTotal = (blUnitaire * nclNum + 24) / 12; // en barres de 10

    // Calcul des étriers
    const espacement = 0.2; // Espacement entre deux étriers
    const net = (hclNum / espacement) * nclNum;
    const etrierTotal = (0.54 * net + 24) / 12; // en barres de 6

    return { blUnitaire, blTotal, net, etrierTotal };
  };

  // Calcul du béton
  const calculateBeton = () => {
    if (!ncl || !hcl || !thickness) return null;

    const nclNum = parseFloat(ncl);
    const hclNum = parseFloat(hcl);
    const thicknessNum = parseFloat(thickness);

    // Calcul du volume
    const volume = thicknessNum * hclNum * nclNum;

    // Quantités de béton
    const qCiment = (volume * 350) / 50; // en sacs de ciment
    const qSable = volume * 0.4 * 1.5; // en tonnes
    const qCaillasse = volume * 0.8 * 1.6; // en tonnes
    const eauGachage = 160 * volume; // en litres

    return { volume, qCiment, qSable, qCaillasse, eauGachage };
  };

  // Fonction pour gérer la sélection du matériau des murs
  const handleMaterialSelect = (selectedMaterial) => {
    setMaterial(selectedMaterial);
    updateQuoteData({ material: selectedMaterial });
  };

  // Fonction pour gérer la sélection de l'épaisseur des murs
  const handleThicknessSelect = (selectedThickness) => {
    setThickness(selectedThickness);
    updateQuoteData({ thickness: selectedThickness });
  };

  // Fonction pour gérer la sélection de la hauteur des murs
  const handleHeightSelect = (selectedHeight) => {
    setHeight(selectedHeight);
    updateQuoteData({ height: selectedHeight });
  };

  // Fonction pour passer à l'étape suivante
  const handleSubmit = () => {
    if (!material || !thickness || !height || !ncl || !hcl || !nv) {
      alert('Veuillez sélectionner tous les paramètres des murs.');
      return;
    }
    
    if (parseFloat(ncl) <= 0 || parseFloat(hcl) <= 0 || parseInt(nv) <= 0) {
      alert('Veuillez entrer des valeurs valides pour les colonnes.');
      return;
    }
  
    nextStep();
  };
  
  // Données calculées pour affichage
  const armature = calculateArmature();
  const beton = calculateBeton();

  return (
    <div className="elevation-des-murs-container">
      <h2>Élévation des Murs</h2>

      {/* Sélection du matériau des murs */}
      <div className="material-selection">
        <h3>Matériau des Murs</h3>
        <div className="button-group">
          <button
            className={`material-button ${
              material === 'brique' ? 'active' : ''
            }`}
            onClick={() => handleMaterialSelect('brique')}
          >
            Brique
            <p className="tooltip">Durable et esthétique, idéal pour un aspect traditionnel.</p>
          </button>
          <button
            className={`material-button ${
              material === 'béton' ? 'active' : ''
            }`}
            onClick={() => handleMaterialSelect('béton')}
          >
            Béton
            <p className="tooltip">Solide et robuste, parfait pour des constructions modernes.</p>
          </button>
          <button
            className={`material-button ${
              material === 'bois' ? 'active' : ''
            }`}
            onClick={() => handleMaterialSelect('bois')}
          >
            Bois
            <p className="tooltip">Écologique et naturel, offre une excellente isolation.</p>
          </button>
        </div>
      </div>

      {/* Sélection de l'épaisseur des murs */}
      <div className="thickness-selection">
        <h3>Épaisseur des Murs</h3>
        <div className="button-group">
          <button
            className={`thickness-button ${
              thickness === '15cm' ? 'active' : ''
            }`}
            onClick={() => handleThicknessSelect('15cm')}
          >
            15 cm
          </button>
          <button
            className={`thickness-button ${
              thickness === '20cm' ? 'active' : ''
            }`}
            onClick={() => handleThicknessSelect('20cm')}
          >
            20 cm
          </button>
          <button
            className={`thickness-button ${
              thickness === '25cm' ? 'active' : ''
            }`}
            onClick={() => handleThicknessSelect('25cm')}
          >
            25 cm
          </button>
        </div>
      </div>

      {/* Sélection de la hauteur des murs */}
      <div className="height-selection">
        <h3>Hauteur des Murs</h3>
        <div className="button-group">
          <button
            className={`height-button ${height === '2.5m' ? 'active' : ''}`}
            onClick={() => handleHeightSelect('2.5m')}
          >
            2.5 m
          </button>
          <button
            className={`height-button ${height === '3m' ? 'active' : ''}`}
            onClick={() => handleHeightSelect('3m')}
          >
            3 m
          </button>
          <button
            className={`height-button ${height === '3.5m' ? 'active' : ''}`}
            onClick={() => handleHeightSelect('3.5m')}
          >
            3.5 m
          </button>
        </div>
      </div>

      {/* Input pour les colonnes */}
      <div className="column-inputs">
        <h3>Détails des Colonnes</h3>
        <div className="input-group">
          <label htmlFor="ncl">Nombre de colonnes :</label>
          <input
            type="number"
            id="ncl"
            value={ncl}
            onChange={(e) => setNcl(e.target.value)}
            placeholder="Nombre de colonnes"
          />
        </div>
        <div className="input-group">
          <label htmlFor="hcl">Hauteur des colonnes (m) :</label>
          <input
            type="number"
            id="hcl"
            value={hcl}
            onChange={(e) => setHcl(e.target.value)}
            placeholder="Hauteur des colonnes"
          />
        </div>
        <div className="input-group">
          <label htmlFor="nv">Niveau d'élévation :</label>
          <input
            type="number"
            id="nv"
            value={nv}
            onChange={(e) => setNv(e.target.value)}
            placeholder="Niveau d'élévation"
          />
        </div>
      </div>

      {/* Affichage des résultats calculés */}
      {armature && (
        <div className="calculated-results">
          <h3>Résultats des Calculs</h3>
          <div className="result-item">
            <span>Barres longitudinales unitaires : </span>
            <span>{armature.blUnitaire.toFixed(2)} m</span>
          </div>
          <div className="result-item">
            <span>Barres longitudinales totales : </span>
            <span>{armature.blTotal.toFixed(2)} barres de 10</span>
          </div>
          <div className="result-item">
            <span>Nombre d'étriers : </span>
            <span>{armature.net.toFixed(0)} unités</span>
          </div>
          <div className="result-item">
            <span>Longueur totale d'étriers : </span>
            <span>{armature.etrierTotal.toFixed(2)} barres de 6</span>
          </div>
        </div>
      )}

      {beton && (
        <div className="calculated-results">
          <div className="result-item">
            <span>Volume de béton : </span>
            <span>{beton.volume.toFixed(2)} m³</span>
          </div>
          <div className="result-item">
            <span>Quantité de ciment : </span>
            <span>{beton.qCiment.toFixed(0)} sacs</span>
          </div>
          <div className="result-item">
            <span>Quantité de sable : </span>
            <span>{beton.qSable.toFixed(2)} tonnes</span>
          </div>
          <div className="result-item">
            <span>Quantité de caillasse : </span>
            <span>{beton.qCaillasse.toFixed(2)} tonnes</span>
          </div>
          <div className="result-item">
            <span>Eau de gâchage : </span>
            <span>{beton.eauGachage.toFixed(0)} L</span>
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

export default Elevation;

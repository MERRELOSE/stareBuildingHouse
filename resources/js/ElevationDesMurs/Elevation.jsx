import React, { useState } from 'react';
import './Elevation.css';

const Elevation = ({ nextStep, prevStep, updateQuoteData }) => {
  const [material, setMaterial] = useState('');
  const [thickness, setThickness] = useState('');
  const [height, setHeight] = useState('');
  const [ncl, setNcl] = useState('');
  const [hcl, setHcl] = useState('');
  const [nv, setNv] = useState('');

  // Prix des matériaux
  const materialPrices = {
    brique: 50,  // prix par m²
    béton: 80,   // prix par m²
    bois: 60     // prix par m²
  };

  // Épaisseurs en cm et leurs prix
  const thicknessPrices = {
    '15cm': 25,  // prix par m²
    '20cm': 30,  // prix par m²
    '25cm': 35   // prix par m²
  };

  // Coût unitaire des étriers (exemple en euros)
  const costPerEtrier = 5; // Coût unitaire des étriers

  // Fonction pour calculer les armatures
  const calculateArmature = () => {
    if (!ncl || !hcl || !nv) return null;

    const nclNum = parseFloat(ncl);
    const hclNum = parseFloat(hcl);
    const nvNum = parseInt(nv);

    // Calcul des barres longitudinales et des étriers
    const blUnitaire = hclNum * 4 * nvNum;
    const blTotal = (blUnitaire * nclNum + 24) / 12; // barres de 10
    const espacement = 0.2;
    const net = (hclNum / espacement) * nclNum;
    const etrierTotal = (0.54 * net + 24) / 12; // barres de 6

    // Calcul du coût total des étriers
    const costEtriers = etrierTotal * costPerEtrier;

    return { blUnitaire, blTotal, net, etrierTotal, costEtriers };
  };

  // Fonction pour calculer le béton
  const calculateBeton = () => {
    if (!ncl || !hcl || !thickness) return null;

    const nclNum = parseFloat(ncl);
    const hclNum = parseFloat(hcl);
    const thicknessNum = parseFloat(thickness);

    const volume = thicknessNum * hclNum * nclNum;
    const qCiment = (volume * 350) / 50; // sacs de ciment
    const qSable = volume * 0.4 * 1.5; // tonnes
    const qCaillasse = volume * 0.8 * 1.6; // tonnes
    const eauGachage = 160 * volume; // litres

    return { volume, qCiment, qSable, qCaillasse, eauGachage };
  };

  // Fonction pour calculer le coût total
  const calculateCost = () => {
    if (!material || !thickness || !height || !ncl) return null;

    const materialCost = materialPrices[material] || 0;
    const thicknessCost = thicknessPrices[thickness] || 0;
    const heightNum = parseFloat(height);

    const area = ncl * heightNum; // m²
    const cost = (materialCost + thicknessCost) * area;

    return cost;
  };

  // Fonction pour gérer la sélection des options
  const handleSelect = (setter) => (value) => {
    setter(value);
    updateQuoteData({ [setter.name]: value });
  };

  // Fonction pour passer à l'étape suivante
  const handleSubmit = () => {
    // Vérification si tous les champs sont remplis
    if (!material || !thickness || !height || !ncl || !hcl || !nv) {
        alert('Veuillez remplir tous les champs requis.');
        return;
    }

    // Vérification des valeurs numériques pour les colonnes
    if (parseFloat(ncl) <= 0 || parseFloat(hcl) <= 0 || parseInt(nv) <= 0) {
        alert('Veuillez entrer des valeurs valides pour les colonnes.');
        return;
    }

    // Mise à jour des données de devis
    updateQuoteData({
        material,
        thickness,
        height,
        ncl,
        hcl,
        nv,
        cost: calculateCost(), // Ajout du coût total aux données du devis
        armature: calculateArmature(), // Ajout des résultats d'armature aux données du devis
        beton: calculateBeton() // Ajout des résultats de béton aux données du devis
    });

    // Passage à l'étape suivante
    nextStep();
};

  const armature = calculateArmature();
  const beton = calculateBeton();
  const cost = calculateCost();

  return (
    <div className="elevation-des-murs-container">
      <h2>Élévation des Murs</h2>

      {/* Sélection du matériau des murs */}
      <div className="selection-section">
        <h3>Matériau des Murs</h3>
        {['brique', 'béton', 'bois'].map((mat) => (
          <button
            key={mat}
            className={`selection-button ${material === mat ? 'active' : ''}`}
            onClick={() => handleSelect(setMaterial)(mat)}
          >
            {mat.charAt(0).toUpperCase() + mat.slice(1)}
          </button>
        ))}
      </div>

      {/* Sélection de l'épaisseur des murs */}
      <div className="selection-section">
        <h3>Épaisseur des Murs</h3>
        {['15cm', '20cm', '25cm'].map((thk) => (
          <button
            key={thk}
            className={`selection-button ${thickness === thk ? 'active' : ''}`}
            onClick={() => handleSelect(setThickness)(thk)}
          >
            {thk}
          </button>
        ))}
      </div>

      {/* Sélection de la hauteur des murs */}
      <div className="selection-section">
        <h3>Hauteur des Murs</h3>
        {['2.5m', '3m', '3.5m'].map((hgt) => (
          <button
            key={hgt}
            className={`selection-button ${height === hgt ? 'active' : ''}`}
            onClick={() => handleSelect(setHeight)(hgt)}
          >
            {hgt}
          </button>
        ))}
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
            min={4}
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
            min={1}
          />
        </div>
        <div className="input-group">
          <label htmlFor="nv">Niveau d'élevation (Nombre d'étage) :</label>
          <input
            type="number"
            id="nv"
            value={nv}
            onChange={(e) => setNv(e.target.value)}
            placeholder="Niveau d'élévation"
            min={1}
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
            <span>{armature.blTotal.toFixed(2)} m</span>
          </div>
          <div className="result-item">
            <span>Étriers totaux : </span>
            <span>{armature.etrierTotal.toFixed(2)}</span>
          </div>
          <div className="result-item">
            <span>Coût des étriers : </span>
            <span>{armature.costEtriers.toFixed(2)} €</span>
          </div>
          {beton && (
            <>
              <div className="result-item">
                <span>Volume de béton nécessaire : </span>
                <span>{beton.volume.toFixed(2)} m³</span>
              </div>
              <div className="result-item">
                <span>Quantité de ciment : </span>
                <span>{beton.qCiment.toFixed(2)} sacs</span>
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
                <span>Quantité d'eau de gâchage : </span>
                <span>{beton.eauGachage.toFixed(2)} litres</span>
              </div>
            </>
          )}
          {cost && (
            <div className="result-item">
              <span>Coût total des murs : </span>
              <span>{cost.toFixed(2)} €</span>
            </div>
          )}
        </div>
      )}

      {/* Boutons de navigation */}
      <div className="navigation-buttons">
        <button onClick={prevStep}>Précédent</button>
        <button onClick={handleSubmit}>Suivant</button>
      </div>
    </div>
  );
};

export default Elevation;

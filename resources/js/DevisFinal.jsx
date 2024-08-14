import React from 'react';
import './DevisFinal.css';

const DevisFinal = ({ quoteData, totalCost, onConfirm, onEdit }) => {
  // Gestion des données manquantes
  const {
    material = 'Non spécifié',
    thickness = 'Non spécifié',
    height = 'Non spécifié',
    typeToiture = 'Non spécifié',
    materialToiture = 'Non spécifié',
    tileType = 'Non spécifié',
    surfaceUtile = 0,
    numberOfTiles = 0,
  } = quoteData || {};

  const formattedTotalCost = totalCost ? totalCost.toFixed(2) : '0.00';

  return (
    <div className="devis-final-container">
      <h2>Résumé du Devis</h2>

      <div className="summary-section">
        <h3>1. Élévation des Murs</h3>
        <p>Matériau : {material}</p>
        <p>Épaisseur : {thickness}</p>
        <p>Hauteur : {height}</p>
      </div>

      <div className="summary-section">
        <h3>2. Toiture</h3>
        <p>Type de Toiture : {typeToiture}</p>
        <p>Matériau de Toiture : {materialToiture}</p>
      </div>

      <div className="summary-section">
        <h3>3. Revêtement de Sol</h3>
        <p>Type de Carrelage : {tileType}</p>
        <p>Surface Utile : {surfaceUtile} m²</p>
        <p>Nombre de Carreaux : {numberOfTiles}</p>
      </div>

      <div className="cost-summary">
        <h3>Coût Total Estimé</h3>
        <p>{formattedTotalCost} €</p>
      </div>

      <div className="action-buttons">
        <button onClick={onEdit} className="edit-button">Modifier le Devis</button>
        <button onClick={onConfirm} className="confirm-button">Confirmer le Devis</button>
      </div>
    </div>
  );
};

export default DevisFinal;

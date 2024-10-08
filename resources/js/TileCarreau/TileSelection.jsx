import React, { useState } from 'react';
import './TileSelection.css';
import CeramiqueImg from '../components/assets/ceramique.jpg';
import GresImg from '../components/assets/gres.jpg';
import PorcelaineImg from '../components/assets/Porcelaine.jpg';
import MosaiqueImg from '../components/assets/Mosaique.jpg';

const TileSelection = ({ nextStep, prevStep, updateQuoteData, skipStep }) => {
  // États pour les choix et les dimensions
  const [selectedTile, setSelectedTile] = useState(null);
  const [tileLength, setTileLength] = useState(''); // en cm
  const [tileWidth, setTileWidth] = useState('');  // en cm
  const [floorArea, setFloorArea] = useState('');
  const [tileLayout, setTileLayout] = useState('straight'); // pose droite ou croisée

  // Options de carreaux
  const tileOptions = [
    {
      id: 1,
      name: 'Carreau Céramique 50x50 cm',
      size: { length: 50, width: 50 }, // en cm
      pricePerSquareMeter: 20, // en €
      imageUrl: CeramiqueImg,
    },
    {
      id: 2,
      name: 'Carreau Grès Cérame 60x60 cm',
      size: { length: 60, width: 60 },
      pricePerSquareMeter: 25,
      imageUrl: GresImg,
    },
    {
      id: 3,
      name: 'Carreau Porcelaine 45x45 cm',
      size: { length: 45, width: 45 },
      pricePerSquareMeter: 30,
      imageUrl: PorcelaineImg,
    },
    {
      id: 4,
      name: 'Carreau Mosaïque 30x30 cm',
      size: { length: 30, width: 30 },
      pricePerSquareMeter: 35,
      imageUrl: MosaiqueImg,
    },
  ];

  // Fonction pour gérer la sélection du carreau
  const handleTileSelect = (tile) => {
    setSelectedTile(tile);
    setTileLength(tile.size.length);
    setTileWidth(tile.size.width);
    updateQuoteData({ tileType: tile.name });
    console.log("Carreau sélectionné:", tile);
    console.log("Dimensions mises à jour:", {
      length: tile.size.length,
      width: tile.size.width
    });
  };

  // Calcul du nombre de carreaux nécessaires
  const calculateTilesNeeded = () => {
    const area = parseFloat(floorArea); // en m²
    const tileArea = (parseFloat(tileLength) * parseFloat(tileWidth)) / 10000; // en m² par carreau
  
    if (!area || !tileArea || !selectedTile) return null;
  
    const baseTilesNeeded = Math.ceil(area / tileArea);
    console.log("Base des carreaux nécessaires:", baseTilesNeeded);
  
    let safetyPercentage = 0.05;
    if (tileLayout === 'cross') {
      safetyPercentage = 0.15;
    }
  
    const totalTilesNeeded = Math.ceil(baseTilesNeeded * (1 + safetyPercentage));
    const totalCost = totalTilesNeeded * tileArea * selectedTile.pricePerSquareMeter;
    
    console.log("Calcul des carreaux nécessaires:", {
      baseTilesNeeded,
      safetyPercentage,
      totalTilesNeeded,
      tileArea,
      totalCost
    });
  
    return { totalTilesNeeded, totalCost };
  };
  
  const tileDetails = selectedTile && calculateTilesNeeded();

  // Validation des entrées et passage à l'étape suivante
  const handleSubmit = () => {
    if (selectedTile && floorArea && tileLength && tileWidth) {
      const { totalTilesNeeded, totalCost } = tileDetails;
      updateQuoteData({
        tileType: selectedTile.name,
        tileLength,
        tileWidth,
        floorArea,
        tileLayout,
        totalTilesNeeded,
        totalCost,
      });
      console.log("Données mises à jour dans quoteData:", {
        tileType: selectedTile.name,
        tileLength,
        tileWidth,
        floorArea,
        tileLayout,
        totalTilesNeeded,
        totalCost,
      });
      nextStep();
    } else {
      alert('Veuillez sélectionner un type de carreau, entrer les dimensions et la surface.');
    }
  };
  

  return (
    <div className="tile-selection-container">
      <h2>Choix du Carrelage</h2>

      {/* Option pour ignorer cette étape */}
      <div className="skip-step">
        <button onClick={skipStep}>Ignorer la Sélection de Carreaux</button>
      </div>

      {/* Sélection du type de carreau */}
      <div className="tile-selection">
        <h3>Type de Carreau</h3>
        <div className="tile-options">
          {tileOptions.map((tile) => (
            <div
              key={tile.id}
              className={`tile-card ${selectedTile?.id === tile.id ? 'active' : ''}`}
              onClick={() => handleTileSelect(tile)}
            >
              <img src={tile.imageUrl} alt={tile.name} />
              <h4>{tile.name}</h4>
              <p>Dimensions : {tile.size.length} x {tile.size.width} cm</p>
              <p>Prix : {tile.pricePerSquareMeter} €/m²</p>
            </div>
          ))}
        </div>
      </div>

      {/* Entrée des dimensions de la surface à couvrir */}
      <div className="floor-area-input">
        <h3>Surface à Couvrir (en m²)</h3>
        <input
          type="number"
          value={floorArea}
          onChange={(e) => setFloorArea(e.target.value)}
          placeholder="Entrer la surface en m²"
          step="0.01"
          min="0"
        />
      </div>

      {/* Entrée des dimensions des carreaux */}
      <div className="tile-dimensions-input">
        <h3>Dimensions des Carreaux (en cm)</h3>
        <input
          type="number"
          value={tileLength}
          onChange={(e) => setTileLength(e.target.value)}
          placeholder="Longueur du carreau"
          step="0.01"
          min="0"
        />
        <input
          type="number"
          value={tileWidth}
          onChange={(e) => setTileWidth(e.target.value)}
          placeholder="Largeur du carreau"
          step="0.01"
          min="0"
        />
      </div>

      {/* Sélection du type de pose */}
      <div className="tile-layout-selection">
        <h3>Type de Pose des Carreaux</h3>
        <select value={tileLayout} onChange={(e) => setTileLayout(e.target.value)}>
          <option value="straight">Pose Droite des carreaux (5% de sécurité)</option>
          <option value="cross">Pose Croisée des carreaux (15% de sécurité)</option>
        </select>
      </div>

      {/* Affichage des résultats calculés */}
      {tileDetails && (
        <div className="calculated-results">
          <h3>Résultats des Calculs</h3>
          <div className="result-item">
            <span>Nombre de Carreaux Nécessaires : </span>
            <span>{tileDetails.totalTilesNeeded}</span>
          </div>
          <div className="result-item">
            <span>Coût Total : </span>
            <span>{tileDetails.totalCost.toFixed(2)} €</span>
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

export default TileSelection;

import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './DevisFinal.css';

const DevisFinal = ({ quoteData, onConfirm, onEdit }) => {
  const componentRef = useRef();
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    material = 'Non spécifié',
    thickness = 0,
    height = 0,
    cost = 0,
    typeToiture = 'Non spécifié',
    materialToiture = 'Non spécifié',
    materialPrice = 0,
    surfaceCouvrir = 0,
    surfaceUtileTole = 0,
    nombreTole = 0,
    nombreFermes = 0,
    dimensionFerme = 0,
    nombreMadrier = 0,
    nombreChevrons = 0,
    tileType = 'Non spécifié',
    floorArea = 0,
    totalTilesNeeded = 0,
    totalCost = 0,
    laborCost = 0,
    sandQuantity = 0,
    cementQuantity = 0,
    gravelQuantity = 0,
    stoneQuantity = 0,
    waterQuantity = 0,
    sandCost = 0,
    cementCost = 0,
    gravelCost = 0,
    stoneCost = 0,
    waterCost = 0,
  } = quoteData || {};

  // Calcul du coût total des matériaux
  const totalTôle = materialPrice * nombreTole ;

  //Calcul du coût de madrier
  const prixMadrier = 15; // Exemple de prix par unité
  const costMadrier = nombreMadrier * prixMadrier;

  //Calcul du coût de chevrons
  const prixChevrons = 10; // Exemple de prix par unité
  const costChevrons = nombreChevrons * prixChevrons;

   // Calcul du coût total des matériaux
  const totalMaterialsCost = sandCost + cost + totalTôle + costChevrons + costMadrier + cementCost + gravelCost + stoneCost + totalCost + waterCost;

  // Ajout du coût de la main-d'œuvre pour obtenir le coût total
  const totalhelpCost = (totalMaterialsCost + laborCost).toFixed(2);

const handleDownloadPDF = async () => {
  const canvas = await html2canvas(componentRef.current, {
    scale: 2,
    useCORS: true, // Si vous avez des images externes
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Obtenez les dimensions du PDF (en mm)
  const pdfWidth = 210;
  const pdfHeight = 297;

  // Calculez la hauteur de l'image pour conserver les proportions
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  // Ajoutez l'image au PDF
  let position = 0;
  if (imgHeight < pdfHeight) {
    // Si l'image tient sur une seule page
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  } else {
    // Si l'image est trop grande, divisez-la en plusieurs pages
    while (position < canvas.height) {
      pdf.addImage(
        imgData,
        'PNG',
        0,
        -position / canvas.width * pdfWidth,
        imgWidth,
        imgHeight
      );
      position += pdfHeight * canvas.width / pdfWidth;
      if (position < canvas.height) {
        pdf.addPage();
      }
    }
  }

  // Enregistrez le fichier PDF
  pdf.save('devis.pdf');
  setIsDownloaded(true);
};

  

  return (
    <div>
      <div ref={componentRef} className="devis-final-container">
        <h2>Résumé du Devis</h2>

        <div className="summary-section">
          <h3>1. Élévation des Murs</h3>
          <p>Matériau : {material}</p>
          <p>Épaisseur : {thickness}</p>
          <p>Hauteur : {height}</p>
          <p>Coût total des matériaux : {cost} €</p>
          <p></p>
          <p></p>
        </div>

        <div className="summary-section">
          <h3>2. Toiture</h3>
          <p>Type de Toiture : {typeToiture}</p>
          <p>Matériau de Toiture : {materialToiture}</p>
          <p>Surface utile : {surfaceCouvrir}</p>
          <p>Surface d'une tôle :{surfaceUtileTole}</p>
          <p>Nombres de Tôle nécessaires :{nombreTole}</p>
          <p>Coût des Tôles :{totalTôle} €</p>
        </div>

        <div className= "summary-section">
          <h3>3.Madrier et Chevrons</h3>
          <p>Nombres de Ferme :{nombreFermes}</p>
          <p>Dimension d'une Ferme :{dimensionFerme} </p>
          <p>Coût des Madriers :{costMadrier}  €</p>
          <p>Nombres de Madrier :{nombreMadrier} </p>
          <p>Nombre de Chevrons :{nombreChevrons}</p>
          <p>Côut des Chevrons :{costChevrons}  €</p>
        </div>

        <div className="summary-section">
          <h3>4. Revêtement de Sol</h3>
          <p>Type de Carrelage : {tileType}</p>
          <p>Surface Utile : {floorArea} m²</p>
          <p>Nombre de Carreaux Nécessaires : {totalTilesNeeded}</p>
          <p>Coût Total des carreaux : {totalCost.toFixed(2)} €</p>
        </div>

        {laborCost > 0 && (
          <div className="summary-section">
            <h3>5. Coût de la Main-d'œuvre</h3>
            <p>{laborCost.toFixed(2)} €</p>
          </div>
        )}

        <div className="summary-section">
          <h3>6. Matériaux de Construction</h3>
          <p>Quantité de Sable : {sandQuantity} m³</p>
          <p>Coût du Sable : {sandCost.toFixed(2)} €</p>
          <p>Quantité de Ciment : {cementQuantity} kg</p>
          <p>Coût du Ciment : {cementCost.toFixed(2)} €</p>
          <p>Quantité de Caillasses : {gravelQuantity} m³</p>
          <p>Coût des Caillasses : {gravelCost.toFixed(2)} €</p>
          <p>Quantité de Graviers : {stoneQuantity} m³</p>
          <p>Coût des Graviers : {stoneCost.toFixed(2)} €</p>
          <p>Quantité d'Eau : {waterQuantity} L</p>
          <p>Coût de l'Eau : {waterCost.toFixed(2)} €</p>
        </div>

        <div className="cost-summary">
          <h3>Coût Total Estimé</h3>
          <p>{totalhelpCost} €</p>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={onEdit} className="edit-button">Modifier le Devis</button>
        <button onClick={onConfirm} className="confirm-button">Confirmer le Devis</button>
        {!isDownloaded && (
          <button onClick={handleDownloadPDF} className="download-button">Télécharger le PDF</button>
        )}
        {isDownloaded && (
          <button onClick={handlePrint} className="print-button">Imprimer</button>
        )}
      </div>
    </div>
  );
};

export default DevisFinal;

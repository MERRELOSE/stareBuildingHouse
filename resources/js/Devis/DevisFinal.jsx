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
    armature = {
      blTotal: 0,
      etrierTotal: 0,
      costEtriers: 0,
    },
    beton = {
      volume: 0,
      qCiment: 0,
      qSable: 0,
      qCaillasse: 0,
      eauGachage: 0,
    }
  } = quoteData || {};

  // Exemples de prix (à ajuster selon vos besoins)
  const prixCiment = 10; // Prix par sac de ciment
  const prixSable = 30; // Prix par tonne de sable
  const prixCaillasse = 40; // Prix par tonne de caillasse
  const prixEauGachage = 0.5; // Prix par litre d'eau de gâchage

  // Calcul du coût des matériaux
  const costCiment = beton.qCiment * prixCiment;
  const costSable = beton.qSable * prixSable;
  const costCaillasse = beton.qCaillasse * prixCaillasse;
  const costEauGachage = beton.eauGachage * prixEauGachage;

  // Calcul du coût total des matériaux
  const totalTôle = materialPrice * nombreTole;

  // Calcul du coût de madrier
  const prixMadrier = 15; // Exemple de prix par unité
  const costMadrier = nombreMadrier * prixMadrier;

  // Calcul du coût de chevrons
  const prixChevrons = 10; // Exemple de prix par unité
  const costChevrons = nombreChevrons * prixChevrons;

  // Calcul du coût total des matériaux
  const totalMaterialsCost = cost + totalTôle + costChevrons + costMadrier + costCiment + costSable + costCaillasse + costEauGachage + armature.costEtriers + totalCost;

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
        </div>

        <div className="summary-section">
          <h3>2. Toiture</h3>
          <p>Type de Toiture : {typeToiture}</p>
          <p>Matériau de Toiture : {materialToiture}</p>
          <p>Surface utile : {surfaceCouvrir}</p>
          <p>Surface d'une tôle : {surfaceUtileTole}</p>
          <p>Nombres de Tôle nécessaires : {nombreTole}</p>
          <p>Coût des Tôles : {totalTôle} €</p>
        </div>

        <div className="summary-section">
          <h3>3. Madrier et Chevrons</h3>
          <p>Nombres de Ferme : {nombreFermes}</p>
          <p>Dimension d'une Ferme : {dimensionFerme}</p>
          <p>Coût des Madriers : {costMadrier} €</p>
          <p>Nombres de Madrier : {nombreMadrier}</p>
          <p>Nombre de Chevrons : {nombreChevrons}</p>
          <p>Coût des Chevrons : {costChevrons} €</p>
        </div>

        <div className="summary-section">
          <h3>4. Revêtement de Sol</h3>
          <p>Type de Carrelage : {tileType}</p>
          <p>Surface Utile : {floorArea} m²</p>
          <p>Nombre de Carreaux Nécessaires : {totalTilesNeeded}</p>
          <p>Coût Total des Carreaux : {totalCost.toFixed(2)} €</p>
        </div>

        <div className="summary-section">
          <h3>5. Armature</h3>
          <p>Longueur Totale des Barres Longitudinales : {armature.blTotal.toFixed(2)} m</p>
          <p>Étriers Totaux : {armature.etrierTotal.toFixed(2)}</p>
          <p>Coût des Étriers : {armature.costEtriers.toFixed(2)} €</p>
        </div>

        <div className="summary-section">
          <h3>6. Béton</h3>
          <p>Volume de Béton Nécessaire : {beton.volume.toFixed(2)} m³</p>
          <p>Quantité de Ciment : {beton.qCiment.toFixed(2)} sacs</p>
          <p>Coût du Ciment : {costCiment.toFixed(2)} €</p>
          <p>Quantité de Sable : {beton.qSable.toFixed(2)} tonnes</p>
          <p>Coût du Sable : {costSable.toFixed(2)} €</p>
          <p>Quantité de Caillasse : {beton.qCaillasse.toFixed(2)} tonnes</p>
          <p>Coût de la Caillasse : {costCaillasse.toFixed(2)} €</p>
          <p>Quantité d'Eau de Gâchage : {beton.eauGachage.toFixed(2)} litres</p>
          <p>Coût de l'Eau de Gâchage : {costEauGachage.toFixed(2)} €</p>
        </div>

        <div className="cost-summary">
          <h3>Coût Total Estimé</h3>
          <p>Coût des Matériaux : {totalMaterialsCost.toFixed(2)} €</p>
          <p>Coût de la Main-d'œuvre : {laborCost.toFixed(2)} €</p>
          <p><strong>Coût Total Final : {totalhelpCost} €</strong></p>
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleDownloadPDF} className="btn-download">Télécharger PDF</button>
        <button onClick={handlePrint} className="btn-print">Imprimer</button>
        <button onClick={onConfirm} className="btn-confirm">Confirmer</button>
        <button onClick={onEdit} className="btn-edit">Modifier</button>
      </div>
    </div>
  );
};

export default DevisFinal;

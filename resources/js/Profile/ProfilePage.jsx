import React, { useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = ({ authUser }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage('Veuillez sélectionner un fichier.');
            return;
        }

        const formData = new FormData();
        formData.append('profile_photo', selectedFile);

        try {
            const response = await axios.post('/api/upload-profile-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadMessage(response.data.message);
        } catch (error) {
            setUploadMessage('Erreur lors du téléchargement de la photo de profil.');
        }
    };

    // Vérifie si authUser est défini avant d'accéder à profile_photo_path
    const hasProfilePhoto = authUser && authUser.profile_photo_path;

    return (
        <div>
            <div className="profile-section">
                <h2>Mon Profil</h2>

                <form>
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    <button type="button" onClick={handleUpload}>Télécharger</button>
                </form>

                <p>{uploadMessage}</p>

                {/* Affichage de la photo de profil si elle existe */}
                {hasProfilePhoto ? (
                    <img src={`/storage/${authUser.profile_photo_path}`} alt="Photo de profil" />
                ) : (
                    <p>Aucune photo de profil téléchargée.</p>
                )}
            </div>
        </div>
    );
};
export default ProfilePage;
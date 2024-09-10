import React, { useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = ({ authUser }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [profilePhotoUrl, setProfilePhotoUrl] = useState(authUser?.profile_photo_path ? `/storage/${authUser.profile_photo_path}` : '');

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

            // Mettre à jour le message et l'URL de la photo de profil
            setUploadMessage(response.data.message);
            setProfilePhotoUrl(`/storage/${response.data.path}`);
        } catch (error) {
            setUploadMessage('Erreur lors du téléchargement de la photo de profil.');
        }
    };

    return (
        <div className="profile-section">
            <h2>Mon Profil</h2>

            <form>
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <button type="button" onClick={handleUpload}>Télécharger</button>
            </form>

            <p>{uploadMessage}</p>

            {/* Affichage de la photo de profil si elle existe */}
            {profilePhotoUrl ? (
                <img src={profilePhotoUrl} alt="Photo de profil" />
            ) : (
                <p>Aucune photo de profil téléchargée.</p>
            )}
        </div>
    );
};

export default ProfilePage;

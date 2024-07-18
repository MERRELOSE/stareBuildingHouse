<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Profil</title>
</head>
<style>
    /* Reset des styles de base */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f0f0f0;
    }

    .profil-section {
        max-width: 600px;
        margin: 20px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .profil-section h2 {
        font-size: 24px;
        margin-bottom: 15px;
        text-align: center;
    }

    .profil-section form {
        margin-bottom: 20px;
    }

    .profil-section form input[type="file"] {
        display: block;
        margin-bottom: 10px;
    }

    .profil-section form button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 16px;
        border-radius: 5px;
    }

    .profil-section form button:hover {
        background-color: #0056b3;
    }

    .profil-section img {
        display: block;
        max-width: 100%;
        margin-top: 10px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    .profil-section .no-profile-icon {
        width: 100px;
        height: 100px;
        background-color: #d2d1d1;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 10px auto;
    }

    .profil-section .no-profile-icon svg {
        width: 60%;
        height: 60%;
        fill: #fff;
    }

    .profil-section p {
        text-align: center;
        margin-top: 10px;
        color: #777;
    }

</style>
<body>
    <!-- Partie du profil avec la gestion de la photo de profil -->
    <div class="profil-section">
        <h2>Mon Profil</h2>

        <!-- Formulaire pour télécharger une nouvelle photo de profil -->
        <form action="/upload-profile-photo" method="POST" enctype="multipart/form-data">
            @csrf
            <input type="file" name="profile_photo" accept="image/*">
            <button type="submit">Télécharger</button>
        </form>

        <!-- Affichage de la photo de profil actuelle ou icône par défaut -->
        @if (auth()->user()->profile_photo_path)
            <img src="{{ asset('storage/' . auth()->user()->profile_photo_path) }}" alt="Photo de profil">
        @else
            <div class="no-profile-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792">
                    <path fill="#d2d1d1" d="M1523 1339q-22-155-87.5-257.5T1251 963q-67 74-159.5 115.5T896 1120t-195.5-41.5T541 963q-119 16-184.5 118.5T269 1339q106 150 271 237.5t356 87.5t356-87.5t271-237.5m-243-699q0-159-112.5-271.5T896 256T624.5 368.5T512 640t112.5 271.5T896 1024t271.5-112.5T1280 640m512 256q0 182-71 347.5t-190.5 286T1245 1721t-349 71q-182 0-348-71t-286-191t-191-286T0 896t71-348t191-286T548 71T896 0t348 71t286 191t191 286t71 348"></path>
                </svg>
            </div>
            <p>Aucune photo de profil téléchargée.</p>
        @endif
    </div>
</body>
</html>

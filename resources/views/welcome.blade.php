<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Application de Devis</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx') <!-- Utilisation de Vite pour charger le script principal -->
</head>
<body>
    <div id="root">
        <!-- Mon composant React principal -->
        <!-- Cette div sera remplie par React Router avec le contenu de mes composants -->
    </div>
</body>
</html>

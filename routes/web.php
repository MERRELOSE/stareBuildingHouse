<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route pour les pages spécifiques de Laravel (si nécessaire)
Route::get('/', function () {
    return view('welcome');
});

// Route pour toutes les autres pages (capturées par React Router)
Route::get('/{any}', function () {
    return view('welcome'); // Le fichier Blade principal qui contient votre application React
})->where('any', '.*');

// Route pour le traitement du formulaire d'inscription via une API dédiée
Route::post('/api/signup', [AuthController::class, 'register'])->name('api.signup');

// Route pour le traitement du formulaire de connexion via une API dédiée
Route::post('/api/login', [AuthController::class, 'login'])->name('api.login');


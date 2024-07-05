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

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

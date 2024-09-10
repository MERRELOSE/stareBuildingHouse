<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Route pour l'inscription
Route::post('/signup', [AuthController::class, 'register']);

// Route pour la connexion
Route::post('/login', [AuthController::class, 'login']);

//Route pour la page d'accueil
Route::post('/', [AuthController::class, 'index']);


Route::middleware('auth:api')->group(function () {
    // Route pour télécharger une nouvelle photo de profil
    Route::post('/upload-profile-photo', [AuthController::class, 'uploadProfilePhoto']);
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::put('/user', [AuthController::class, 'updateUser']);
    
});
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

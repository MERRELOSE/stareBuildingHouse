<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
{
    try {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed', // 'confirmed' gère password_confirmation
        ]);
    
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    
        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
    
        // Réponse avec succès
        return response()->json([
            'success' => true,
            'message' => 'User registered successfully'
        ], 201);
    
    } catch (ValidationException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 400);
    
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Registration failed. Please try again.',
            'error' => $e->getMessage()
        ], 500);
    }
}

    /**
     * Handle user login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try {
            // Validation des données
            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                // Authentification réussie
                $user = Auth::user();
                $token = $user->createToken('authToken')->accessToken;

                return response()->json([
                    'success' => true,
                    'message' => 'Login successful',
                    'access_token' => $token,
                ]);
            }

            // Authentification échouée
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Login failed. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}


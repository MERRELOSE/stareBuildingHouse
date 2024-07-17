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
     * Gérer l'enregistrement des utilisateurs.
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
                'message' => 'L\'utilisateur s\'est enregistré avec succès.'
            ], 201);
        
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Échec de la validation.',
                'errors' => $e->errors()
            ], 400);
        
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'L\'enregistrement a échoué. Veuillez réessayer.',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    /**
    * Gérer la connexion des utilisateurs.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\JsonResponse
    */
   public function login(Request $request)
   {
       try {
           $validator = Validator::make($request->all(), [
               'email' => 'required|string|email',
               'password' => 'required|string',
           ]);

           if ($validator->fails()) {
               throw new ValidationException($validator);
           }

           // Tentative de connexion
           if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
               $user = Auth::user();
               
               return response()->json([
                   'success' => true,
                   'message' => 'Connexion réussie.',
                   'user' => $user,
               ]);
           } else {
               return response()->json([
                   'success' => false,
                   'message' => 'Informations d\'identification invalides.',
               ], 401);
           }
       } catch (\Exception $e) {
           return response()->json([
               'success' => false,
               'message' => 'La connexion a échoué. Veuillez réessayer.',
               'error' => $e->getMessage()
           ], 500);
       }
   }

    /**
     * Méthode pour la page d'accueil (exemple)
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        return response()->json(['message' => 'Welcome to the home page!'], 200);
    }
}

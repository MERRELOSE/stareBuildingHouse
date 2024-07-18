<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = ['user_id']; // Ajoutez d'autres colonnes remplissables ici

    // Relation avec le modèle User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'image_path',
        'description',
        'status',
        'created_by',
        'updated_by',	
    ];
    public function task() : mixed {
        return $this->hasMany(Task::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class,'created_by');
    }
    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }
}

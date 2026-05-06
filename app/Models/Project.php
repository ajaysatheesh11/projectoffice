<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['category_id', 'title', 'description', 'image', 'link'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

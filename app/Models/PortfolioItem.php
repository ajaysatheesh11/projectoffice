<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'summary',
        'project_url',
        'image_path',
        'image_alt',
        'accent_color',
        'is_published',
        'featured_on_home',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'featured_on_home' => 'boolean',
        ];
    }
}

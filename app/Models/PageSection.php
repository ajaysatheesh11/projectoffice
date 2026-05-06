<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageSection extends Model
{
    protected $fillable = [
        'page_content_id',
        'section_key',
        'label',
        'eyebrow',
        'title',
        'subtitle',
        'content',
        'items',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'items' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function page(): BelongsTo
    {
        return $this->belongsTo(PageContent::class, 'page_content_id');
    }
}

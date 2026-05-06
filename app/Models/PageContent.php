<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PageContent extends Model
{
    protected $fillable = [
        'page_key',
        'label',
        'eyebrow',
        'title',
        'highlight',
        'subtitle',
        'description',
        'primary_cta_label',
        'primary_cta_href',
        'secondary_cta_label',
        'secondary_cta_href',
        'meta_title',
        'meta_description',
    ];

    public function sections(): HasMany
    {
        return $this->hasMany(PageSection::class)->orderBy('sort_order')->orderBy('id');
    }

    public function getRouteKeyName(): string
    {
        return 'page_key';
    }
}

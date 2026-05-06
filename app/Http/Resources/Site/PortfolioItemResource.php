<?php

namespace App\Http\Resources\Site;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PortfolioItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'summary' => $this->summary,
            'project_url' => $this->project_url,
            'image_url' => $this->image_path ? Storage::disk('public')->url($this->image_path) : null,
            'image_alt' => $this->image_alt ?: $this->title,
            'accent_color' => $this->accent_color,
            'sort_order' => $this->sort_order,
            'is_published' => (bool) $this->is_published,
            'featured_on_home' => (bool) $this->featured_on_home,
        ];
    }
}

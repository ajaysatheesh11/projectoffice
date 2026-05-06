<?php

namespace App\Http\Resources\Site;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageContentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'page_key' => $this->page_key,
            'label' => $this->label,
            'eyebrow' => $this->eyebrow,
            'title' => $this->title,
            'highlight' => $this->highlight,
            'subtitle' => $this->subtitle,
            'description' => $this->description,
            'primary_cta_label' => $this->primary_cta_label,
            'primary_cta_href' => $this->primary_cta_href,
            'secondary_cta_label' => $this->secondary_cta_label,
            'secondary_cta_href' => $this->secondary_cta_href,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'sections' => PageSectionResource::collection($this->whenLoaded('sections')),
        ];
    }
}

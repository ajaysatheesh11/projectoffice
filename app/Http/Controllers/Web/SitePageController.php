<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Site\PageContentResource;
use App\Http\Resources\Site\PageSectionResource;
use App\Http\Resources\Site\PortfolioItemResource;
use App\Http\Resources\Site\ServiceResource;
use App\Models\PageContent;
use App\Models\PortfolioItem;
use App\Models\Service;
use App\Support\SiteContent;
use Inertia\Inertia;
use Inertia\Response;

class SitePageController extends Controller
{
    public function about(): Response
    {
        return $this->render('Company/About', 'about');
    }

    public function services(): Response
    {
        return $this->render('Services/Index', 'services', [
            'services' => ServiceResource::collection(
                Service::query()->where('is_active', true)->orderBy('sort_order')->orderBy('name')->get()
            )->resolve(),
        ]);
    }

    public function portfolio(): Response
    {
        return $this->render('Portfolio/Index', 'portfolio', [
            'items' => PortfolioItemResource::collection(
                PortfolioItem::query()->where('is_published', true)->orderBy('sort_order')->orderBy('title')->get()
            )->resolve(),
        ]);
    }

    public function contact(): Response
    {
        return $this->render('Contact/Index', 'contact');
    }

    public function quote(): Response
    {
        return $this->render('Quote/Index', 'quote', [
            'services' => ServiceResource::collection(
                Service::query()->where('is_active', true)->orderBy('sort_order')->orderBy('name')->get()
            )->resolve(),
        ]);
    }

    private function render(string $component, string $pageKey, array $props = []): Response
    {
        SiteContent::ensureDefaults();
        $page = PageContent::query()->with('sections')->where('page_key', $pageKey)->firstOrFail();

        return Inertia::render($component, [
            'seo' => [
                'title' => $page->meta_title ?: $page->title,
                'description' => $page->meta_description ?: $page->description,
            ],
            'pageContent' => PageContentResource::make($page)->resolve(),
            'sections' => PageSectionResource::collection($page->sections)->resolve(),
            ...$props,
        ]);
    }
}

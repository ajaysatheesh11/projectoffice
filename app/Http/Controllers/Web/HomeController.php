<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Site\PageContentResource;
use App\Http\Resources\Site\PageSectionResource;
use App\Http\Resources\Site\PortfolioItemResource;
use App\Models\PageContent;
use App\Models\PortfolioItem;
use App\Support\SiteContent;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        SiteContent::ensureDefaults();
        $page = PageContent::query()->with('sections')->where('page_key', 'home')->firstOrFail();

        return Inertia::render('Home/Index', [
            'seo' => [
                'title' => $page->meta_title ?: $page->title,
                'description' => $page->meta_description ?: $page->description,
            ],
            'pageContent' => PageContentResource::make($page)->resolve(),
            'sections' => PageSectionResource::collection($page->sections)->resolve(),
            'featuredProjects' => PortfolioItemResource::collection(
                PortfolioItem::query()
                    ->where('is_published', true)
                    ->where('featured_on_home', true)
                    ->orderBy('sort_order')
                    ->orderBy('title')
                    ->limit(4)
                    ->get()
            )->resolve(),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpsertPortfolioItemRequest;
use App\Models\PageContent;
use App\Models\PortfolioItem;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function index(): Response
    {
        SiteContent::ensureDefaults();

        return Inertia::render('Admin/Portfolio/Index', [
            'seo' => [
                'title' => 'Manage Portfolio',
                'description' => 'Create and manage portfolio items.',
            ],
            'pageContent' => PageContent::query()->where('page_key', 'portfolio')->first(),
            'items' => PortfolioItem::query()
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get()
                ->map(fn (PortfolioItem $item) => [
                    ...$item->toArray(),
                    'image_url' => $item->image_path ? Storage::disk('public')->url($item->image_path) : null,
                ]),
        ]);
    }

    public function store(UpsertPortfolioItemRequest $request): RedirectResponse
    {
        $data = $this->validatedData($request);

        PortfolioItem::create([
            ...$data,
            'slug' => Str::slug($data['title'].'-'.Str::random(4)),
            'sort_order' => $data['sort_order'] ?? 0,
            'is_published' => $request->boolean('is_published'),
            'featured_on_home' => $request->boolean('featured_on_home', true),
        ]);

        return back()->with('success', 'Portfolio item created.');
    }

    public function update(UpsertPortfolioItemRequest $request, PortfolioItem $portfolio): RedirectResponse
    {
        $data = $this->validatedData($request, $portfolio);

        $portfolio->update([
            ...$data,
            'slug' => Str::slug($data['title'].'-'.$portfolio->id),
            'sort_order' => $data['sort_order'] ?? 0,
            'is_published' => $request->boolean('is_published'),
            'featured_on_home' => $request->boolean('featured_on_home', true),
        ]);

        return back()->with('success', 'Portfolio item updated.');
    }

    public function destroy(PortfolioItem $portfolio): RedirectResponse
    {
        if ($portfolio->image_path) {
            Storage::disk('public')->delete($portfolio->image_path);
        }

        $portfolio->delete();

        return back()->with('success', 'Portfolio item deleted.');
    }

    protected function validatedData(UpsertPortfolioItemRequest $request, ?PortfolioItem $portfolio = null): array
    {
        $data = $request->validated();

        unset($data['image']);

        if ($request->hasFile('image')) {
            if ($portfolio?->image_path) {
                Storage::disk('public')->delete($portfolio->image_path);
            }

            $data['image_path'] = $request->file('image')->store('portfolio', 'public');
        } elseif ($portfolio) {
            $data['image_path'] = $portfolio->image_path;
        }

        return $data;
    }
}

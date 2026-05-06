<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpsertPageContentRequest;
use App\Models\PageContent;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageContentController extends Controller
{
    public function edit(PageContent $page): Response
    {
        SiteContent::ensureDefaults();

        return Inertia::render('Admin/Pages/Edit', [
            'seo' => [
                'title' => "Edit {$page->label}",
                'description' => "Edit {$page->label} page content.",
            ],
            'page' => $page,
            'sections' => $page->sections()->get()->map(fn ($section) => [
                ...$section->toArray(),
                'items_json' => $section->items ? json_encode($section->items, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) : '',
            ]),
        ]);
    }

    public function update(UpsertPageContentRequest $request, PageContent $page): RedirectResponse
    {
        $page->update($request->validated());

        return back()->with('success', "{$page->label} content updated.");
    }
}

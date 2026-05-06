<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpsertServiceRequest;
use App\Models\PageContent;
use App\Models\Service;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        SiteContent::ensureDefaults();

        return Inertia::render('Admin/Services/Index', [
            'seo' => [
                'title' => 'Manage Services',
                'description' => 'Create and manage service entries.',
            ],
            'pageContent' => PageContent::query()->where('page_key', 'services')->first(),
            'services' => Service::query()->orderBy('sort_order')->orderBy('name')->get(),
        ]);
    }

    public function store(UpsertServiceRequest $request): RedirectResponse
    {
        $data = $request->validated();

        Service::create([
            ...$data,
            'slug' => Str::slug($data['name'].'-'.Str::random(4)),
            'sort_order' => $data['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active'),
        ]);

        return back()->with('success', 'Service created.');
    }

    public function update(UpsertServiceRequest $request, Service $service): RedirectResponse
    {
        $data = $request->validated();

        $service->update([
            ...$data,
            'slug' => Str::slug($data['name'].'-'.$service->id),
            'sort_order' => $data['sort_order'] ?? 0,
            'is_active' => $request->boolean('is_active'),
        ]);

        return back()->with('success', 'Service updated.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return back()->with('success', 'Service deleted.');
    }
}

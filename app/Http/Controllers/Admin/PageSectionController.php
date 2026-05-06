<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpsertPageSectionRequest;
use App\Models\PageSection;
use Illuminate\Http\RedirectResponse;

class PageSectionController extends Controller
{
    public function store(UpsertPageSectionRequest $request): RedirectResponse
    {
        PageSection::create($request->validatedSectionData());

        return back()->with('success', 'Page section created.');
    }

    public function update(UpsertPageSectionRequest $request, PageSection $pageSection): RedirectResponse
    {
        $pageSection->update($request->validatedSectionData());

        return back()->with('success', 'Page section updated.');
    }

    public function destroy(PageSection $pageSection): RedirectResponse
    {
        $pageSection->delete();

        return back()->with('success', 'Page section deleted.');
    }
}

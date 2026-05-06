<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class QuoteRequestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/QuoteRequests/Index', [
            'seo' => [
                'title' => 'Quote Requests',
                'description' => 'Review and manage inbound quote requests.',
            ],
            'requests' => QuoteRequest::query()->with('service')->latest()->get(),
        ]);
    }

    public function update(QuoteRequest $quoteRequest): RedirectResponse
    {
        $quoteRequest->update([
            'read_at' => $quoteRequest->read_at ? null : CarbonImmutable::now(),
        ]);

        return back()->with('success', 'Quote request status updated.');
    }

    public function destroy(QuoteRequest $quoteRequest): RedirectResponse
    {
        $quoteRequest->delete();

        return back()->with('success', 'Quote request deleted.');
    }
}

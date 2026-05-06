<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Web\StoreQuoteRequest;
use App\Models\QuoteRequest;
use Illuminate\Http\RedirectResponse;

class QuoteRequestController extends Controller
{
    public function store(StoreQuoteRequest $request): RedirectResponse
    {
        QuoteRequest::create($request->validated());

        return back()->with('success', 'Your quote request has been submitted. We will review it and follow up shortly.');
    }
}

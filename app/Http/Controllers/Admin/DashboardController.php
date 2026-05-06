<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\PageContent;
use App\Models\PageSection;
use App\Models\QuoteRequest;
use App\Support\SiteContent;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        SiteContent::ensureDefaults();

        return Inertia::render('Admin/Dashboard', [
            'seo' => [
                'title' => 'Dashboard — Auxio Admin',
                'description' => 'Auxio Technologies admin dashboard.',
            ],
        ]);
    }
}

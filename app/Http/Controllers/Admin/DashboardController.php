<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Support\SiteContent;

class DashboardController extends Controller
{
    public function __invoke(): RedirectResponse
    {
        SiteContent::ensureDefaults();

        return redirect()->route('admin.pages.home.edit');
    }
}

<?php

use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageContentController;
use App\Http\Controllers\Admin\PageSectionController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Controllers\Web\ContactMessageController;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\QuoteRequestController;
use App\Http\Controllers\Web\SitePageController;
use Illuminate\Support\Facades\Route;

Route::name('web.')->group(function (): void {
    Route::redirect('/login', '/admin/login');
    Route::get('/', HomeController::class)->name('home');
    Route::get('/about', [SitePageController::class, 'about'])->name('about');
    Route::get('/services', [SitePageController::class, 'services'])->name('services');
    Route::get('/portfolio', [SitePageController::class, 'portfolio'])->name('portfolio');
    Route::get('/contact', [SitePageController::class, 'contact'])->name('contact');
    Route::get('/quote', [SitePageController::class, 'quote'])->name('quote');
    Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');
    Route::post('/quote', [QuoteRequestController::class, 'store'])->name('quote.store');
});

Route::prefix('admin')
    ->name('admin.')
    ->group(function (): void {
        Route::middleware('guest')->group(function (): void {
            Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
            Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
        });

        Route::middleware(['auth', EnsureUserIsAdmin::class])->group(function (): void {
            Route::get('/', DashboardController::class)->name('dashboard');
            Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

            Route::get('/pages/home', [PageContentController::class, 'edit'])->defaults('page', 'home')->name('pages.home.edit');
            Route::put('/pages/home', [PageContentController::class, 'update'])->defaults('page', 'home')->name('pages.home.update');
            Route::get('/pages/contact', [PageContentController::class, 'edit'])->defaults('page', 'contact')->name('pages.contact.edit');
            Route::put('/pages/contact', [PageContentController::class, 'update'])->defaults('page', 'contact')->name('pages.contact.update');
            Route::resource('page-sections', PageSectionController::class)->only(['store', 'update', 'destroy']);
            
            Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
            Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class);
        });
    });

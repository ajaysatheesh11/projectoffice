<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ContactMessages/Index', [
            'seo' => [
                'title' => 'Contact Messages',
                'description' => 'Review and manage inbound contact messages.',
            ],
            'messages' => ContactMessage::query()->latest()->get(),
        ]);
    }

    public function update(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->update([
            'read_at' => $contactMessage->read_at ? null : CarbonImmutable::now(),
        ]);

        return back()->with('success', 'Contact message status updated.');
    }

    public function destroy(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return back()->with('success', 'Contact message deleted.');
    }
}

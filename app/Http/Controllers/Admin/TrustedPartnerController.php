<?php

namespace App\Http\Controllers\Admin;

use App\Models\TrustedPartner;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TrustedPartnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/TrustedPartners/Index', [
            'partners' => TrustedPartner::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/TrustedPartners/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('partners', 'public');
        }

        TrustedPartner::create($data);

        return redirect()->route('admin.trusted-partners.index')->with('success', 'Partner added successfully.');
    }

    public function edit(TrustedPartner $trustedPartner)
    {
        return Inertia::render('Admin/TrustedPartners/Edit', [
            'partner' => $trustedPartner
        ]);
    }

    public function update(Request $request, TrustedPartner $trustedPartner)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            if ($trustedPartner->image) {
                Storage::disk('public')->delete($trustedPartner->image);
            }
            $data['image'] = $request->file('image')->store('partners', 'public');
        }

        $trustedPartner->update($data);

        return redirect()->route('admin.trusted-partners.index')->with('success', 'Partner updated successfully.');
    }

    public function destroy(TrustedPartner $trustedPartner)
    {
        if ($trustedPartner->image) {
            Storage::disk('public')->delete($trustedPartner->image);
        }
        $trustedPartner->delete();

        return redirect()->route('admin.trusted-partners.index')->with('success', 'Partner deleted successfully.');
    }
}

<?php

namespace Tests\Feature;

use App\Models\PageContent;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Home/Index')
            ->where('pageContent.page_key', 'home')
            ->has('sections', 3)
        );
    }

    public function test_contact_form_submissions_are_stored(): void
    {
        $response = $this->post('/contact', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '9999999999',
            'subject' => 'Project discussion',
            'message' => 'I would like to discuss a new marketing website for our company.',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('contact_messages', [
            'email' => 'jane@example.com',
            'subject' => 'Project discussion',
        ]);
    }

    public function test_quote_requests_are_stored(): void
    {
        $service = Service::create([
            'name' => 'Custom Development',
            'slug' => 'custom-development',
            'summary' => 'Custom software delivery',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $response = $this->post('/quote', [
            'name' => 'John Founder',
            'email' => 'john@example.com',
            'company' => 'Acme Labs',
            'phone' => '8888888888',
            'service_id' => $service->id,
            'budget' => 'INR 1L - 3L',
            'timeline' => '6 weeks',
            'reference' => 'https://example.com/reference',
            'brief' => 'We need a custom lead-generation website with admin controls and strong performance.',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('quote_requests', [
            'email' => 'john@example.com',
            'service_id' => $service->id,
        ]);
    }

    public function test_admin_can_create_page_sections(): void
    {
        $user = User::factory()->create([
            'is_admin' => true,
        ]);
        $page = PageContent::create([
            'page_key' => 'landing',
            'label' => 'Landing',
            'eyebrow' => 'Landing',
            'title' => 'Landing Page',
            'description' => 'Landing page description',
        ]);

        $response = $this->actingAs($user)->post('/admin/page-sections', [
            'page_content_id' => $page->id,
            'section_key' => 'proof_points',
            'label' => 'Proof Points',
            'title' => 'Why teams choose us',
            'items_json' => '[{"title":"Fast delivery","description":"Launches stay on schedule."}]',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('page_sections', [
            'page_content_id' => $page->id,
            'section_key' => 'proof_points',
            'label' => 'Proof Points',
        ]);
    }

    public function test_quote_page_receives_dynamic_services_from_database(): void
    {
        $service = Service::create([
            'name' => 'ERP Implementation',
            'slug' => 'erp-implementation',
            'summary' => 'ERP delivery',
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $response = $this->get('/quote');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Quote/Index')
            ->has('services')
            ->where('services.0.id', $service->id)
        );
    }
}

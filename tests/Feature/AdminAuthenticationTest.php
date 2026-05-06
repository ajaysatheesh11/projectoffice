<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_admin_login(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect(route('admin.login'));
    }

    public function test_admin_can_log_in_and_view_dashboard(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => 'secret123',
            'is_admin' => true,
        ]);

        $loginResponse = $this->post('/admin/login', [
            'email' => $user->email,
            'password' => 'secret123',
        ]);

        $loginResponse->assertRedirect(route('admin.dashboard'));
        $this->assertAuthenticatedAs($user);

        $dashboardResponse = $this->get('/admin');
        $dashboardResponse->assertRedirect(route('admin.pages.home.edit'));
    }

    public function test_non_admin_cannot_log_in_to_admin_area(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'secret123',
            'is_admin' => false,
        ]);

        $response = $this->post('/admin/login', [
            'email' => $user->email,
            'password' => 'secret123',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_authenticated_non_admin_is_redirected_away_from_admin_area(): void
    {
        $user = User::factory()->create([
            'is_admin' => false,
        ]);

        $response = $this->actingAs($user)->get('/admin');

        $response->assertRedirect(route('web.home'));
    }
}

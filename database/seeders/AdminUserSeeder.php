<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@auxio.in');
        $name = env('ADMIN_NAME', 'Admin User');
        $password = (string) env('ADMIN_PASSWORD', '');

        if ($password === '') {
            if (app()->environment('production')) {
                throw new RuntimeException('ADMIN_PASSWORD must be set before running the admin seeder in production.');
            }

            $password = 'password';
        }

        if (app()->environment('production') && in_array(strtolower($password), ['password', 'changeme', 'change-me'], true)) {
            throw new RuntimeException('ADMIN_PASSWORD must be changed to a strong unique value before production seeding.');
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => $password,
                'is_admin' => true,
            ]
        );
    }
}

<?php

namespace Database\Seeders;

use App\Support\SiteContent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        SiteContent::ensureDefaults();

        $this->call([
            AdminUserSeeder::class,
        ]);
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolio_items', function (Blueprint $table): void {
            $table->string('image_path')->nullable()->after('project_url');
            $table->string('image_alt')->nullable()->after('image_path');
            $table->string('accent_color', 20)->nullable()->after('image_alt');
            $table->boolean('featured_on_home')->default(true)->after('is_published');
        });
    }

    public function down(): void
    {
        Schema::table('portfolio_items', function (Blueprint $table): void {
            $table->dropColumn([
                'image_path',
                'image_alt',
                'accent_color',
                'featured_on_home',
            ]);
        });
    }
};

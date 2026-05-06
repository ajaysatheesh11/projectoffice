<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('page_contents', function (Blueprint $table) {
            $table->string('primary_cta_label')->nullable()->after('description');
            $table->string('primary_cta_href')->nullable()->after('primary_cta_label');
            $table->string('secondary_cta_label')->nullable()->after('primary_cta_href');
            $table->string('secondary_cta_href')->nullable()->after('secondary_cta_label');
        });
    }

    public function down(): void
    {
        Schema::table('page_contents', function (Blueprint $table) {
            $table->dropColumn([
                'primary_cta_label',
                'primary_cta_href',
                'secondary_cta_label',
                'secondary_cta_href',
            ]);
        });
    }
};

<?php

namespace App\Support;

use App\Models\PageContent;
use App\Models\PageSection;
use App\Models\PortfolioItem;
use App\Models\Service;
use Illuminate\Support\Str;

class SiteContent
{
    public static function ensureDefaults(): void
    {
        foreach (self::pageDefaults() as $pageKey => $content) {
            $page = PageContent::firstOrCreate(
                ['page_key' => $pageKey],
                ['label' => $content['label'], ...$content]
            );

            $page->fill(array_filter([
                'primary_cta_label' => $page->primary_cta_label ?: ($content['primary_cta_label'] ?? null),
                'primary_cta_href' => $page->primary_cta_href ?: ($content['primary_cta_href'] ?? null),
                'secondary_cta_label' => $page->secondary_cta_label ?: ($content['secondary_cta_label'] ?? null),
                'secondary_cta_href' => $page->secondary_cta_href ?: ($content['secondary_cta_href'] ?? null),
            ], fn ($value) => filled($value)));

            if ($page->isDirty()) {
                $page->save();
            }

            foreach (self::pageSectionDefaults()[$pageKey] ?? [] as $index => $section) {
                PageSection::firstOrCreate(
                    [
                        'page_content_id' => $page->id,
                        'section_key' => $section['section_key'],
                    ],
                    [
                        ...$section,
                        'sort_order' => $section['sort_order'] ?? ($index + 1),
                        'is_active' => $section['is_active'] ?? true,
                    ]
                );
            }
        }

        if (Service::count() === 0) {
            foreach (self::serviceDefaults() as $index => $service) {
                Service::create([
                    ...$service,
                    'slug' => Str::slug($service['name']),
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]);
            }
        }

        if (PortfolioItem::count() === 0) {
            foreach (self::portfolioDefaults() as $index => $project) {
                PortfolioItem::create([
                    ...$project,
                    'slug' => Str::slug($project['title']),
                    'sort_order' => $index + 1,
                    'is_published' => true,
                ]);
            }
        }
    }

    public static function pageDefaults(): array
    {
        return [
            'home' => [
                'label' => 'Home',
                'eyebrow' => 'Auxio Technologies Private Limited',
                'title' => 'Building',
                'highlight' => 'sharp digital systems',
                'subtitle' => 'for ambitious brands.',
                'description' => 'We help businesses launch modern websites, digital products, and performance-focused experiences with clear structure and premium presentation.',
                'primary_cta_label' => 'Get a Quote',
                'primary_cta_href' => '/quote',
                'secondary_cta_label' => 'Explore Services',
                'secondary_cta_href' => '/services',
                'meta_title' => 'Auxio Technologies Private Limited',
                'meta_description' => 'Auxio Technologies Private Limited official company website.',
            ],
            'about' => [
                'label' => 'About Us',
                'eyebrow' => 'About Us',
                'title' => 'We combine product thinking, design clarity, and dependable engineering.',
                'highlight' => '',
                'subtitle' => '',
                'description' => 'Auxio is built to help brands present themselves better online and operate with stronger digital systems underneath.',
                'primary_cta_label' => 'Start a Project',
                'primary_cta_href' => '/quote',
                'meta_title' => 'About Us',
                'meta_description' => 'About Us | Auxio Technologies Private Limited',
            ],
            'services' => [
                'label' => 'Services',
                'eyebrow' => 'Services',
                'title' => 'Digital services designed to help businesses look stronger and operate smarter.',
                'highlight' => '',
                'subtitle' => '',
                'description' => 'Each service can later be connected to detailed landing pages, pricing blocks, testimonials, and inquiry workflows.',
                'primary_cta_label' => 'Request a Quote',
                'primary_cta_href' => '/quote',
                'meta_title' => 'Services',
                'meta_description' => 'Services | Auxio Technologies Private Limited',
            ],
            'portfolio' => [
                'label' => 'Portfolio',
                'eyebrow' => 'Portfolio',
                'title' => 'A project grid ready for real case studies, launches, and showcase pages.',
                'highlight' => '',
                'subtitle' => '',
                'description' => 'This structure is intentionally dynamic-ready so completed projects can later be fed from admin or database content.',
                'primary_cta_label' => 'Discuss a Similar Project',
                'primary_cta_href' => '/quote',
                'meta_title' => 'Portfolio',
                'meta_description' => 'Portfolio | Auxio Technologies Private Limited',
            ],
            'contact' => [
                'label' => 'Contact',
                'eyebrow' => 'Contact',
                'title' => "Let's talk about your next digital project.",
                'highlight' => '',
                'subtitle' => '',
                'description' => 'Use this contact form layout now, and we can wire submission handling, validation, and CRM delivery in the next phase.',
                'primary_cta_label' => 'Send a Message',
                'meta_title' => 'Contact',
                'meta_description' => 'Contact | Auxio Technologies Private Limited',
            ],
            'quote' => [
                'label' => 'Get a Quote',
                'eyebrow' => 'Get a Quote',
                'title' => 'Share your requirement and we will shape the right build path.',
                'highlight' => '',
                'subtitle' => '',
                'description' => 'This quote page is structured for future backend integration with inquiry storage, project type mapping, and follow-up workflows.',
                'primary_cta_label' => 'Request Quote',
                'meta_title' => 'Get a Quote',
                'meta_description' => 'Get a Quote | Auxio Technologies Private Limited',
            ],
        ];
    }

    public static function pageSectionDefaults(): array
    {
        return [
            'home' => [
                [
                    'section_key' => 'stats',
                    'label' => 'Stats',
                    'items' => [
                        ['value' => '06', 'label' => 'Core service areas'],
                        ['value' => '24/7', 'label' => 'Digital-first collaboration'],
                        ['value' => '100%', 'label' => 'Responsive build approach'],
                    ],
                ],
                [
                    'section_key' => 'highlights',
                    'label' => 'Highlights',
                    'eyebrow' => 'Why Auxio',
                    'title' => 'A reusable structure for presenting capability, confidence, and next steps.',
                    'content' => 'A modular homepage section that can later evolve into CMS-driven highlights, testimonials, or service teasers.',
                    'items' => [
                        ['title' => 'Strategy-led design', 'description' => 'Layouts and journeys shaped around messaging clarity, trust, and conversion.'],
                        ['title' => 'Engineering that scales', 'description' => 'Clean React and Laravel foundations ready for future CMS, forms, and integrations.'],
                        ['title' => 'Fast launch cycles', 'description' => 'Reusable components and modular sections make new pages and updates straightforward.'],
                    ],
                ],
                [
                    'section_key' => 'featured_projects',
                    'label' => 'Featured Projects',
                    'eyebrow' => 'Selected Work',
                    'title' => 'Product showcases shaped to feel immediate, visual, and business-ready.',
                    'content' => 'Feature your strongest builds on the homepage with bold color blocks, real screenshots, and clear project positioning.',
                ],
            ],
            'about' => [
                [
                    'section_key' => 'pillars',
                    'label' => 'Pillars',
                    'items' => [
                        ['title' => 'Design language', 'description' => 'Bold, structured interfaces tailored to the tone and trust level your brand needs.'],
                        ['title' => 'Development quality', 'description' => 'Component-driven implementation with modern frontend structure and maintainable routing.'],
                        ['title' => 'Business alignment', 'description' => 'Every page, card, and CTA is prepared to support real services, portfolios, and inquiries.'],
                    ],
                ],
            ],
            'contact' => [
                [
                    'section_key' => 'contact_details',
                    'label' => 'Contact Details',
                    'items' => [
                        ['label' => 'Email', 'value' => 'hello@auxio.in'],
                        ['label' => 'Availability', 'value' => 'WhatsApp and email support available'],
                        ['label' => 'Delivery model', 'value' => 'Remote-first delivery across India and beyond'],
                    ],
                ],
            ],
            'quote' => [
                [
                    'section_key' => 'quote_highlights',
                    'label' => 'Quote Highlights',
                    'items' => [
                        ['title' => 'Project type selection and service-based routing'],
                        ['title' => 'Future validation, storage, and admin review workflow'],
                        ['title' => 'Quote requests with timeline and budget filters'],
                    ],
                ],
                [
                    'section_key' => 'budget_options',
                    'label' => 'Budget Options',
                    'items' => [
                        ['title' => 'Below INR 50k'],
                        ['title' => 'INR 50k - 1L'],
                        ['title' => 'INR 1L - 3L'],
                        ['title' => 'INR 3L+'],
                    ],
                ],
            ],
        ];
    }

    public static function serviceDefaults(): array
    {
        return [
            ['name' => 'Web Design & Development', 'summary' => 'High-performance company websites, landing pages, and custom business platforms.'],
            ['name' => 'eCommerce Development', 'summary' => 'Online storefronts focused on product presentation, checkout flow, and easy management.'],
            ['name' => 'Mobile App Development', 'summary' => 'Cross-platform mobile experiences with scalable UI systems and API-ready architecture.'],
            ['name' => 'ERP & CRM Development', 'summary' => 'Internal tools for operations, customer management, and process visibility.'],
            ['name' => 'Digital Marketing', 'summary' => 'Campaign-ready pages, messaging support, and growth-focused digital presentation.'],
            ['name' => 'AI Video Creation', 'summary' => 'Creative AI-assisted video assets for launches, explainers, and branded content needs.'],
        ];
    }

    public static function portfolioDefaults(): array
    {
        return [
            ['title' => 'Corporate Website Redesign', 'category' => 'Web Design', 'summary' => 'Placeholder summary for a premium brand website rebuild.', 'project_url' => null, 'accent_color' => '#f3cd69', 'featured_on_home' => true],
            ['title' => 'eCommerce Launch Platform', 'category' => 'Commerce', 'summary' => 'Placeholder summary for catalog, checkout, and campaign work.', 'project_url' => null, 'accent_color' => '#9ec91d', 'featured_on_home' => true],
            ['title' => 'Operational Dashboard', 'category' => 'ERP / CRM', 'summary' => 'Placeholder summary for custom internal workflow tools.', 'project_url' => null, 'accent_color' => '#4d31a9', 'featured_on_home' => true],
            ['title' => 'Mobile Service App', 'category' => 'Mobile App', 'summary' => 'Placeholder summary for a user-facing mobile product experience.', 'project_url' => null, 'accent_color' => '#d61c88', 'featured_on_home' => true],
            ['title' => 'Marketing Funnel System', 'category' => 'Digital Marketing', 'summary' => 'Placeholder summary for lead capture and landing page optimization.', 'project_url' => null, 'accent_color' => '#1f7d83', 'featured_on_home' => false],
            ['title' => 'AI Video Campaign Kit', 'category' => 'AI Video', 'summary' => 'Placeholder summary for AI-assisted social and ad creative production.', 'project_url' => null, 'accent_color' => '#ea5d3c', 'featured_on_home' => false],
        ];
    }
}

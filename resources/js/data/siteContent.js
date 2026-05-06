export const siteNavigation = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
    { label: 'Get a Quote', href: '/quote', highlight: true },
];

export const companyProfile = {
    name: 'Auxio Technologies Private Limited',
    shortName: 'Auxio Technologies',
    email: 'hello@auxio.in',
    location: 'Remote-first delivery across India and beyond',
    taglines: {
        primary: 'Modern digital experiences for ambitious brands.',
        secondary: 'Web, mobile, commerce, and automation systems designed to grow with your business.',
    },
};

export const homeContent = {
    primaryCta: { label: 'Get a Quote', href: '/quote' },
    secondaryCta: { label: 'Explore Services', href: '/services' },
    stats: [
        { value: '06', label: 'Core service areas' },
        { value: '24/7', label: 'Digital-first collaboration' },
        { value: '100%', label: 'Responsive build approach' },
    ],
    highlights: [
        {
            title: 'Strategy-led design',
            description: 'Layouts and journeys shaped around messaging clarity, trust, and conversion.',
        },
        {
            title: 'Engineering that scales',
            description: 'Clean React and Laravel foundations ready for future CMS, forms, and integrations.',
        },
        {
            title: 'Fast launch cycles',
            description: 'Reusable components and modular sections make new pages and updates straightforward.',
        },
    ],
};

export const aboutPillars = [
        {
            title: 'Design language',
            description: 'Bold, structured interfaces tailored to the tone and trust level your brand needs.',
        },
        {
            title: 'Development quality',
            description: 'Component-driven implementation with modern frontend structure and maintainable routing.',
        },
        {
            title: 'Business alignment',
            description: 'Every page, card, and CTA is prepared to support real services, portfolios, and inquiries.',
        },
    ];

export const contactDetails = [
    { label: 'Email', value: companyProfile.email },
    { label: 'Availability', value: 'WhatsApp and email support available' },
    { label: 'Delivery model', value: companyProfile.location },
];

export const quoteContent = {
    projectTypes: [
        'Web Design & Development',
        'eCommerce Development',
        'Mobile App Development',
        'ERP & CRM Development',
        'Digital Marketing',
        'AI Video Creation',
    ],
};

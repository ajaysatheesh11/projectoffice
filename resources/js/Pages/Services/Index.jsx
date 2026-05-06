import SEO from '@/Components/SEO';
import Card from '@/Components/UI/Card';
import Section from '@/Components/UI/Section';
import AppLayout from '@/Layouts/AppLayout';

export default function Services({ seo, pageContent, services }) {
    return (
        <AppLayout>
            <SEO title={seo.title} description={seo.description} />

            <Section
                className="py-20"
                containerClassName="space-y-8"
                description={pageContent.description}
                eyebrow={pageContent.eyebrow}
                title={pageContent.title}
            >
                <div className="stagger-rise mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                        <Card key={service.id}>
                            <p className="text-sm uppercase tracking-[0.24em] text-white/35">Service</p>
                            <h2 className="mt-3 text-2xl font-semibold text-white">{service.name}</h2>
                            <p className="mt-4 text-base leading-7 text-white/60">{service.summary}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </AppLayout>
    );
}

import SEO from '@/Components/SEO';
import Card from '@/Components/UI/Card';
import Section from '@/Components/UI/Section';
import AppLayout from '@/Layouts/AppLayout';

export default function About({ seo, pageContent, sections = [] }) {
    const pillarsSection = sections.find((section) => section.section_key === 'pillars');

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
                <div className="stagger-rise mt-12 grid gap-4 md:grid-cols-3">
                    {(pillarsSection?.items ?? []).map((item) => (
                        <Card key={item.title}>
                            <p className="text-sm uppercase tracking-[0.24em] text-white/40">{item.title}</p>
                            <p className="mt-3 text-xl font-semibold text-white">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </AppLayout>
    );
}

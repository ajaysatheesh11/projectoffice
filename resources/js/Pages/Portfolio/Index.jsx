import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import ProjectShowcaseGrid from '@/Components/Site/ProjectShowcaseGrid';
import Section from '@/Components/UI/Section';
import AppLayout from '@/Layouts/AppLayout';

export default function Portfolio({ seo, pageContent, items }) {
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
                <div className="mt-12 space-y-8">
                    <ProjectShowcaseGrid items={items} />
                    <div className="flex justify-center">
                        <Button as="a" className="px-7" href="/quote">
                            Start a Similar Project
                        </Button>
                    </div>
                </div>
            </Section>
        </AppLayout>
    );
}

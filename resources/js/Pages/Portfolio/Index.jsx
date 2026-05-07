import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import ProjectShowcaseGrid from '@/Components/Site/ProjectShowcaseGrid';
import Section from '@/Components/UI/Section';
import AppLayout from '@/Layouts/AppLayout';

export default function Portfolio({ seo, pageContent, projects = [] }) {
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
                <div className="mt-12 space-y-16">
                    <ProjectShowcaseGrid items={projects} />

                    {projects.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02] py-24 text-center">
                            <div className="mb-4 text-3xl opacity-20">📂</div>
                            <h3 className="text-lg font-bold text-white/40">Portfolio coming soon</h3>
                            <p className="text-sm text-white/20">We're currently documenting our latest builds.</p>
                        </div>
                    )}

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

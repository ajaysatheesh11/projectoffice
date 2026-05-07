import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import Card from '@/Components/UI/Card';
import Container from '@/Components/UI/Container';
import Section from '@/Components/UI/Section';
import ProjectShowcaseGrid from '@/Components/Site/ProjectShowcaseGrid';
import AppLayout from '@/Layouts/AppLayout';

export default function HomeIndex({ seo, pageContent, sections = [] }) {
    const statsSection = sections.find((section) => section.section_key === 'stats');
    const highlightsSection = sections.find((section) => section.section_key === 'highlights');
    const titleLines = [pageContent.title, pageContent.highlight, pageContent.subtitle].filter(Boolean);

    return (
        <AppLayout>
            <SEO title={seo.title} description={seo.description} />

            <section className="relative overflow-hidden border-b border-lime-200/10">
                <Container className="pb-20 pt-12 md:pb-28 md:pt-16">
                    <div className="hero-stage grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10">
                        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:max-w-none lg:text-left">
                            <p className="hero-kicker inline-flex rounded-full border border-lime-300/20 bg-lime-300/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-lime-300">
                                {pageContent.eyebrow}
                            </p>
                            <h1 className="mt-8 text-4xl font-bold tracking-[-0.06em] text-white md:text-6xl lg:text-[5.2rem]">
                                {titleLines.map((line, index) => (
                                    <span
                                        key={`${line}-${index}`}
                                        className={`hero-title-line ${index === 1 ? 'text-lime-300' : 'text-white'}`}
                                        style={{ '--hero-line-delay': `${index * 160}ms` }}
                                    >
                                        <span className="hero-title-text">{line}</span>
                                    </span>
                                ))}
                            </h1>
                            <p className="hero-body mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60 md:text-xl lg:mx-0">
                                {pageContent.description}
                            </p>
                            {pageContent.primary_cta_label || pageContent.secondary_cta_label ? (
                                <div className="hero-actions mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                                    {pageContent.primary_cta_label ? (
                                        <Button as="a" href={pageContent.primary_cta_href || '/quote'} className="px-7">
                                            {pageContent.primary_cta_label}
                                        </Button>
                                    ) : null}
                                    {pageContent.secondary_cta_label ? (
                                        <Button as="a" href={pageContent.secondary_cta_href || '/services'} variant="secondary" className="px-7">
                                            {pageContent.secondary_cta_label}
                                        </Button>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        <div className="hero-visual-wrap relative mx-auto w-full max-w-xl lg:max-w-none">
                            <div className="hero-orbit-scene">
                                <div className="hero-orbit hero-orbit-back" />
                                <div className="hero-orbit hero-orbit-mid" />
                                <div className="hero-orbit hero-orbit-front" />
                                <div className="hero-core-glow" />
                                <div className="hero-core-grid">
                                    <div className="hero-core-panel">
                                        <span className="hero-core-badge">AUXIO</span>
                                        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-lime-300/75">Digital systems</p>
                                        <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white">Built to move</p>
                                        <p className="mt-4 max-w-xs text-sm leading-6 text-white/55">
                                            Interfaces, automation, and product motion shaped into a stronger brand presence.
                                        </p>
                                    </div>
                                </div>
                                <div className="hero-float-card hero-float-card-top">
                                    <span className="text-xs uppercase tracking-[0.28em] text-lime-300/70">Launch</span>
                                    <strong className="mt-3 block text-xl font-semibold text-white">Fast iterations</strong>
                                </div>
                                <div className="hero-float-card hero-float-card-bottom">
                                    <span className="text-xs uppercase tracking-[0.28em] text-lime-300/70">Systems</span>
                                    <strong className="mt-3 block text-xl font-semibold text-white">Layered growth</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stagger-rise mt-16 grid gap-4 md:grid-cols-3">
                        {(statsSection?.items ?? []).map((stat, index) => (
                            <Card key={stat.label} className="rounded-[2rem] p-8 text-center">
                                <p className="text-5xl font-bold tracking-[-0.06em] text-white">{stat.value ?? `0${index + 1}`}</p>
                                <p className="mt-3 text-sm uppercase tracking-[0.25em] text-white/45">{stat.label}</p>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {highlightsSection?.is_active ? (
                <Section
                    className="py-20"
                    containerClassName="space-y-6"
                    description={highlightsSection.content}
                    eyebrow={highlightsSection.eyebrow}
                    title={highlightsSection.title}
                >
                    <div className="stagger-rise mt-12 grid gap-4 md:grid-cols-3">
                        {(highlightsSection.items ?? []).map((item) => (
                            <Card key={item.title}>
                                <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
                                <p className="mt-3 text-base leading-7 text-white/60">{item.description}</p>
                            </Card>
                        ))}
                    </div>
                </Section>
            ) : null}


        </AppLayout>
    );
}

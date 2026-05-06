import Container from '@/Components/UI/Container';

export default function Section({
    eyebrow,
    title,
    description,
    children,
    className = '',
    containerClassName = '',
    align = 'left',
}) {
    const alignClass = align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-3xl';

    return (
        <section className={`fade-slide-in ${className}`}>
            <Container className={containerClassName}>
                {(eyebrow || title || description) && (
                    <div className={alignClass}>
                        {eyebrow ? (
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-lime-300">{eyebrow}</p>
                        ) : null}
                        {title ? (
                            <h1 className="mt-5 text-4xl font-bold tracking-[-0.05em] text-white md:text-6xl">{title}</h1>
                        ) : null}
                        {description ? (
                            <p className="mt-6 text-lg leading-8 text-white/60">{description}</p>
                        ) : null}
                    </div>
                )}
                {children}
            </Container>
        </section>
    );
}

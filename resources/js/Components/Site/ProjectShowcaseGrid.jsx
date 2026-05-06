function hexToRgb(hex) {
    if (!hex) {
        return null;
    }

    const normalized = hex.replace('#', '');
    const value = normalized.length === 3
        ? normalized.split('').map((char) => char + char).join('')
        : normalized;

    if (value.length !== 6) {
        return null;
    }

    const int = Number.parseInt(value, 16);

    return {
        r: (int >> 16) & 255,
        g: (int >> 8) & 255,
        b: int & 255,
    };
}

function getReadableTextColor(hex) {
    const rgb = hexToRgb(hex);

    if (!rgb) {
        return '#071108';
    }

    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

    return brightness > 150 ? '#071108' : '#f8fbf5';
}

function ShowcaseTile({ project, index }) {
    const accentColor = project.accent_color || '#9ec91d';
    const textColor = getReadableTextColor(accentColor);
    const imageOnRight = index % 2 === 0;

    return (
        <article
            className={`project-showcase-tile ${imageOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            style={{ '--project-accent': accentColor, '--project-text': textColor }}
        >
            <div className="project-showcase-copy">
                <p className="project-showcase-category">{project.category || 'Featured Project'}</p>
                <h3 className="project-showcase-title">{project.title}</h3>
                <p className="project-showcase-summary">{project.summary}</p>
                <div className="project-showcase-actions">
                    <a className="project-showcase-link" href={project.project_url || '/quote'}>
                        {project.project_url ? 'View Project' : 'Discuss Similar Build'}
                    </a>
                </div>
            </div>
            <div className="project-showcase-visual">
                {project.image_url ? (
                    <img alt={project.image_alt} className="project-showcase-image" src={project.image_url} />
                ) : (
                    <div className="project-showcase-placeholder">
                        <span>{project.title}</span>
                    </div>
                )}
            </div>
        </article>
    );
}

export default function ProjectShowcaseGrid({ items = [] }) {
    if (!items.length) {
        return null;
    }

    return (
        <div className="project-showcase-grid">
            {items.map((project, index) => (
                <ShowcaseTile key={project.id} index={index} project={project} />
            ))}
        </div>
    );
}

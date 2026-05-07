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

function truncate(text, limit = 150) {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
}

function ShowcaseTile({ project, index }) {
    const accentColor = '#9ec91d'; // Default lime accent
    const textColor = '#071108'; // Default dark text for lime bg
    const imageOnRight = index % 2 === 0;

    return (
        <article
            className={`project-showcase-tile ${imageOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            style={{ '--project-accent': accentColor, '--project-text': textColor }}
        >
            <div className="project-showcase-copy">
                <p className="project-showcase-category">{project.category?.name || 'Featured Project'}</p>
                <h3 className="project-showcase-title">{project.title}</h3>
                <p className="project-showcase-summary">{truncate(project.description)}</p>
                <div className="project-showcase-actions">
                    <a className="project-showcase-link" href={project.link || '/quote'}>
                        {project.link ? 'Website Link' : 'Website Link'}
                    </a>
                </div>
            </div>
            <div className="project-showcase-visual">
                {project.image ? (
                    <img alt={project.title} className="project-showcase-image" src={`/storage/${project.image}`} />
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

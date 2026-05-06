import Container from '@/Components/UI/Container';
import NavLink from '@/Components/UI/NavLink';
import { companyProfile, siteNavigation } from '@/data/siteContent';
import { Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Header() {
    const { url } = usePage();
    const [menuOpen, setMenuOpen] = useState(false);
    const currentPath = useMemo(() => url.split('?')[0] || '/', [url]);

    return (
        <header className="sticky top-0 z-30 border-b border-lime-200/10 bg-[#0b110b]/80 backdrop-blur-xl">
            <Container className="py-3 md:py-4">
                <div className="flex items-center justify-between gap-4">
                    <Link className="fade-slide-in flex items-center gap-3" href="/">
                        <img src="/images/image.png" alt="Auxio Logo" className="h-10 w-auto" decoding="async" fetchPriority="high" height="40" width="140" />
                    </Link>

                    <button
                        aria-controls="primary-navigation"
                        aria-expanded={menuOpen}
                        className="panel-elevated fade-slide-in inline-flex rounded-full px-4 py-2 text-sm font-medium text-white/80 md:hidden"
                        onClick={() => setMenuOpen((current) => ! current)}
                        type="button"
                    >
                        {menuOpen ? 'Close' : 'Menu'}
                    </button>

                    <nav className="stagger-rise hidden md:flex md:w-auto md:items-center md:justify-end md:gap-2" aria-label="Primary navigation">
                        {siteNavigation.map((item) => (
                            <NavLink key={item.href} currentPath={currentPath} highlight={item.highlight} href={item.href}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className={`overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <nav id="primary-navigation" className="panel-elevated mt-4 grid gap-2 rounded-[1.75rem] p-3" aria-label="Mobile navigation">
                        {siteNavigation.map((item) => (
                            <NavLink
                                key={item.href}
                                currentPath={currentPath}
                                highlight={item.highlight}
                                href={item.href}
                                onNavigate={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </Container>
        </header>
    );
}

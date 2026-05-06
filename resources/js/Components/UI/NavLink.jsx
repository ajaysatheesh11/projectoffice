import { Link } from '@inertiajs/react';

export default function NavLink({ href, children, highlight = false, currentPath = '/', onNavigate }) {
    const isActive = currentPath === href;

    const baseClass = highlight
        ? 'border border-lime-300/20 bg-lime-300/10 text-lime-200 hover:bg-lime-300 hover:text-slate-950'
        : 'text-white/70 hover:bg-white/6 hover:text-white';

    return (
        <Link
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                    ? 'lime-glow bg-lime-300/90 text-slate-950'
                    : baseClass
            }`}
            href={href}
            onClick={onNavigate}
        >
            {children}
        </Link>
    );
}

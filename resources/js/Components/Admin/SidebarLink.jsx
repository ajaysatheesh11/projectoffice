import { Link, usePage } from '@inertiajs/react';

export default function SidebarLink({ href, children }) {
    const { url } = usePage();
    const isActive = url === href || (href !== '/admin' && url.startsWith(href));

    return (
        <Link
            className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-lime-300 text-slate-950' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
            href={href}
        >
            {children}
        </Link>
    );
}

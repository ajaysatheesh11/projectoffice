import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navigation = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
            </svg>
        ),
    },
    {
        label: 'Home Content',
        href: '/admin/pages/home',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
    },
    {
        label: 'Contact Content',
        href: '/admin/pages/contact',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
        ),
    },
    {
        label: 'Categories',
        href: '/admin/categories',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
        ),
    },
    {
        label: 'Projects',
        href: '/admin/projects',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.625-1.25a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m-3 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
        ),
    },
    {
        label: 'Partners',
        href: '/admin/trusted-partners',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
        ),
    },
];

function SidebarNavLink({ href, icon, children }) {
    const { url } = usePage();
    const isActive = url === href || (href !== '/admin' && url.startsWith(href));

    return (
        <Link
            className={`admin-sidebar-link group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                ? 'admin-sidebar-link-active bg-lime-400/12 text-lime-300'
                : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                }`}
            href={href}
        >
            <span className={`transition-colors duration-200 ${isActive ? 'text-lime-400' : 'text-white/30 group-hover:text-white/60'}`}>
                {icon}
            </span>
            {children}
        </Link>
    );
}

export default function AdminLayout({ title, children }) {
    const { auth } = usePage().props;
    const logoutForm = useForm({});
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-shell flex min-h-screen bg-[#0a0f0a]">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`admin-sidebar fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.06] bg-[#0d120d]/95 backdrop-blur-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-white/[0.06] px-5">
                    <Link className="flex items-center gap-3" href="/admin">
                        <img
                            src="/images/image.png"
                            alt="Auxio Logo"
                            className="h-8 w-auto"
                            decoding="async"
                            height="32"
                            width="112"
                        />
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
                        Navigation
                    </p>
                    {navigation.map((item) => (
                        <SidebarNavLink key={item.href} href={item.href} icon={item.icon}>
                            {item.label}
                        </SidebarNavLink>
                    ))}
                </nav>

                {/* Sidebar footer */}
                <div className="border-t border-white/[0.06] p-4">
                    <Link
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/40 transition-all duration-200 hover:bg-white/5 hover:text-white/70"
                        href="/"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        View Website
                    </Link>
                </div>
            </aside>

            {/* Main content area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top header bar */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0d120d]/80 px-4 backdrop-blur-xl lg:px-8">
                    {/* Mobile menu toggle */}
                    <button
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                        type="button"
                        aria-label="Open sidebar"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    {/* Page title */}
                    <div className="hidden lg:block">
                        {title && (
                            <h1 className="text-lg font-semibold tracking-tight text-white/90">{title}</h1>
                        )}
                    </div>

                    {/* User section */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-lime-400/20 to-emerald-400/20 text-xs font-bold text-lime-300">
                                {auth.user?.email?.[0]?.toUpperCase() ?? 'A'}
                            </div>
                            <span className="hidden text-sm text-white/40 sm:block">{auth.user?.email}</span>
                        </div>
                        <button
                            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 transition-all duration-200 hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
                            onClick={() => logoutForm.post('/admin/logout')}
                            type="button"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="admin-main flex-1 overflow-y-auto">
                    <div className="p-4 lg:p-8">
                        {/* Mobile title */}
                        {title && (
                            <h1 className="mb-6 text-xl font-semibold tracking-tight text-white/90 lg:hidden">{title}</h1>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

import AdminCard from '@/Components/Admin/AdminCard';
import SidebarLink from '@/Components/Admin/SidebarLink';
import Container from '@/Components/UI/Container';
import NotificationStack from '@/Components/UI/NotificationStack';
import PageLoadIndicator from '@/Components/UI/PageLoadIndicator';
import { Link, useForm, usePage } from '@inertiajs/react';

const navigation = [
    { label: 'Home Content', href: '/admin/pages/home' },
    { label: 'Contact Content', href: '/admin/pages/contact' },
];

export default function AdminLayout({ title = 'Admin Panel', children }) {
    const { auth, flash, errors } = usePage().props;
    const logoutForm = useForm({});

    return (
        <div className="min-h-screen bg-slate-100 text-slate-950">
            <PageLoadIndicator />
            <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
                <Container className="flex min-h-18 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <Link className="flex items-center gap-3" href="/admin">
                        <img src="/images/image.png" alt="Auxio Logo" className="h-10 w-auto" decoding="async" height="40" width="140" />
                        <span className="text-sm font-bold tracking-tight text-slate-950">Admin</span>
                    </Link>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                        <AdminCard className="p-2">
                            <nav className="flex flex-wrap gap-2">
                                {navigation.map((item) => (
                                    <SidebarLink key={item.href} href={item.href}>
                                        {item.label}
                                    </SidebarLink>
                                ))}
                            </nav>
                        </AdminCard>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-slate-500">{auth.user?.email}</span>
                            <button
                                className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
                                onClick={() => logoutForm.post('/admin/logout')}
                                type="button"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </Container>
            </header>
            <main className="py-8">
                <Container className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-950">{title}</h1>
                    </div>
                    <NotificationStack errors={errors} flash={flash} tone="admin" />
                    {children}
                </Container>
            </main>
        </div>
    );
}

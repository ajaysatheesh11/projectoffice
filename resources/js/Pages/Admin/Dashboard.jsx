import SEO from '@/Components/SEO';
import AdminLayout from '@/Layouts/AdminLayout';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    return (
        <AdminLayout title="Dashboard">
            <SEO title="Dashboard — Admin" />

            <div className="space-y-6">
                {/* Simplified Welcome Banner */}
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold tracking-tight text-white/90">
                            Welcome, {auth?.user?.name || 'Admin'}
                        </h2>
                        <p className="mt-2 max-w-lg text-sm leading-6 text-white/35">
                            This is your default admin dashboard. Use the sidebar navigation to manage your website content.
                        </p>
                    </div>
                    {/* Subtle background glow */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime-400/[0.03] blur-3xl" />
                </div>

                {/* Default content area */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Quick Overview</h3>
                        <p className="mt-4 text-sm text-white/30 leading-relaxed">
                            Your website is currently active and running. You can update the Home and Contact page content using the links in the sidebar.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">System Status</h3>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.4)]" />
                            <span className="text-sm text-white/50">All systems operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

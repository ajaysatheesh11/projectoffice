import AdminCard from '@/Components/Admin/AdminCard';
import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Index({ seo, messages }) {
    const form = useForm({});

    return (
        <AdminLayout title="Contact Messages">
            <SEO title={seo.title} description={seo.description} />

            <div className="space-y-4">
                {messages.map((message) => (
                    <AdminCard key={message.id}>
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-lg font-semibold text-slate-950">{message.subject}</p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {message.name} • {message.email}
                                        {message.phone ? ` • ${message.phone}` : ''}
                                    </p>
                                </div>
                                <p className="text-sm leading-7 text-slate-700">{message.message}</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                    {message.read_at ? 'Read' : 'Unread'} • {new Date(message.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={() => form.put(`/admin/contact-messages/${message.id}`)} type="button" variant="secondary">
                                    {message.read_at ? 'Mark Unread' : 'Mark Read'}
                                </Button>
                                <button
                                    className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                    onClick={() => {
                                        if (window.confirm('Delete this contact message?')) {
                                            form.delete(`/admin/contact-messages/${message.id}`);
                                        }
                                    }}
                                    type="button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </AdminCard>
                ))}
            </div>
        </AdminLayout>
    );
}

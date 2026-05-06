import AdminCard from '@/Components/Admin/AdminCard';
import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Index({ seo, requests }) {
    const form = useForm({});

    return (
        <AdminLayout title="Quote Requests">
            <SEO title={seo.title} description={seo.description} />

            <div className="space-y-4">
                {requests.map((request) => (
                    <AdminCard key={request.id}>
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-lg font-semibold text-slate-950">{request.name}</p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {request.email}
                                        {request.company ? ` • ${request.company}` : ''}
                                        {request.service?.name ? ` • ${request.service.name}` : ''}
                                    </p>
                                </div>
                                <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                                    <p>Phone: {request.phone || 'Not provided'}</p>
                                    <p>Budget: {request.budget || 'Not provided'}</p>
                                    <p>Timeline: {request.timeline || 'Not provided'}</p>
                                    <p>Reference: {request.reference || 'Not provided'}</p>
                                </div>
                                <p className="text-sm leading-7 text-slate-700">{request.brief}</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                    {request.read_at ? 'Read' : 'Unread'} • {new Date(request.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={() => form.put(`/admin/quote-requests/${request.id}`)} type="button" variant="secondary">
                                    {request.read_at ? 'Mark Unread' : 'Mark Read'}
                                </Button>
                                <button
                                    className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                    onClick={() => {
                                        if (window.confirm('Delete this quote request?')) {
                                            form.delete(`/admin/quote-requests/${request.id}`);
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

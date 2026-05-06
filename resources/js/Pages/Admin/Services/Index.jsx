import AdminCard from '@/Components/Admin/AdminCard';
import AdminCheckbox from '@/Components/Admin/AdminCheckbox';
import AdminField from '@/Components/Admin/AdminField';
import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import FormStatus from '@/Components/UI/FormStatus';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

function ServiceEditor({ item, onDelete }) {
    const form = useForm({
        name: item.name,
        summary: item.summary ?? '',
        sort_order: item.sort_order ?? 0,
        is_active: Boolean(item.is_active),
    });

    const submit = (event) => {
        event.preventDefault();
        form.put(`/admin/services/${item.id}`);
    };

    return (
        <AdminCard>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
                <AdminField label="Service Name" name="name" onChange={(e) => form.setData('name', e.target.value)} value={form.data.name} />
                <AdminField
                    label="Sort Order"
                    name="sort_order"
                    onChange={(e) => form.setData('sort_order', e.target.value)}
                    type="number"
                    value={form.data.sort_order}
                />
                <div className="md:col-span-2">
                    <AdminField
                        as="textarea"
                        label="Summary"
                        name="summary"
                        onChange={(e) => form.setData('summary', e.target.value)}
                        rows={4}
                        value={form.data.summary}
                    />
                </div>
                <AdminCheckbox
                    checked={form.data.is_active}
                    label="Active on public site"
                    name="is_active"
                    onChange={(e) => form.setData('is_active', e.target.checked)}
                />
                <div className="flex gap-3 md:justify-end">
                    <Button disabled={form.processing} type="submit">{form.processing ? 'Updating...' : 'Update'}</Button>
                    <button
                        className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        onClick={() => onDelete(item.id)}
                        type="button"
                    >
                        Delete
                    </button>
                </div>
                <FormStatus processing={form.processing} recentlySuccessful={form.recentlySuccessful} tone="admin" />
            </form>
        </AdminCard>
    );
}

export default function Index({ seo, services }) {
    const createForm = useForm({
        name: '',
        summary: '',
        sort_order: 0,
        is_active: true,
    });

    const createService = (event) => {
        event.preventDefault();
        createForm.post('/admin/services', {
            onSuccess: () => createForm.reset(),
        });
    };

    return (
        <AdminLayout title="Manage Services">
            <SEO title={seo.title} description={seo.description} />

            <AdminCard>
                <h2 className="text-xl font-semibold text-slate-950">Add service</h2>
                <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={createService}>
                    <AdminField
                        label="Service Name"
                        name="name"
                        onChange={(e) => createForm.setData('name', e.target.value)}
                        value={createForm.data.name}
                    />
                    <AdminField
                        label="Sort Order"
                        name="sort_order"
                        onChange={(e) => createForm.setData('sort_order', e.target.value)}
                        type="number"
                        value={createForm.data.sort_order}
                    />
                    <div className="md:col-span-2">
                        <AdminField
                            as="textarea"
                            label="Summary"
                            name="summary"
                            onChange={(e) => createForm.setData('summary', e.target.value)}
                            rows={4}
                            value={createForm.data.summary}
                        />
                    </div>
                    <AdminCheckbox
                        checked={createForm.data.is_active}
                        label="Active on public site"
                        name="is_active"
                        onChange={(e) => createForm.setData('is_active', e.target.checked)}
                    />
                    <div className="md:col-span-2">
                        <Button disabled={createForm.processing} type="submit">
                            {createForm.processing ? 'Creating...' : 'Create Service'}
                        </Button>
                        <div className="mt-3">
                            <FormStatus processing={createForm.processing} recentlySuccessful={createForm.recentlySuccessful} tone="admin" />
                        </div>
                    </div>
                </form>
            </AdminCard>

            <div className="space-y-4">
                {services.map((service) => (
                    <ServiceEditor
                        key={service.id}
                        item={service}
                        onDelete={(id) => {
                            if (window.confirm('Delete this service?')) {
                                createForm.delete(`/admin/services/${id}`);
                            }
                        }}
                    />
                ))}
            </div>
        </AdminLayout>
    );
}

import AdminCard from '@/Components/Admin/AdminCard';
import AdminCheckbox from '@/Components/Admin/AdminCheckbox';
import AdminField from '@/Components/Admin/AdminField';
import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import FormStatus from '@/Components/UI/FormStatus';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

function PortfolioEditor({ item, onDelete }) {
    const form = useForm({
        title: item.title,
        category: item.category ?? '',
        summary: item.summary ?? '',
        project_url: item.project_url ?? '',
        image: null,
        image_alt: item.image_alt ?? item.title,
        accent_color: item.accent_color ?? '#9ec91d',
        sort_order: item.sort_order ?? 0,
        is_published: Boolean(item.is_published),
        featured_on_home: Boolean(item.featured_on_home),
    });

    const submit = (event) => {
        event.preventDefault();
        form.transform((data) => ({
            ...data,
            _method: 'put',
        })).post(`/admin/portfolio/${item.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AdminCard>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
                <AdminField label="Project Title" name="title" onChange={(e) => form.setData('title', e.target.value)} value={form.data.title} />
                <AdminField
                    label="Category"
                    error={form.errors.category}
                    name="category"
                    onChange={(e) => form.setData('category', e.target.value)}
                    value={form.data.category}
                />
                <div className="md:col-span-2">
                    <AdminField
                        as="textarea"
                        error={form.errors.summary}
                        label="Summary"
                        name="summary"
                        onChange={(e) => form.setData('summary', e.target.value)}
                        rows={4}
                        value={form.data.summary}
                    />
                </div>
                <AdminField
                    error={form.errors.project_url}
                    label="Project URL"
                    name="project_url"
                    onChange={(e) => form.setData('project_url', e.target.value)}
                    value={form.data.project_url}
                />
                <AdminField
                    error={form.errors.sort_order}
                    label="Sort Order"
                    name="sort_order"
                    onChange={(e) => form.setData('sort_order', e.target.value)}
                    type="number"
                    value={form.data.sort_order}
                />
                <AdminField
                    error={form.errors.image_alt}
                    help="Accessible description for the uploaded project image."
                    label="Image Alt Text"
                    name="image_alt"
                    onChange={(e) => form.setData('image_alt', e.target.value)}
                    value={form.data.image_alt}
                />
                <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Showcase Color</span>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <input
                            className="h-12 w-16 cursor-pointer rounded-xl border-0 bg-transparent p-0"
                            name="accent_color"
                            onChange={(e) => form.setData('accent_color', e.target.value)}
                            type="color"
                            value={form.data.accent_color}
                        />
                        <input
                            className="min-w-0 flex-1 text-sm text-slate-700 outline-none"
                            name="accent_color_text"
                            onChange={(e) => form.setData('accent_color', e.target.value)}
                            type="text"
                            value={form.data.accent_color}
                        />
                    </div>
                    {form.errors.accent_color ? <span className="mt-2 block text-sm text-red-600">{form.errors.accent_color}</span> : null}
                </label>
                <div className="md:col-span-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Project Image</span>
                        <input
                            accept="image/*"
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                            name="image"
                            onChange={(e) => form.setData('image', e.target.files?.[0] ?? null)}
                            type="file"
                        />
                        <span className="mt-2 block text-xs leading-5 text-slate-500">Upload a clear desktop screenshot or product mockup. Max 5 MB.</span>
                        {form.errors.image ? <span className="mt-2 block text-sm text-red-600">{form.errors.image}</span> : null}
                    </label>
                    {item.image_url ? (
                        <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3">
                            <img alt={item.image_alt ?? item.title} className="h-52 w-full rounded-[1rem] object-cover object-top" src={item.image_url} />
                        </div>
                    ) : null}
                </div>
                <AdminCheckbox
                    checked={form.data.is_published}
                    label="Visible on public site"
                    name="is_published"
                    onChange={(e) => form.setData('is_published', e.target.checked)}
                />
                <AdminCheckbox
                    checked={form.data.featured_on_home}
                    label="Show in home project showcase"
                    name="featured_on_home"
                    onChange={(e) => form.setData('featured_on_home', e.target.checked)}
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

export default function Index({ seo, items }) {
    const createForm = useForm({
        title: '',
        category: '',
        summary: '',
        project_url: '',
        image: null,
        image_alt: '',
        accent_color: '#9ec91d',
        sort_order: 0,
        is_published: true,
        featured_on_home: true,
    });

    const createItem = (event) => {
        event.preventDefault();
        createForm.post('/admin/portfolio', {
            forceFormData: true,
            onSuccess: () => createForm.reset(),
        });
    };

    return (
        <AdminLayout title="Manage Portfolio">
            <SEO title={seo.title} description={seo.description} />

            <AdminCard>
                <h2 className="text-xl font-semibold text-slate-950">Add portfolio item</h2>
                <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={createItem}>
                    <AdminField
                        label="Project Title"
                        name="title"
                        onChange={(e) => createForm.setData('title', e.target.value)}
                        value={createForm.data.title}
                    />
                    <AdminField
                        label="Category"
                        error={createForm.errors.category}
                        name="category"
                        onChange={(e) => createForm.setData('category', e.target.value)}
                        value={createForm.data.category}
                    />
                    <div className="md:col-span-2">
                        <AdminField
                            as="textarea"
                            error={createForm.errors.summary}
                            label="Summary"
                            name="summary"
                            onChange={(e) => createForm.setData('summary', e.target.value)}
                            rows={4}
                            value={createForm.data.summary}
                        />
                    </div>
                    <AdminField
                        label="Project URL"
                        error={createForm.errors.project_url}
                        name="project_url"
                        onChange={(e) => createForm.setData('project_url', e.target.value)}
                        value={createForm.data.project_url}
                    />
                    <AdminField
                        label="Sort Order"
                        error={createForm.errors.sort_order}
                        name="sort_order"
                        onChange={(e) => createForm.setData('sort_order', e.target.value)}
                        type="number"
                        value={createForm.data.sort_order}
                    />
                    <AdminField
                        error={createForm.errors.image_alt}
                        help="Short description of the project image for accessibility."
                        label="Image Alt Text"
                        name="image_alt"
                        onChange={(e) => createForm.setData('image_alt', e.target.value)}
                        value={createForm.data.image_alt}
                    />
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Showcase Color</span>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                            <input
                                className="h-12 w-16 cursor-pointer rounded-xl border-0 bg-transparent p-0"
                                name="accent_color"
                                onChange={(e) => createForm.setData('accent_color', e.target.value)}
                                type="color"
                                value={createForm.data.accent_color}
                            />
                            <input
                                className="min-w-0 flex-1 text-sm text-slate-700 outline-none"
                                name="accent_color_text"
                                onChange={(e) => createForm.setData('accent_color', e.target.value)}
                                type="text"
                                value={createForm.data.accent_color}
                            />
                        </div>
                        {createForm.errors.accent_color ? <span className="mt-2 block text-sm text-red-600">{createForm.errors.accent_color}</span> : null}
                    </label>
                    <div className="md:col-span-2">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-700">Project Image</span>
                            <input
                                accept="image/*"
                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                                name="image"
                                onChange={(e) => createForm.setData('image', e.target.files?.[0] ?? null)}
                                type="file"
                            />
                            <span className="mt-2 block text-xs leading-5 text-slate-500">Upload a desktop screenshot, mockup, or product visual. Max 5 MB.</span>
                            {createForm.errors.image ? <span className="mt-2 block text-sm text-red-600">{createForm.errors.image}</span> : null}
                        </label>
                    </div>
                    <AdminCheckbox
                        checked={createForm.data.is_published}
                        label="Visible on public site"
                        name="is_published"
                        onChange={(e) => createForm.setData('is_published', e.target.checked)}
                    />
                    <AdminCheckbox
                        checked={createForm.data.featured_on_home}
                        label="Show in home project showcase"
                        name="featured_on_home"
                        onChange={(e) => createForm.setData('featured_on_home', e.target.checked)}
                    />
                    <div className="md:col-span-2">
                        <Button disabled={createForm.processing} type="submit">
                            {createForm.processing ? 'Creating...' : 'Create Portfolio Item'}
                        </Button>
                        <div className="mt-3">
                            <FormStatus processing={createForm.processing} recentlySuccessful={createForm.recentlySuccessful} tone="admin" />
                        </div>
                    </div>
                </form>
            </AdminCard>

            <div className="space-y-4">
                {items.map((item) => (
                    <PortfolioEditor
                        key={item.id}
                        item={item}
                        onDelete={(id) => {
                            if (window.confirm('Delete this portfolio item?')) {
                                createForm.delete(`/admin/portfolio/${id}`);
                            }
                        }}
                    />
                ))}
            </div>
        </AdminLayout>
    );
}

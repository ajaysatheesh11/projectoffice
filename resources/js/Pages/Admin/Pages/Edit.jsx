import AdminCard from '@/Components/Admin/AdminCard';
import AdminCheckbox from '@/Components/Admin/AdminCheckbox';
import AdminField from '@/Components/Admin/AdminField';
import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

function SectionEditor({ pageId, section, onDelete }) {
    const form = useForm({
        page_content_id: pageId,
        section_key: section.section_key,
        label: section.label,
        eyebrow: section.eyebrow ?? '',
        title: section.title ?? '',
        subtitle: section.subtitle ?? '',
        content: section.content ?? '',
        items_json: section.items_json ?? '',
        sort_order: section.sort_order ?? 0,
        is_active: Boolean(section.is_active),
    });

    const submit = (event) => {
        event.preventDefault();
        form.put(`/admin/page-sections/${section.id}`);
    };

    return (
        <AdminCard>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
                <AdminField error={form.errors.label} label="Section Label" name="label" onChange={(e) => form.setData('label', e.target.value)} value={form.data.label} />
                <AdminField
                    error={form.errors.section_key}
                    help="Stable machine key used by the frontend, for example `stats` or `contact_details`."
                    label="Section Key"
                    name="section_key"
                    onChange={(e) => form.setData('section_key', e.target.value)}
                    value={form.data.section_key}
                />
                <AdminField error={form.errors.eyebrow} label="Eyebrow" name="eyebrow" onChange={(e) => form.setData('eyebrow', e.target.value)} value={form.data.eyebrow} />
                <AdminField error={form.errors.title} label="Title" name="title" onChange={(e) => form.setData('title', e.target.value)} value={form.data.title} />
                <AdminField
                    error={form.errors.subtitle}
                    label="Subtitle"
                    name="subtitle"
                    onChange={(e) => form.setData('subtitle', e.target.value)}
                    value={form.data.subtitle}
                />
                <AdminField
                    error={form.errors.sort_order}
                    label="Sort Order"
                    name="sort_order"
                    onChange={(e) => form.setData('sort_order', e.target.value)}
                    type="number"
                    value={form.data.sort_order}
                />
                <div className="md:col-span-2">
                    <AdminField
                        as="textarea"
                        error={form.errors.content}
                        label="Content"
                        name="content"
                        onChange={(e) => form.setData('content', e.target.value)}
                        rows={4}
                        value={form.data.content}
                    />
                </div>
                <div className="md:col-span-2">
                    <AdminField
                        as="textarea"
                        error={form.errors.items_json}
                        help='Enter a JSON array, for example `[{"title":"Item","description":"Copy"}]`.'
                        label="Items JSON"
                        name="items_json"
                        onChange={(e) => form.setData('items_json', e.target.value)}
                        rows={10}
                        value={form.data.items_json}
                    />
                </div>
                <AdminCheckbox
                    checked={form.data.is_active}
                    label="Active on public site"
                    name="is_active"
                    onChange={(e) => form.setData('is_active', e.target.checked)}
                />
                <div className="flex gap-3 md:justify-end">
                    <Button disabled={form.processing} type="submit">
                        Save Section
                    </Button>
                    <button
                        className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        onClick={() => onDelete(section.id)}
                        type="button"
                    >
                        Delete
                    </button>
                </div>
            </form>
        </AdminCard>
    );
}

export default function Edit({ seo, page, sections }) {
    const form = useForm({
        eyebrow: page.eyebrow ?? '',
        title: page.title ?? '',
        highlight: page.highlight ?? '',
        subtitle: page.subtitle ?? '',
        description: page.description ?? '',
        primary_cta_label: page.primary_cta_label ?? '',
        primary_cta_href: page.primary_cta_href ?? '',
        secondary_cta_label: page.secondary_cta_label ?? '',
        secondary_cta_href: page.secondary_cta_href ?? '',
        meta_title: page.meta_title ?? '',
        meta_description: page.meta_description ?? '',
    });

    const createSectionForm = useForm({
        page_content_id: page.id,
        section_key: '',
        label: '',
        eyebrow: '',
        title: '',
        subtitle: '',
        content: '',
        items_json: '',
        sort_order: sections.length + 1,
        is_active: true,
    });

    const submit = (event) => {
        event.preventDefault();
        form.put(`/admin/pages/${page.page_key}`);
    };

    const createSection = (event) => {
        event.preventDefault();
        createSectionForm.post('/admin/page-sections', {
            onSuccess: () =>
                createSectionForm.reset('section_key', 'label', 'eyebrow', 'title', 'subtitle', 'content', 'items_json'),
        });
    };

    return (
        <AdminLayout title={`Edit ${page.label}`}>
            <SEO title={seo.title} description={seo.description} />

            <div className="space-y-6">
                <AdminCard>
                    <form className="grid gap-5 md:grid-cols-2" onSubmit={submit}>
                            <AdminField error={form.errors.eyebrow} label="Eyebrow" name="eyebrow" onChange={(e) => form.setData('eyebrow', e.target.value)} value={form.data.eyebrow} />
                            <AdminField error={form.errors.title} label="Title" name="title" onChange={(e) => form.setData('title', e.target.value)} value={form.data.title} />
                            <AdminField
                                error={form.errors.highlight}
                                label="Highlight Text"
                                name="highlight"
                                onChange={(e) => form.setData('highlight', e.target.value)}
                                value={form.data.highlight}
                            />
                            <AdminField
                                error={form.errors.subtitle}
                                label="Subtitle"
                                name="subtitle"
                                onChange={(e) => form.setData('subtitle', e.target.value)}
                                value={form.data.subtitle}
                            />
                            <div className="md:col-span-2">
                                <AdminField
                                    as="textarea"
                                    error={form.errors.description}
                                    label="Description"
                                    name="description"
                                    onChange={(e) => form.setData('description', e.target.value)}
                                    rows={5}
                                    value={form.data.description}
                                />
                            </div>
                            <AdminField
                                error={form.errors.primary_cta_label}
                                label="Primary CTA Label"
                                name="primary_cta_label"
                                onChange={(e) => form.setData('primary_cta_label', e.target.value)}
                                value={form.data.primary_cta_label}
                            />
                            <AdminField
                                error={form.errors.primary_cta_href}
                                label="Primary CTA Link"
                                name="primary_cta_href"
                                onChange={(e) => form.setData('primary_cta_href', e.target.value)}
                                value={form.data.primary_cta_href}
                            />
                            <AdminField
                                error={form.errors.secondary_cta_label}
                                label="Secondary CTA Label"
                                name="secondary_cta_label"
                                onChange={(e) => form.setData('secondary_cta_label', e.target.value)}
                                value={form.data.secondary_cta_label}
                            />
                            <AdminField
                                error={form.errors.secondary_cta_href}
                                label="Secondary CTA Link"
                                name="secondary_cta_href"
                                onChange={(e) => form.setData('secondary_cta_href', e.target.value)}
                                value={form.data.secondary_cta_href}
                            />
                            <AdminField
                                error={form.errors.meta_title}
                                label="Meta Title"
                                name="meta_title"
                                onChange={(e) => form.setData('meta_title', e.target.value)}
                                value={form.data.meta_title}
                            />
                            <div className="md:col-span-2">
                                <AdminField
                                    as="textarea"
                                    error={form.errors.meta_description}
                                    label="Meta Description"
                                    name="meta_description"
                                    onChange={(e) => form.setData('meta_description', e.target.value)}
                                    rows={4}
                                    value={form.data.meta_description}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Button disabled={form.processing} type="submit">
                                    Save Content
                                </Button>
                            </div>
                    </form>
                </AdminCard>

                <AdminCard>
                    <h2 className="text-xl font-semibold text-slate-950">Add page section</h2>
                    <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={createSection}>
                            <AdminField
                                error={createSectionForm.errors.label}
                                label="Section Label"
                                name="label"
                                onChange={(e) => createSectionForm.setData('label', e.target.value)}
                                value={createSectionForm.data.label}
                            />
                            <AdminField
                                error={createSectionForm.errors.section_key}
                                help="Use a stable key so the frontend knows where to render it."
                                label="Section Key"
                                name="section_key"
                                onChange={(e) => createSectionForm.setData('section_key', e.target.value)}
                                value={createSectionForm.data.section_key}
                            />
                            <AdminField
                                error={createSectionForm.errors.eyebrow}
                                label="Eyebrow"
                                name="eyebrow"
                                onChange={(e) => createSectionForm.setData('eyebrow', e.target.value)}
                                value={createSectionForm.data.eyebrow}
                            />
                            <AdminField
                                error={createSectionForm.errors.title}
                                label="Title"
                                name="title"
                                onChange={(e) => createSectionForm.setData('title', e.target.value)}
                                value={createSectionForm.data.title}
                            />
                            <AdminField
                                error={createSectionForm.errors.subtitle}
                                label="Subtitle"
                                name="subtitle"
                                onChange={(e) => createSectionForm.setData('subtitle', e.target.value)}
                                value={createSectionForm.data.subtitle}
                            />
                            <AdminField
                                error={createSectionForm.errors.sort_order}
                                label="Sort Order"
                                name="sort_order"
                                onChange={(e) => createSectionForm.setData('sort_order', e.target.value)}
                                type="number"
                                value={createSectionForm.data.sort_order}
                            />
                            <div className="md:col-span-2">
                                <AdminField
                                    as="textarea"
                                    error={createSectionForm.errors.content}
                                    label="Content"
                                    name="content"
                                    onChange={(e) => createSectionForm.setData('content', e.target.value)}
                                    rows={4}
                                    value={createSectionForm.data.content}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <AdminField
                                    as="textarea"
                                    error={createSectionForm.errors.items_json}
                                    help='JSON array example: `[{"title":"Fast launch","description":"Reusable build system"}]`.'
                                    label="Items JSON"
                                    name="items_json"
                                    onChange={(e) => createSectionForm.setData('items_json', e.target.value)}
                                    rows={10}
                                    value={createSectionForm.data.items_json}
                                />
                            </div>
                            <AdminCheckbox
                                checked={createSectionForm.data.is_active}
                                label="Active on public site"
                                name="is_active"
                                onChange={(e) => createSectionForm.setData('is_active', e.target.checked)}
                            />
                            <div className="md:col-span-2">
                                <Button disabled={createSectionForm.processing} type="submit">
                                    Create Section
                                </Button>
                            </div>
                    </form>
                </AdminCard>

                <div className="space-y-4">
                    {sections.map((section) => (
                        <SectionEditor
                            key={section.id}
                            onDelete={(id) => {
                                if (window.confirm('Delete this page section?')) {
                                    createSectionForm.delete(`/admin/page-sections/${id}`);
                                }
                            }}
                            pageId={page.id}
                            section={section}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

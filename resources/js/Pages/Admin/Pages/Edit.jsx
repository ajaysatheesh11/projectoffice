import SEO from '@/Components/SEO';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

function AdminInput({ label, name, value, onChange, error, help, type = 'text', as, rows, className = '' }) {
    const Tag = as || 'input';
    return (
        <label className={`block ${className}`}>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">{label}</span>
            <Tag
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/20 focus:border-lime-400/30 focus:bg-white/[0.06] focus:ring-1 focus:ring-lime-400/20"
                name={name}
                onChange={onChange}
                type={as ? undefined : type}
                value={value}
                rows={rows}
            />
            {help && <span className="mt-1.5 block text-xs text-white/25">{help}</span>}
            {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
        </label>
    );
}

export default function Edit({ seo, page }) {
    const form = useForm({
        title: page.title ?? '',
        subtitle: page.subtitle ?? '',
        description: page.description ?? '',
    });

    const submit = (event) => {
        event.preventDefault();
        form.put(`/admin/pages/${page.page_key}`);
    };

    return (
        <AdminLayout title={`Edit ${page.label}`}>
            <SEO title={seo.title} description={seo.description} />

            <div className="space-y-6">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 lg:p-6">
                    <div className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/30">Default Content</h2>
                        <p className="mt-1 text-xs text-white/20">Manage the core content for this page.</p>
                    </div>

                    <form className="space-y-6" onSubmit={submit}>
                        <AdminInput 
                            label="Page Title" 
                            name="title" 
                            onChange={(e) => form.setData('title', e.target.value)} 
                            value={form.data.title} 
                            error={form.errors.title}
                        />

                        <AdminInput 
                            label="Subtitle / Headline" 
                            name="subtitle" 
                            onChange={(e) => form.setData('subtitle', e.target.value)} 
                            value={form.data.subtitle} 
                            error={form.errors.subtitle}
                        />

                        <AdminInput 
                            as="textarea" 
                            label="Main Description" 
                            name="description" 
                            onChange={(e) => form.setData('description', e.target.value)} 
                            rows={6} 
                            value={form.data.description} 
                            error={form.errors.description}
                        />

                        <div className="pt-4">
                            <button
                                className="rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 px-8 py-3 text-sm font-bold text-[#0a0f0a] shadow-[0_0_20px_rgba(163,230,53,0.15)] transition hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] disabled:opacity-50"
                                disabled={form.processing}
                                type="submit"
                            >
                                {form.processing ? 'Updating...' : 'Update Content'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] p-8 text-center">
                    <p className="text-xs text-white/20 italic">
                        Note: Advanced sections and SEO settings are currently managed via defaults.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}

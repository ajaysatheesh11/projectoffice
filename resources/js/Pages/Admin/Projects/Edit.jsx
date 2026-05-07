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

function AdminSelect({ label, name, value, onChange, error, options, className = '' }) {
    return (
        <label className={`block ${className}`}>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">{label}</span>
            <div className="relative">
                <select
                    className="w-full rounded-xl border border-white/[0.08] bg-[#0a0f0a] px-4 py-3 text-sm text-white/90 outline-none transition focus:border-lime-400/30 focus:bg-white/[0.06] focus:ring-1 focus:ring-lime-400/20 appearance-none cursor-pointer"
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    <option value="" className="bg-[#1a1f1a]">Select a category</option>
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-[#1a1f1a]">
                            {opt.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/30">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
        </label>
    );
}

export default function Edit({ project, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        category_id: project.category_id,
        title: project.title,
        description: project.description ?? '',
        image: null,
        link: project.link ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Spoofing PUT request with POST for file upload support
        post(route('admin.projects.update', project.id));
    };

    return (
        <AdminLayout title="Edit Project">
            <SEO title="Edit Project — Admin" />

            <div className="max-w-3xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold tracking-tight text-white/90">Edit Project</h2>
                    <p className="mt-1 text-sm text-white/35">Update project details and settings.</p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <AdminSelect
                                label="Category"
                                name="category_id"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                options={categories}
                                error={errors.category_id}
                            />
                            <AdminInput
                                label="Project Title"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                error={errors.title}
                            />
                        </div>

                        <AdminInput
                            as="textarea"
                            label="Description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={errors.description}
                            help="Maximum 100 words"
                            rows={10}
                        />

                        <div className="grid gap-6 md:grid-cols-2">
                            <AdminInput
                                label="Project Link"
                                name="link"
                                value={data.link}
                                onChange={(e) => setData('link', e.target.value)}
                                error={errors.link}
                            />
                            <div className="block">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Project Image</span>
                                <div className="flex items-center gap-4">
                                    {project.image && !data.image && (
                                        <img src={`/storage/${project.image}`} alt="" className="h-12 w-12 rounded-xl object-cover border border-white/10" />
                                    )}
                                    <input
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        className="flex-1 text-sm text-white/40 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/5 file:text-white/60 hover:file:bg-white/10 transition cursor-pointer"
                                    />
                                </div>
                                <span className="mt-1.5 block text-[10px] text-white/20">Leave blank to keep existing image.</span>
                                {errors.image && <span className="mt-1.5 block text-xs text-red-400">{errors.image}</span>}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 px-8 py-3 text-sm font-bold text-[#0a0f0a] shadow-[0_0_20px_rgba(163,230,53,0.15)] transition hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

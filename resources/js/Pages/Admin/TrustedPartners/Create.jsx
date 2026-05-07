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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.trusted-partners.store'));
    };

    return (
        <AdminLayout title="Add Trusted Partner">
            <SEO title="Add Trusted Partner — Admin" />

            <div className="max-w-3xl">
                <div className="mb-8">
                    <h2 className="text-xl font-bold tracking-tight text-white/90">Add Trusted Partner</h2>
                    <p className="mt-1 text-sm text-white/35">Add a new company you've worked with.</p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8">
                    <form onSubmit={submit} className="space-y-6">
                        <AdminInput
                            label="Partner Name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="e.g. Acme Corp"
                        />

                        <label className="block">
                            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Partner logo / Image</span>
                            <input
                                type="file"
                                onChange={(e) => setData('image', e.target.files[0])}
                                className="w-full text-sm text-white/40 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/5 file:text-white/60 hover:file:bg-white/10 transition cursor-pointer"
                            />
                            {errors.image && <span className="mt-1.5 block text-xs text-red-400">{errors.image}</span>}
                        </label>

                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 px-8 py-3 text-sm font-bold text-[#0a0f0a] shadow-[0_0_20px_rgba(163,230,53,0.15)] transition hover:shadow-[0_0_30px_rgba(163,230,53,0.25)] disabled:opacity-50"
                            >
                                {processing ? 'Adding...' : 'Add Partner'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

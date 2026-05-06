import SEO from '@/Components/SEO';
import Button from '@/Components/UI/Button';
import FormStatus from '@/Components/UI/FormStatus';
import { useForm } from '@inertiajs/react';

export default function Login({ seo }) {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event) => {
        event.preventDefault();
        form.post('/admin/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <SEO title={seo.title} description={seo.description} />

            <div className="admin-panel fade-slide-in w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <img src="/images/image.png" alt="Auxio Logo" className="h-10 w-auto" decoding="async" height="40" width="140" />
                <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-950">Secure login</h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">Sign in with the admin credentials configured for this website.</p>

                <form className="mt-8 space-y-5" onSubmit={submit}>
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Email Address</span>
                        <input
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
                            onChange={(event) => form.setData('email', event.target.value)}
                            type="email"
                            value={form.data.email}
                        />
                        {form.errors.email ? <p className="mt-2 text-sm text-red-600">{form.errors.email}</p> : null}
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                        <input
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-100"
                            onChange={(event) => form.setData('password', event.target.value)}
                            type="password"
                            value={form.data.password}
                        />
                        {form.errors.password ? <p className="mt-2 text-sm text-red-600">{form.errors.password}</p> : null}
                    </label>

                    <label className="inline-flex items-center gap-3 text-sm text-slate-600">
                        <input
                            checked={form.data.remember}
                            className="h-4 w-4 rounded border-slate-300 text-lime-500 focus:ring-lime-200"
                            onChange={(event) => form.setData('remember', event.target.checked)}
                            type="checkbox"
                        />
                        Keep me signed in
                    </label>

                    <Button className="w-full justify-center" disabled={form.processing} type="submit">
                        {form.processing ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <FormStatus
                        processing={form.processing}
                        processingLabel="Checking credentials..."
                        recentlySuccessful={form.recentlySuccessful}
                        successLabel="Signed in successfully."
                        tone="admin"
                    />
                </form>
            </div>
        </div>
    );
}

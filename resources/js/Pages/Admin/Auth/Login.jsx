import SEO from '@/Components/SEO';
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
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0f0a] px-4 py-10">
            <SEO title={seo.title} description={seo.description} />

            {/* Ambient glow effects */}
            <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-lime-400/[0.04] blur-[80px]" />
            <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-emerald-400/[0.03] blur-[100px]" />

            {/* Dot grid */}
            <div className="pointer-events-none absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(rgba(184,198,176,0.14) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
            }} />

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="fade-slide-in rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                    {/* Logo + Header */}
                    <div className="mb-8">
                        <img src="/images/image.png" alt="Auxio Logo" className="h-10 w-auto" decoding="async" height="40" width="140" />
                        <h1 className="mt-5 text-2xl font-bold tracking-tight text-white/90">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-white/35">
                            Sign in with your admin credentials to manage the website.
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={submit}>
                        <label className="block">
                            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Email Address</span>
                            <input
                                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/20 focus:border-lime-400/30 focus:bg-white/[0.06] focus:ring-1 focus:ring-lime-400/20"
                                onChange={(event) => form.setData('email', event.target.value)}
                                placeholder="admin@auxio.com"
                                type="email"
                                value={form.data.email}
                            />
                            {form.errors.email ? <p className="mt-2 text-xs text-red-400">{form.errors.email}</p> : null}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/40">Password</span>
                            <input
                                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white/90 outline-none transition placeholder:text-white/20 focus:border-lime-400/30 focus:bg-white/[0.06] focus:ring-1 focus:ring-lime-400/20"
                                onChange={(event) => form.setData('password', event.target.value)}
                                placeholder="••••••••"
                                type="password"
                                value={form.data.password}
                            />
                            {form.errors.password ? <p className="mt-2 text-xs text-red-400">{form.errors.password}</p> : null}
                        </label>

                        <label className="inline-flex cursor-pointer items-center gap-3">
                            <div className="relative">
                                <input
                                    checked={form.data.remember}
                                    className="peer sr-only"
                                    onChange={(event) => form.setData('remember', event.target.checked)}
                                    type="checkbox"
                                />
                                <div className="h-5 w-9 rounded-full border border-white/10 bg-white/[0.06] transition peer-checked:border-lime-400/30 peer-checked:bg-lime-400/20" />
                                <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white/30 transition-all peer-checked:translate-x-4 peer-checked:bg-lime-400" />
                            </div>
                            <span className="text-sm text-white/40">Keep me signed in</span>
                        </label>

                        <button
                            className="w-full rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 px-6 py-3.5 text-sm font-bold text-[#0a0f0a] shadow-[0_0_24px_rgba(163,230,53,0.18)] transition-all hover:shadow-[0_0_36px_rgba(163,230,53,0.28)] disabled:opacity-50"
                            disabled={form.processing}
                            type="submit"
                        >
                            {form.processing ? (
                                <span className="inline-flex items-center gap-2">
                                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing In...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Back to site link */}
                <div className="mt-6 text-center">
                    <a
                        className="inline-flex items-center gap-2 text-xs text-white/25 transition hover:text-white/50"
                        href="/"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Back to website
                    </a>
                </div>
            </div>
        </div>
    );
}

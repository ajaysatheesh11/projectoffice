import '../css/app.css';
import './bootstrap';
import { route } from 'ziggy-js';

window.route = route;

import { createInertiaApp } from '@inertiajs/react';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Auxio Technologies Private Limited';

function AppFallback() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#050706] px-6 text-white">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/75 backdrop-blur-xl">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-lime-300" />
                Loading experience...
            </div>
        </div>
    );
}

createInertiaApp({
    title: (title) => (title ? `${title} | ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');

        return pages[`./Pages/${name}.jsx`]();
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <Suspense fallback={<AppFallback />}>
                <App {...props} />
            </Suspense>
        );
    },
    progress: {
        color: '#0f766e',
    },
});

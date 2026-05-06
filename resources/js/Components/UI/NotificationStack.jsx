import { useEffect, useMemo, useState } from 'react';

export default function NotificationStack({ flash = {}, errors = {}, tone = 'site' }) {
    const notifications = useMemo(() => {
        const items = [];

        if (flash.success) {
            items.push({ id: 'success', type: 'success', message: flash.success });
        }

        if (flash.error) {
            items.push({ id: 'error', type: 'error', message: flash.error });
        }

        const validationMessages = Object.values(errors || {}).filter(Boolean);

        if (validationMessages.length > 0) {
            items.push({
                id: 'validation',
                type: 'warning',
                message: validationMessages[0],
            });
        }

        return items;
    }, [errors, flash.error, flash.success]);

    const [visibleIds, setVisibleIds] = useState([]);

    useEffect(() => {
        setVisibleIds(notifications.map((item) => item.id));
    }, [notifications]);

    useEffect(() => {
        if (notifications.length === 0) {
            return undefined;
        }

        const timeout = window.setTimeout(() => {
            setVisibleIds((current) => current.filter((id) => ! notifications.some((item) => item.id === id && item.type === 'success')));
        }, 3800);

        return () => window.clearTimeout(timeout);
    }, [notifications]);

    const palette =
        tone === 'admin'
            ? {
                  success: 'border-lime-200 bg-lime-50 text-lime-900',
                  error: 'border-red-200 bg-red-50 text-red-900',
                  warning: 'border-amber-200 bg-amber-50 text-amber-900',
              }
            : {
                  success: 'border-lime-300/30 bg-lime-300/10 text-lime-100',
                  error: 'border-red-300/35 bg-red-400/10 text-red-100',
                  warning: 'border-amber-300/35 bg-amber-300/10 text-amber-100',
              };

    const visibleItems = notifications.filter((item) => visibleIds.includes(item.id));

    if (visibleItems.length === 0) {
        return null;
    }

    return (
        <div className="space-y-3 fade-slide-in" aria-live="polite">
            {visibleItems.map((item) => (
                <div
                    key={item.id}
                    className={`flex items-start justify-between gap-4 rounded-2xl border px-4 py-3 text-sm font-medium ${palette[item.type]}`}
                >
                    <span>{item.message}</span>
                    <button
                        className="shrink-0 text-xs uppercase tracking-[0.2em] opacity-70 transition hover:opacity-100"
                        onClick={() => setVisibleIds((current) => current.filter((id) => id !== item.id))}
                        type="button"
                    >
                        Close
                    </button>
                </div>
            ))}
        </div>
    );
}

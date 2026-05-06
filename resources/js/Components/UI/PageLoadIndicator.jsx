import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function PageLoadIndicator() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const removeStart = router.on('start', () => setLoading(true));
        const removeFinish = router.on('finish', () => setLoading(false));
        const removeError = router.on('error', () => setLoading(false));

        return () => {
            removeStart();
            removeFinish();
            removeError();
        };
    }, []);

    return loading ? <div className="route-loader fade-slide-in" /> : null;
}

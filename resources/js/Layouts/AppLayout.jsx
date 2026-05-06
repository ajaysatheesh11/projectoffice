import Footer from '@/Components/Site/Footer';
import Header from '@/Components/Site/Header';
import NotificationStack from '@/Components/UI/NotificationStack';
import PageLoadIndicator from '@/Components/UI/PageLoadIndicator';
import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

const interactiveCursorSelector = [
    'a',
    'button',
    '[role="button"]',
    'input:not([type="hidden"])',
    'select',
    'textarea',
    'label[for]',
    '[data-cursor-hover]',
].join(', ');

function SiteCursor() {
    const containerRef = useRef(null);
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const pointerRef = useRef({ x: 0, y: 0 });
    const ringRefState = useRef({ x: 0, y: 0 });
    const frameRef = useRef(null);
    const visibleRef = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined' || ! window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return undefined;
        }

        const container = containerRef.current;
        const ring = ringRef.current;
        const dot = dotRef.current;

        if (! container || ! ring || ! dot) {
            return undefined;
        }

        const syncVisibility = () => {
            container.dataset.visible = visibleRef.current ? 'true' : 'false';
        };

        const setInteractive = (target) => {
            container.dataset.interactive = target?.closest(interactiveCursorSelector) ? 'true' : 'false';
        };

        const updatePointer = (x, y) => {
            pointerRef.current = { x, y };

            if (! visibleRef.current) {
                visibleRef.current = true;
                syncVisibility();
            }
        };

        const tick = () => {
            const { x, y } = pointerRef.current;
            const ringState = ringRefState.current;

            ringState.x += (x - ringState.x) * 0.22;
            ringState.y += (y - ringState.y) * 0.22;

            dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            ring.style.transform = `translate3d(${ringState.x}px, ${ringState.y}px, 0)`;

            frameRef.current = window.requestAnimationFrame(tick);
        };

        const handlePointerMove = (event) => {
            updatePointer(event.clientX, event.clientY);
        };

        const handleTouchMove = (event) => {
            const touch = event.targetTouches[0];

            if (touch) {
                updatePointer(touch.clientX, touch.clientY);
            }
        };

        const handlePointerEnter = (event) => {
            updatePointer(event.clientX, event.clientY);
        };

        const handlePointerOver = (event) => {
            setInteractive(event.target);
        };

        const handlePointerLeave = () => {
            visibleRef.current = false;
            container.dataset.interactive = 'false';
            syncVisibility();
        };

        const handleBlur = () => {
            visibleRef.current = false;
            container.dataset.interactive = 'false';
            syncVisibility();
        };

        const startX = window.innerWidth * 0.5;
        const startY = window.innerHeight * 0.5;

        pointerRef.current = { x: startX, y: startY };
        ringRefState.current = { x: startX, y: startY };
        container.dataset.interactive = 'false';
        syncVisibility();
        frameRef.current = window.requestAnimationFrame(tick);

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('pointerover', handlePointerOver, { passive: true });
        document.addEventListener('pointerenter', handlePointerEnter, true);
        document.addEventListener('pointerleave', handlePointerLeave, true);
        window.addEventListener('blur', handleBlur);

        return () => {
            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current);
            }

            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('pointerover', handlePointerOver);
            document.removeEventListener('pointerenter', handlePointerEnter, true);
            document.removeEventListener('pointerleave', handlePointerLeave, true);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    return (
        <div ref={containerRef} aria-hidden="true" className="site-cursor" data-interactive="false" data-visible="false">
            <span ref={ringRef} className="site-cursor-ring" />
            <span ref={dotRef} className="site-cursor-dot" />
        </div>
    );
}

export default function AppLayout({ children }) {
    const { flash, errors } = usePage().props;

    return (
        <div className="site-shell flex min-h-screen flex-col bg-transparent text-white">
            <SiteCursor />
            <div aria-hidden="true" className="site-ambient">
                <span className="site-ambient-orb site-ambient-orb-left" />
                <span className="site-ambient-orb site-ambient-orb-right" />
                <span className="site-ambient-orb site-ambient-orb-bottom" />
                <span className="site-ambient-grid" />
            </div>
            <PageLoadIndicator />
            <Header />
            <main className="flex-1">
                <div className="mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <NotificationStack errors={errors} flash={flash} />
                </div>
                {children}
            </main>
            <Footer />
        </div>
    );
}

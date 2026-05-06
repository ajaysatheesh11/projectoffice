import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function AdminModal({ show, onClose, title, children }) {
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [show]);

    if (!show) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0d120d] shadow-[0_32px_64px_rgba(0,0,0,0.5)] transition-all duration-300">
                <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                    <h3 className="text-lg font-bold text-white/90">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="rounded-full p-2 text-white/30 transition hover:bg-white/5 hover:text-white"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

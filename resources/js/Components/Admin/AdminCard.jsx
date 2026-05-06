export default function AdminCard({ className = '', children }) {
    return <div className={`admin-panel fade-slide-in rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 ${className}`}>{children}</div>;
}

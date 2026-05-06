export default function Card({ className = '', children }) {
    return <div className={`section-card fade-slide-in rounded-[1.75rem] p-6 sm:p-7 ${className}`}>{children}</div>;
}

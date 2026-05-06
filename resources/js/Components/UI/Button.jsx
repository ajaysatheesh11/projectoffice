export default function Button({
    as: Component = 'button',
    href,
    type = 'button',
    variant = 'primary',
    className = '',
    children,
    ...props
}) {
    const isDisabled = Boolean(props.disabled);
    const variants = {
        primary: 'lime-glow bg-lime-300 text-slate-950 hover:scale-[1.01]',
        secondary: 'border border-white/12 bg-white/5 text-white/85 hover:bg-white/8 hover:text-white',
        ghost: 'text-white/70 hover:bg-white/6 hover:text-white',
    };

    return (
        <Component
            className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] ?? variants.primary} ${className}`}
            href={href}
            tabIndex={isDisabled ? -1 : props.tabIndex}
            type={Component === 'button' ? type : undefined}
            {...props}
        >
            {children}
        </Component>
    );
}

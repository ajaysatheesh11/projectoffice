export default function FormField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    as = 'input',
    rows = 5,
    options = [],
    error,
}) {
    const baseClassName =
        `w-full rounded-2xl border bg-white/4 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:bg-white/6 ${
            error ? 'border-red-400/60 focus:border-red-300/70' : 'border-white/10 focus:border-lime-300/35'
        }`;

    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">{label}</span>
            {as === 'textarea' ? (
                <textarea className={baseClassName} name={name} onChange={onChange} placeholder={placeholder} rows={rows} value={value} />
            ) : as === 'select' ? (
                <select className={baseClassName} name={name} onChange={onChange} value={value}>
                    <option disabled value="">
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
                            {typeof option === 'object' ? option.label : option}
                        </option>
                    ))}
                </select>
            ) : (
                <input className={baseClassName} name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} />
            )}
            {error ? <span className="mt-2 block text-sm text-red-300">{error}</span> : null}
        </label>
    );
}

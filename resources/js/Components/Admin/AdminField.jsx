export default function AdminField({
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
    help,
}) {
    const inputClassName =
        `w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-lime-100 ${
            error ? 'border-red-300 focus:border-red-300' : 'border-slate-200 focus:border-lime-400'
        }`;

    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
            {as === 'textarea' ? (
                <textarea className={inputClassName} name={name} onChange={onChange} placeholder={placeholder} rows={rows} value={value} />
            ) : as === 'select' ? (
                <select className={inputClassName} name={name} onChange={onChange} value={value}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input className={inputClassName} name={name} onChange={onChange} placeholder={placeholder} type={type} value={value} />
            )}
            {help ? <span className="mt-2 block text-xs leading-5 text-slate-500">{help}</span> : null}
            {error ? <span className="mt-2 block text-sm text-red-600">{error}</span> : null}
        </label>
    );
}

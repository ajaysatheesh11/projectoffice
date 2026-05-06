export default function AdminCheckbox({ label, name, checked, onChange }) {
    return (
        <label className="inline-flex items-center gap-3 text-sm font-medium text-slate-700">
            <input
                checked={checked}
                className="h-4 w-4 rounded border-slate-300 text-lime-500 focus:ring-lime-200"
                name={name}
                onChange={onChange}
                type="checkbox"
            />
            {label}
        </label>
    );
}

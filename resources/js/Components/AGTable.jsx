export default function AGTable({ columns, data, emptyMessage = "No items found." }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <table className="w-full text-left text-sm text-white/70">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-white/30">
                    <tr>
                        {columns.map((col, idx) => (
                            <th 
                                key={idx} 
                                className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : ''}`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                    {data.map((item, rowIdx) => (
                        <tr key={item.id || rowIdx} className="transition hover:bg-white/[0.01]">
                            {columns.map((col, colIdx) => (
                                <td 
                                    key={colIdx} 
                                    className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : ''} ${col.className || ''}`}
                                >
                                    {col.render ? col.render(item) : item[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td 
                                colSpan={columns.length} 
                                className="px-6 py-12 text-center text-white/20"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

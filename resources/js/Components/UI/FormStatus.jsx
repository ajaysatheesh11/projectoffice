export default function FormStatus({
    processing,
    recentlySuccessful,
    processingLabel = 'Saving...',
    successLabel = 'Saved successfully.',
    tone = 'site',
}) {
    const palette =
        tone === 'admin'
            ? {
                  processing: 'text-slate-500',
                  success: 'text-lime-700',
              }
            : {
                  processing: 'text-white/60',
                  success: 'text-lime-300',
              };

    if (processing) {
        return (
            <p className={`inline-flex items-center gap-2 text-sm font-medium ${palette.processing}`}>
                <span className="soft-pulse h-2 w-2 rounded-full bg-lime-300" />
                {processingLabel}
            </p>
        );
    }

    if (recentlySuccessful) {
        return <p className={`text-sm font-medium ${palette.success}`}>{successLabel}</p>;
    }

    return null;
}

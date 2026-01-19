export default function Skeleton() {
  return (
    <div className="min-h-screen bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)]">
      <div className="flex flex-col gap-3">
        {/* Navbar */}
        <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto p-3 rounded-md border border-[var(--color-borderDefault)] bg-[var(--color-bgSecondary)]">
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Path */}
        <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto px-3 h-10 rounded-md border border-[var(--color-borderDefault)] bg-[var(--color-bgSecondary)] flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Action Bar */}
        <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>

        {/* Search + Sort */}
        <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto h-10 rounded-md border border-[var(--color-borderDefault)] bg-[var(--color-bgSecondary)] flex items-center px-3">
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Toolbar */}
        <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto h-12 rounded-md border border-[var(--color-borderDefault)] bg-[var(--color-bgSecondary)] flex justify-between px-3 items-center">
          <div className="flex gap-3">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>

        {/* List items */}
        <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto flex flex-col gap-2 mt-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-md border border-[var(--color-borderDefault)] bg-[var(--color-bgSecondary)] px-3 flex items-center justify-between"
            >
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

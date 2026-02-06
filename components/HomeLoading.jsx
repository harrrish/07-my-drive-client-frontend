export default function HomeLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-google bg-bgPrimary gap-5 px-4">
      {/* Spinner */}
      <div className="w-16 h-16 rounded-full border-4 border-borderDefault border-t-[var(--color-accentPrimary)] animate-spin"></div>

      {/* Text */}
      <h1 className="text-lg sm:text-xl text-center text-textPrimary font-semibold">
        Loading your directory
      </h1>
      <p className="text-sm sm:text-base text-textSecondary">Please wait…</p>
    </div>
  );
}

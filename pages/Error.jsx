import { NavLink } from "react-router-dom";
import { MdErrorOutline, MdHome } from "react-icons/md";

export default function Error() {
  return (
    <div className="min-h-screen font-medium flex items-center justify-center bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] px-4 font-google">
      <div className="w-full max-w-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-2xl p-8 flex flex-col items-center gap-5 shadow-2xl text-center">
        <MdErrorOutline className="text-6xl text-[var(--color-warning)]" />
        <h1 className="text-2xl font-semibold">Oops! Something went wrong</h1>
        <p className="text-sm text-[var(--color-textSecondary)]">
          Looks like you landed here by mistake 😅
        </p>
        <p className="text-xs text-[var(--color-textDisabled)]">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <NavLink
          to="/"
          className="cursor-pointer mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-accentPrimary)] hover:border-[var(--color-borderActive)] hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
        >
          <MdHome className="text-lg" />
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}

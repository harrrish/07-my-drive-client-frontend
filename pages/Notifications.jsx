import { NavLink } from "react-router-dom";
import { MdNotifications, MdHome } from "react-icons/md";

export default function Notifications() {
  return (
    <div className="font-google min-h-screen bg-[var(--color-bgPrimary)] flex items-center px-4">
      <div className="w-full max-w-3xl mx-auto bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] flex flex-col gap-6 items-center p-6 sm:p-8 rounded-xl border border-[var(--color-borderDefault)] shadow-2xl">
        <h1 className="flex items-center gap-3 text-3xl sm:text-4xl font-semibold tracking-wide">
          <MdNotifications className="text-[var(--color-info)] text-3xl sm:text-4xl" />
          <span>
            User{" "}
            <span className="text-[var(--color-textSecondary)]">
              Notifications
            </span>
          </span>
        </h1>

        <p className="text-center text-sm sm:text-base leading-relaxed text-[var(--color-textSecondary)] max-w-xl">
          Stay informed with updates about file activity, sharing events, and
          important account-related alerts in{" "}
          <span className="text-[var(--color-textPrimary)] font-medium">
            My-Drive
          </span>
          .
        </p>

        <NavLink
          to="/directory"
          className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-[var(--color-bgElevated)] text-[var(--color-textPrimary)] border border-[var(--color-borderHover)] hover:bg-[var(--color-accentPrimary)] hover:border-[var(--color-borderActive)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
        >
          <MdHome className="text-lg" />
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}

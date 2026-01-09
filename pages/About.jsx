import { NavLink } from "react-router-dom";
import { MdInfoOutline, MdRocketLaunch } from "react-icons/md";

export default function About() {
  return (
    <div className="font-google min-h-screen bg-[var(--color-bgPrimary)] flex items-center px-4 font-medium">
      <div className="w-full max-w-4xl mx-auto bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] flex flex-col gap-6 items-center p-6 sm:p-10 rounded-2xl border border-[var(--color-borderDefault)] shadow-2xl">
        <h1 className="flex items-center gap-3 text-3xl sm:text-4xl font-semibold tracking-wide">
          <MdInfoOutline className="text-[var(--color-info)] text-3xl sm:text-4xl" />
          <span>
            About{" "}
            <span className="text-[var(--color-accentFocus)]">My-Drive</span>
          </span>
        </h1>

        <div className="flex flex-col gap-4 text-center max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--color-textSecondary)]">
          <p>
            <span className="text-[var(--color-textPrimary)] font-medium">
              My-Drive
            </span>{" "}
            is a secure, cloud-based file storage platform developed by{" "}
            <span className="text-[var(--color-accentFocus)] font-medium">
              UVDS
            </span>
            . Inspired by Google Drive, it empowers users to store, organize,
            and manage files effortlessly with security and accessibility at its
            core.
          </p>

          <p>
            Built using a modern architecture and strong security practices, My
            Drive delivers a clean, intuitive experience across all devices
            while ensuring your data remains private and protected.
          </p>
        </div>

        <NavLink
          to="/register"
          className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[var(--color-accentPrimary)] text-white font-medium hover:bg-[var(--color-accentHover)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
        >
          <MdRocketLaunch className="text-lg" />
          Get Started
        </NavLink>
      </div>
    </div>
  );
}

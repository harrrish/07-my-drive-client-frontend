import { NavLink } from "react-router-dom";
import { MdWorkspacePremium, MdHome, MdCheckCircle } from "react-icons/md";

export default function PurchasePremium() {
  return (
    <div className="font-google min-h-screen bg-[var(--color-bgPrimary)] flex items-center px-4">
      <div className="w-full max-w-5xl mx-auto bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] flex flex-col gap-8 p-6 sm:p-8 rounded-xl border border-[var(--color-borderDefault)] shadow-2xl">
        {/* HEADER */}
        <div className="text-center flex flex-col gap-3">
          <h1 className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-semibold">
            <MdWorkspacePremium className="text-[var(--color-warning)] text-4xl" />
            Plans & Pricing
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-textSecondary)] max-w-2xl mx-auto">
            Choose the plan that fits your storage and collaboration needs on{" "}
            <span className="text-[var(--color-textPrimary)] font-medium">
              My-Drive
            </span>
            .
          </p>
        </div>

        {/* PLANS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BASIC PLAN (SELECTED) */}
          <div className="rounded-xl border-2 border-[var(--color-borderActive)] bg-[var(--color-bgElevated)] p-6 flex flex-col gap-4 shadow-lg">
            <h2 className="text-xl font-semibold">Basic</h2>
            <p className="text-sm text-[var(--color-textSecondary)]">
              For personal use
            </p>

            <div className="text-3xl font-bold text-[var(--color-success)]">
              100 MB
            </div>

            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-success)]" />
                Upload files
              </li>
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-success)]" />
                Download files
              </li>
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-success)]" />
                View & delete files
              </li>
            </ul>

            <div className="mt-auto text-center text-sm font-medium text-[var(--color-accentPrimary)]">
              Current Plan
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="group rounded-xl border border-[var(--color-borderDefault)] bg-[var(--color-bgElevated)] p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[var(--color-borderActive)] hover:shadow-xl hover:scale-[1.02]">
            <h2 className="text-xl font-semibold group-hover:text-[var(--color-accentPrimary)]">
              Pro
            </h2>
            <p className="text-sm text-[var(--color-textSecondary)]">
              For advanced users
            </p>

            <div className="text-3xl font-bold">1 GB</div>

            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-info)]" />
                All Basic features
              </li>
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-info)]" />
                Star important files & folders
              </li>
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-info)]" />
                Share files via links
              </li>
            </ul>

            <button className="mt-auto w-full py-2 rounded-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderHover)] text-sm cursor-pointer group-hover:bg-[var(--color-accentPrimary)] group-hover:border-[var(--color-borderActive)] transition">
              Upgrade to Pro
            </button>
          </div>

          {/* PREMIUM PLAN */}
          <div className="group rounded-xl border border-[var(--color-borderDefault)] bg-[var(--color-bgElevated)] p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[var(--color-borderActive)] hover:shadow-xl hover:scale-[1.02]">
            <h2 className="text-xl font-semibold group-hover:text-[var(--color-warning)]">
              Premium
            </h2>
            <p className="text-sm text-[var(--color-textSecondary)]">
              For teams & power users
            </p>

            <div className="text-3xl font-bold">10 GB</div>

            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-warning)]" />
                All Pro features
              </li>
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-warning)]" />
                Share with other users
              </li>
              <li className="flex items-center gap-2">
                <MdCheckCircle className="text-[var(--color-warning)]" />
                Re-upload & edit access
              </li>
            </ul>

            <button className="mt-auto w-full py-2 rounded-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderHover)] text-sm cursor-pointer group-hover:bg-[var(--color-accentPrimary)] group-hover:border-[var(--color-borderActive)] transition">
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-6 border-t border-[var(--color-borderDefault)] flex justify-center">
          <NavLink
            to="/directory"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-accentPrimary)] hover:border-[var(--color-borderActive)] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
          >
            <MdHome className="text-lg" />
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

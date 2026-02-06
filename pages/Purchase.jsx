import { NavLink } from "react-router-dom";
import { MdWorkspacePremium, MdHome, MdCheckCircle } from "react-icons/md";
import { FaStar, FaBolt, FaCrown, FaCheckCircle } from "react-icons/fa";

export default function PurchasePremium() {
  return (
    <div className="font-google font-medium min-h-screen bg-bgPrimary flex items-center px-4 py-8">
      <div className="w-full max-w-5xl mx-auto bg-bgSecondary text-textPrimary flex flex-col gap-6 p-5 sm:p-6 rounded-xl border border-borderDefault shadow-xl">
        {/* HEADER */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold">
            <MdWorkspacePremium className="text-warning text-3xl" />
            Plans & Pricing
          </h1>
          <p className="text-sm text-textSecondary max-w-2xl mx-auto">
            Choose the plan that fits your storage and collaboration needs on{" "}
            <span className="text-textPrimary font-medium">My-Drive</span>.
          </p>
        </div>

        {/* PLANS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* FREE PLAN */}
          <div className="relative rounded-2xl border-2 border-borderHover bg-bgSecondary p-5 flex flex-col gap-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-accentPrimary text-black text-xs font-bold uppercase">
                You are here
              </span>
            </div>
            <div className="text-center">
              <div className="inline-block p-2 rounded-full bg-bgPrimary/50 mb-3 text-xl text-accentFocus">
                <FaStar />
              </div>
              <h3 className="text-2xl font-black text-textPrimary mb-1">
                Free
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-accentFocus">₹0</span>
                <span className="text-textSecondary text-sm">/forever</span>
              </div>
            </div>
            <p className="text-xs text-textSecondary text-center">
              Personal users who want to try the platform
            </p>
            <ul className="space-y-2.5">
              {[
                "100 MB secure storage",
                "10 MB/file limit",
                "Basic sharing",
                "Email support",
                "1 device access",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <FaCheckCircle className="text-success mt-0.5 shrink-0" />
                  <span className="text-textSecondary">{f}</span>
                </li>
              ))}
            </ul>
            <div className="text-center text-xs font-medium text-accentPrimary mt-2">
              Current Plan
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="relative rounded-2xl border-2 border-warning bg-bgElevated p-5 flex flex-col gap-4 group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-warning text-black text-xs font-bold uppercase">
                Popular
              </span>
            </div>
            <div className="text-center">
              <div className="inline-block p-2 rounded-full bg-bgPrimary/50 mb-3 text-xl text-accentFocus">
                <FaBolt />
              </div>
              <h3 className="text-2xl font-black text-textPrimary mb-1">Pro</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-accentFocus">
                  ₹50
                </span>
                <span className="text-textSecondary text-sm">/per month</span>
              </div>
            </div>
            <p className="text-xs text-textSecondary text-center">
              Students, freelancers, or small teams
            </p>
            <ul className="space-y-2.5">
              {[
                "1 GB high-speed storage",
                "100 MB/file limit",
                "Advanced sharing",
                "Priority support",
                "3 device access",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <FaCheckCircle className="text-success mt-0.5 shrink-0" />
                  <span className="text-textSecondary">{f}</span>
                </li>
              ))}
            </ul>
            <button className="cursor-pointer w-full py-2.5 rounded-lg bg-bgSecondary border border-borderHover hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 text-sm font-medium">
              Subscribe Now
            </button>
          </div>

          {/* PREMIUM PLAN */}
          <div className="relative rounded-2xl border-2 border-accentFocus bg-bgElevated p-5 flex flex-col gap-4 group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-accentPrimary text-black text-xs font-bold uppercase">
                Ultimate
              </span>
            </div>
            <div className="text-center">
              <div className="inline-block p-2 rounded-full bg-bgPrimary/50 mb-3 text-xl text-accentFocus">
                <FaCrown />
              </div>
              <h3 className="text-2xl font-black text-textPrimary mb-1">
                Premium
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-accentFocus">
                  ₹500
                </span>
                <span className="text-textSecondary text-sm">/per month</span>
              </div>
            </div>
            <p className="text-xs text-textSecondary text-center">
              Professionals & creators handling large files
            </p>
            <ul className="space-y-2.5">
              {[
                "10 GB premium storage",
                "500 MB/file limit",
                "Team collaboration",
                "24/7 phone support",
                "5 device access",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <FaCheckCircle className="text-success mt-0.5 shrink-0" />
                  <span className="text-textSecondary">{f}</span>
                </li>
              ))}
            </ul>
            <button className="cursor-pointer w-full py-2.5 rounded-lg bg-bgSecondary border border-borderHover hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 text-sm font-medium">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-5 border-t border-borderDefault flex justify-center">
          <NavLink
            to="/directory"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bgElevated border border-borderHover hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-accentFocus"
          >
            <MdHome className="text-base" />
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

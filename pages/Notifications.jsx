import { NavLink } from "react-router-dom";
import { MdNotifications, MdHome, MdStar } from "react-icons/md";
import { FaRocket, FaShareAlt } from "react-icons/fa";
import { BsCloudCheck } from "react-icons/bs";

export default function Notifications() {
  return (
    <div className="font-google min-h-screen bg-[var(--color-bgPrimary)] flex items-center px-4">
      <div className="w-full max-w-3xl mx-auto bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] flex flex-col gap-6 p-6 sm:p-8 rounded-xl border border-[var(--color-borderDefault)] shadow-2xl">
        {/* HEADER */}
        <h1 className="flex items-center gap-3 text-3xl sm:text-4xl font-semibold">
          <MdNotifications className="text-[var(--color-info)] text-3xl sm:text-4xl" />
          <span>
            Notifications{" "}
            <span className="text-[var(--color-textSecondary)]">Center</span>
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base text-[var(--color-textSecondary)] max-w-xl">
          Important updates and helpful information about your account and
          activity on{" "}
          <span className="text-[var(--color-textPrimary)] font-medium">
            My-Drive
          </span>
          .
        </p>

        {/* NOTIFICATIONS LIST */}
        <div className="flex flex-col gap-3">
          {/* Notification Item */}
          <div className="flex gap-3 p-4 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderDefault)]">
            <MdStar className="text-[var(--color-warning)] text-xl mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold">Welcome to My-Drive 🎉</h3>
              <p className="text-sm text-[var(--color-textSecondary)]">
                Thank you for signing up. We’re glad to have you on board!
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderDefault)]">
            <BsCloudCheck className="text-[var(--color-success)] text-xl mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold">About the Platform</h3>
              <p className="text-sm text-[var(--color-textSecondary)]">
                My-Drive is maintained by{" "}
                <span className="text-[var(--color-textPrimary)] font-medium">
                  UVDS
                </span>{" "}
                — a modern, simpler, and faster alternative to Google Drive.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderDefault)]">
            <FaRocket className="text-[var(--color-info)] text-xl mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold">Storage & Plans</h3>
              <p className="text-sm text-[var(--color-textSecondary)]">
                You are currently on the{" "}
                <span className="font-medium text-[var(--color-textPrimary)]">
                  Basic
                </span>{" "}
                plan with{" "}
                <span className="font-medium text-[var(--color-textPrimary)]">
                  100 MB
                </span>{" "}
                of free storage.
              </p>
              <NavLink
                to="/purchase-premium"
                className="inline-block mt-1 text-sm text-[var(--color-info)] hover:underline cursor-pointer"
              >
                View available plans →
              </NavLink>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderDefault)]">
            <FaShareAlt className="text-[var(--color-accentPrimary)] text-xl mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold">Referral Bonus</h3>
              <p className="text-sm text-[var(--color-textSecondary)]">
                Share My-Drive with your friends and earn referral bonuses when
                they join.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-[var(--color-borderDefault)] flex justify-end">
          <NavLink
            to="/directory"
            className="
              inline-flex items-center gap-2
              px-6 py-2 rounded-md
              bg-[var(--color-bgElevated)]
              border border-[var(--color-borderHover)]
              hover:bg-[var(--color-accentPrimary)]
              hover:border-[var(--color-borderActive)]
              transition-all duration-200
              cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]
            "
          >
            <MdHome className="text-lg" />
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

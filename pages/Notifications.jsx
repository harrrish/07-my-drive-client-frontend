import { NavLink } from "react-router-dom";
import { MdNotifications, MdHome, MdStar } from "react-icons/md";
import { FaRocket, FaShareAlt } from "react-icons/fa";
import { BsCloudCheck } from "react-icons/bs";
import { FaBell, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";

export default function Notifications() {
  return (
    <div className="font-google font-medium min-h-screen bg-bgPrimary flex items-center px-4 py-8">
      <div className="w-full sm:max-w-7xl mx-auto bg-bgSecondary text-textPrimary flex flex-col gap-5 p-5 sm:p-6 rounded-xl border border-borderDefault shadow-xl">
        {/* HEADER */}
        <div className="flex items-center gap-3 pb-3 border-b border-borderHover">
          <FaBell className="text-info text-2xl sm:text-3xl" />
          <h1 className="text-2xl sm:text-3xl font-bold">
            Notifications{" "}
            <span className="text-textSecondary font-semibold">Center</span>
          </h1>
        </div>

        {/* DESCRIPTION */}
        <p className="text-md text-textSecondary max-w-xl">
          Important updates and helpful information about your account and
          activity on{" "}
          <span className="text-textPrimary font-medium">My-Drive</span>.
        </p>

        {/* NOTIFICATIONS LIST */}
        <div className="flex flex-col gap-3">
          {/* Notification Item */}
          <div className="flex gap-3 p-3 rounded-lg bg-bgElevated border border-borderDefault">
            <MdStar className="text-warning text-lg mt-0.5 shrink-0" />
            <div>
              <h3 className="text-md font-semibold">Welcome to My-Drive 🎉</h3>
              <p className="text-md text-textSecondary">
                Thank you for signing up. We're glad to have you on board!
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 rounded-lg bg-bgElevated border border-borderDefault">
            <FaCheckCircle className="text-success text-lg mt-0.5 shrink-0" />
            <div>
              <h3 className="text-md font-semibold">
                <NavLink
                  to="/about"
                  className="inline-block text-info hover:text-accentFocus hover:underline cursor-pointer transition-colors"
                >
                  About
                </NavLink>{" "}
                the Platform
              </h3>
              <p className="text-md text-textSecondary">
                My-Drive is maintained by{" "}
                <span className="text-textPrimary font-medium">UVDS</span> — a
                modern, simpler, and faster alternative to Google Drive.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 rounded-lg bg-bgElevated border border-borderDefault">
            <IoRocketOutline className="text-info text-lg mt-0.5 shrink-0" />
            <div>
              <h3 className="text-md font-semibold">Storage & Plans</h3>
              <p className="text-md text-textSecondary">
                You are currently on the{" "}
                <span className="font-medium text-textPrimary">Basic</span> plan
                with{" "}
                <span className="font-medium text-textPrimary">100 MB</span> of
                free storage.
              </p>
              <NavLink
                to="/purchase"
                className="inline-block mt-1 text-md text-info hover:text-accentFocus hover:underline cursor-pointer transition-colors"
              >
                View available plans{" "}
                <FaExternalLinkAlt className="inline ml-1 text-md" />
              </NavLink>
            </div>
          </div>

          <div className="flex gap-3 p-3 rounded-lg bg-bgElevated border border-borderDefault">
            <FaShareAlt className="text-accentPrimary text-lg mt-0.5 shrink-0" />
            <div>
              <h3 className="text-md font-semibold">Referral Bonus</h3>
              <p className="text-md text-textSecondary">
                Share My-Drive with your friends and earn referral bonuses when
                they join.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-borderDefault flex justify-end">
          <NavLink
            to="/directory"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-bgElevated border border-borderHover hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accentFocus"
          >
            <MdHome className="text-base" />
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

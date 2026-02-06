import { NavLink } from "react-router-dom";
import { MdErrorOutline, MdHome } from "react-icons/md";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

export default function Error() {
  return (
    <div className="min-h-screen font-medium flex items-center justify-center bg-bgPrimary text-textPrimary px-4 font-google py-8">
      <div className="w-full max-w-md bg-bgSecondary border border-borderDefault rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <FaExclamationTriangle className="text-5xl sm:text-6xl text-warning" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full animate-ping"></div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold">Oops! Page Not Found</h1>
        <p className="text-sm text-textSecondary max-w-xs">
          Looks like you landed here by mistake 😅
        </p>
        <p className="text-xs text-textDisabled max-w-xs">
          The page you're looking for doesn't exist or was moved.
        </p>
        <NavLink
          to="/"
          className="cursor-pointer mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bgElevated border border-borderHover hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-accentFocus"
        >
          <MdHome className="text-base" />
          <span>Back to Home</span>
          <FaArrowLeft className="text-sm ml-1" />
        </NavLink>
      </div>
    </div>
  );
}

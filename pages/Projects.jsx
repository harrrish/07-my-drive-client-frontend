import { NavLink } from "react-router-dom";
import { MdConstruction, MdGroups } from "react-icons/md";
import { FaFolderOpen, FaHome } from "react-icons/fa";

export default function Projects() {
  return (
    <div className="font-google min-h-screen bg-bgPrimary text-textPrimary flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-7 sm:p-9 flex flex-col items-center text-center gap-5">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accentSoft text-accentPrimary text-3xl">
          <MdConstruction />
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold text-textPrimary flex items-center gap-2">
          Feature currently under development !
        </h1>

        <p className="text-textSecondary text-md max-w-lg">
          The <span className="text-accentPrimary font-medium">Projects</span>{" "}
          section will allow users to collaborate efficiently. Here you will be
          able to create shared folders, upload files, and work together with
          others in an organized workspace.
        </p>

        <p className="text-textSecondary text-md max-w-lg flex items-start justify-center gap-2">
          <MdGroups className="text-info text-lg mt-0.5 shrink-0" />
          This feature is designed to enable seamless collaboration without
          requiring users to share direct file access links, making teamwork
          simpler and more secure.
        </p>

        <p className="text-textSecondary text-md max-w-lg">
          Thank you for your patience while we build and improve this
          experience. Your support and feedback help us make the platform better
          for everyone.
        </p>

        <NavLink
          to={"/directory"}
          className="cursor-pointer mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 font-medium"
        >
          <FaHome className="text-base" />
          Back to Home
        </NavLink>
      </div>
    </div>
  );
}

import { IoCloudUploadOutline } from "react-icons/io5";
import { MdLogin } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="font-google min-h-screen bg-[var(--color-bgPrimary)] flex items-center px-4">
      <div className="w-full max-w-3xl mx-auto bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] flex flex-col gap-6 p-6 sm:p-8 rounded-xl border border-[var(--color-borderDefault)] shadow-2xl">
        <h1 className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="text-3xl text-[var(--color-accentFocus)]">
              <IoCloudUploadOutline />
            </span>
            <span className="text-2xl font-semibold tracking-wide">UVDS</span>
          </div>
          <span className="text-2xl font-semibold">My-Drive</span>
        </h1>

        <div className="flex flex-col gap-4 text-center text-sm sm:text-base leading-relaxed text-[var(--color-textSecondary)]">
          <p>
            My-Drive is a secure, cloud-based file storage web application
            inspired by Google Drive. It enables users to efficiently store,
            manage, and organize their personal files and folders from anywhere.
          </p>

          <p>
            Users can seamlessly upload, download, preview, rename, and delete
            files, as well as create and manage custom folders to keep their
            content structured and easily accessible.
          </p>

          <p>
            Your data’s safety is a top priority. To learn more about how{" "}
            <span className="text-[var(--color-textPrimary)] font-medium">
              My-Drive
            </span>{" "}
            protects your files using modern security practices, click the{" "}
            <NavLink
              to="/about"
              className="text-[var(--color-info)] underline underline-offset-4 hover:text-[var(--color-accentFocus)] transition-colors"
            >
              link
            </NavLink>{" "}
            to explore our security architecture and safeguards.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
          <NavLink
            to="/login"
            className="flex items-center justify-center gap-2 w-full sm:w-1/2 px-4 py-2 rounded-lg border border-[var(--color-borderHover)] bg-[var(--color-bgElevated)] text-[var(--color-textPrimary)] hover:bg-[var(--color-accentPrimary)] hover:border-[var(--color-borderActive)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
          >
            <MdLogin />
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="flex items-center justify-center gap-2 w-full sm:w-1/2 px-4 py-2 rounded-lg border border-[var(--color-borderHover)] bg-[var(--color-bgElevated)] text-[var(--color-textPrimary)] hover:bg-[var(--color-accentPrimary)] hover:border-[var(--color-borderActive)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
          >
            <TiUserAdd />
            Signup
          </NavLink>
        </div>
      </div>
    </div>
  );
}

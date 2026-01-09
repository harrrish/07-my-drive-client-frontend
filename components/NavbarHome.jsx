import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserSettingViewContext } from "../utils/Contexts";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function CompNavbar() {
  const navigate = useNavigate();
  const { setUserView } = useContext(UserSettingViewContext);

  return (
    <nav className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto p-3 rounded-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] flex justify-between items-center">
      <button
        onClick={() => navigate("/directory")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <IoCloudUploadOutline className="text-2xl text-[var(--color-accentPrimary)]" />
        <span className="text-lg font-medium">My-Drive</span>
      </button>

      <button
        onClick={() => setUserView((p) => !p)}
        className="cursor-pointer text-xl hover:text-[var(--color-accentPrimary)]"
      >
        <RiUserSettingsFill />
      </button>
    </nav>
  );
}

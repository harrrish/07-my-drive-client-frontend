import { useContext, useState } from "react";
import { ErrorContext, UserSettingViewContext } from "../utils/Contexts";
import { FaGoogleDrive, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { axiosError } from "../utils/AxiosInstance";
import { baseURL } from "../src/main";
import { IoCloudUploadOutline, IoLogOut } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { UserStorageContext } from "../utils/Contexts";
import { calSize } from "../utils/CalculateFileSize";
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";

export default function UserSettings() {
  const { setUserView } = useContext(UserSettingViewContext);
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { userStorage } = useContext(UserStorageContext);
  const [logout, setLogout] = useState(false);

  async function handleLogout() {
    setLogout(true);
    try {
      const res = await fetch(`${baseURL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/login");
        setLogout(false);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
      setLogout(false);
    }
  }

  return (
    <div className="min-h-screen w-full sm:max-w-md bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] flex flex-col justify-between p-4 shadow-2xl border-l border-[var(--color-borderDefault)]">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--color-borderHover)]">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <IoCloudUploadOutline className="text-2xl text-[var(--color-accentFocus)]" />
          My-Drive
        </h1>
        <button
          onClick={() => setUserView(false)}
          className="cursor-pointer p-1 rounded-md hover:bg-[var(--color-bgElevated)] transition"
        >
          <IoIosClose className="text-2xl" />
        </button>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2 py-4 text-sm">
        <button
          onClick={() => navigate("/notifications")}
          className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-borderHover)] transition-all font-medium"
        >
          <IoIosNotifications className="text-lg" />
          Notifications
        </button>

        <button
          onClick={() => navigate("/starred")}
          className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-borderHover)] transition-all font-medium"
        >
          <FaStar className="text-lg" />
          Starred Files/Folders
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-borderHover)] transition-all font-medium"
        >
          <FaGoogleDrive className="text-lg" />
          Import from Google Drive
        </button>

        <button
          onClick={() => navigate("/shared")}
          className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-borderHover)] transition-all font-medium"
        >
          <AiOutlineUserSwitch className="text-lg" />
          Contents Shared
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-borderHover)] transition-all font-medium"
        >
          <FaUser className="text-lg" />
          Profile
        </button>

        <button
          onClick={() => navigate("/trashed")}
          className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-borderHover)] transition-all font-medium"
        >
          <FaTrash className="text-lg" />
          Trash Bin
        </button>

        <button
          onClick={() => navigate("/purchase-premium")}
          className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-borderHover)] transition-all font-medium"
        >
          <BiSolidPurchaseTag className="text-lg" />
          Upgrade Plan
        </button>
      </div>

      {/* STORAGE + ACTIONS */}
      <div className="flex flex-col gap-3 pt-4 border-t border-[var(--color-borderHover)]">
        <div className="w-full bg-[var(--color-borderDefault)] h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-accentPrimary)]"
            style={{
              width: `${
                (userStorage.size / userStorage.maxStorageInBytes) * 100
              }%`,
            }}
          />
        </div>

        <p className="text-xs text-center text-[var(--color-textSecondary)]">
          Used {calSize(userStorage.size)} of{" "}
          {calSize(userStorage.maxStorageInBytes)}
        </p>

        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-error)] transition-all"
        >
          <IoLogOut className="text-lg" />
          {logout ? "Logging out..." : "Logout"}
        </button>

        <button className="cursor-pointer flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] hover:bg-[var(--color-error)] transition-all">
          <IoLogOut className="text-lg" />
          Logout from All Devices
        </button>
      </div>
    </div>
  );
}

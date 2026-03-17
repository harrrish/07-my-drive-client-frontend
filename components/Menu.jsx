import { useContext, useState } from "react";
import {
  ErrorContext,
  UserDetailsContext,
  UserSettingViewContext,
} from "../utils/Contexts";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { axiosError } from "../utils/AxiosInstance";
import { baseURL } from "../src/main";
import { IoCloudUploadOutline, IoLogOut } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { calSize } from "../utils/CalculateFileSize";
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";

export default function Menu({ directoryDetails }) {
  // console.log(directoryDetails);

  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const { setOpenSettings } = useContext(UserSettingViewContext);
  const { setError } = useContext(ErrorContext);

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
    <div className="min-h-screen w-full sm:max-w-md bg-bgSecondary text-textPrimary flex flex-col justify-between p-4 shadow-2xl border-l border-borderDefault">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-borderHover">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <IoCloudUploadOutline className="text-2xl text-accentFocus" />
          My-Drive
        </h1>
        <button
          onClick={() => setOpenSettings(false)}
          className="cursor-pointer p-1.5 rounded-md hover:bg-bgElevated transition-colors"
        >
          <IoIosClose className="text-2xl text-textSecondary hover:text-textPrimary" />
        </button>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2 py-4 text-md">
        <button
          onClick={() => navigate("/notifications")}
          className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-md bg-bgElevated hover:bg-borderHover transition-colors font-medium"
        >
          <div className="flex items-center gap-3">
            <IoIosNotifications className="text-base text-info" />
            <span>Notifications</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-md bg-bgElevated hover:bg-borderHover transition-colors font-medium"
        >
          <div className="flex items-center gap-3">
            <FaUser className="text-base text-accentPrimary" />
            <span>Profile</span>
          </div>
        </button>

        <button
          disabled={
            directoryDetails.role === "BASIC" && directoryDetails.roleCode === 1
          }
          onClick={() => navigate("/starred")}
          className={`flex items-center justify-between px-3 py-2.5 rounded-md font-medium ${
            directoryDetails.role === "BASIC" && directoryDetails.roleCode === 1
              ? "bg-bgElevated opacity-50 cursor-not-allowed pointer-events-none"
              : "bg-bgElevated hover:bg-borderHover cursor-pointer transition-colors"
          }`}
        >
          <div className="flex items-center gap-3">
            <FaStar className="text-base text-warning" />
            <span>Starred Files/Folders</span>
          </div>
        </button>

        <button
          disabled={
            directoryDetails.role === "BASIC" && directoryDetails.roleCode === 1
          }
          onClick={() => navigate("/shared")}
          className={`flex items-center justify-between px-3 py-2.5 rounded-md font-medium ${
            directoryDetails.role === "BASIC" && directoryDetails.roleCode === 1
              ? "bg-bgElevated opacity-50 cursor-not-allowed pointer-events-none"
              : "bg-bgElevated hover:bg-borderHover cursor-pointer transition-colors"
          }`}
        >
          <div className="flex items-center gap-3">
            <AiOutlineUserSwitch className="text-base text-accentFocus" />
            <span>Contents Shared</span>
          </div>
        </button>

        <button
          disabled={
            (directoryDetails.role === "BASIC" ||
              directoryDetails.role === "PRO") &&
            (directoryDetails.roleCode === 1 || directoryDetails.roleCode === 2)
          }
          onClick={() => navigate("/projects")}
          className={`flex items-center justify-between px-3 py-2.5 rounded-md font-medium ${
            (directoryDetails.role === "BASIC" &&
              directoryDetails.roleCode === 1) ||
            (directoryDetails.role === "PRO" && directoryDetails.roleCode === 2)
              ? "bg-bgElevated opacity-50 cursor-not-allowed pointer-events-none"
              : "bg-bgElevated hover:bg-borderHover cursor-pointer transition-colors"
          }`}
        >
          <div className="flex items-center gap-3">
            <AiOutlineUserSwitch className="text-base text-accentFocus" />
            <span>User Projects</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/trashed")}
          className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-md bg-bgElevated hover:bg-borderHover transition-colors font-medium"
        >
          <div className="flex items-center gap-3">
            <FaTrash className="text-base text-error" />
            <span>Trash Bin</span>
          </div>
        </button>

        <button
          onClick={() => navigate("/purchase")}
          className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-md bg-bgElevated hover:bg-borderHover transition-colors font-medium"
        >
          <div className="flex items-center gap-3">
            <BiSolidPurchaseTag className="text-base text-warning" />
            <span>Upgrade Plan</span>
          </div>
        </button>
      </div>

      {/* STORAGE + ACTIONS */}
      <div className="flex flex-col gap-3 pt-4 border-t border-borderHover">
        <div className="w-full bg-borderDefault h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-accentPrimary"
            style={{
              width: `${(directoryDetails.usedStorage / directoryDetails.totalStorage) * 100}%`,
            }}
          />
        </div>

        <p className="text-md text-center text-textSecondary">
          Used {calSize(directoryDetails.usedStorage)} of{" "}
          {calSize(directoryDetails.totalStorage)}
        </p>

        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-md bg-bgElevated hover:bg-error hover:text-textPrimary transition-colors"
        >
          <div className="flex items-center gap-3 tracking-wider">
            <IoLogOut className="text-base" />
            <span>{logout ? "Logging out..." : "Logout"}</span>
          </div>
        </button>
      </div>
    </div>
  );
}

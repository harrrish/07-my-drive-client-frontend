import {
  FaDatabase,
  FaFolder,
  FaRocket,
  FaArrowUp,
  FaUserEdit,
} from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import { ErrorContext } from "../utils/Contexts";
import { calSize } from "../utils/CalculateFileSize";
import { useNavigate } from "react-router-dom";
import {
  IoCloudUploadOutline,
  IoLogOut,
  IoPersonCircle,
} from "react-icons/io5";
import { FaCrown, FaKey, FaTrashAlt, FaHome } from "react-icons/fa";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { FaBell, FaInfoCircle } from "react-icons/fa";
import { FaInbox, FaPaperPlane } from "react-icons/fa";
import AllLogoutConfirm from "../modals/AllLogoutConfirm";

export default function PageUserProfile() {
  const [userProfileInfo, setUserProfileInfo] = useState({
    name: "",
    email: "",
    contactNumber: "",
    username: "",
    maxStorageInBytes: 0,
    picture: "",
    role: "",
    size: 0,
    starredItemsCount: 0,
    trashedItemsCount: 0,
    sharedByMeCount: 0,
    sharedWithMeCount: 0,
  });
  const { setError } = useContext(ErrorContext);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [allLogoutConfirm, setAllLogoutConfirm] = useState(false);

  const handleUserProfileData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosWithCreds.get(`/user/profile`, {
        withCredentials: true,
      });
      setUserProfileInfo({
        name: data.name || "",
        email: data.email || "",
        maxStorageInBytes: data.maxStorageInBytes || 0,
        contactNumber: data.contactNumber || "",
        username: data.username || "",
        picture: data.picture || "",
        role: data.role || "",
        size: data.size || 0,
        starredItemsCount: data.starredItemsCount || 0,
        trashedItemsCount: data.trashedItemsCount || 0,
        sharedByMeCount: data.sharedByMeCount || 0,
        sharedWithMeCount: data.sharedWithMeCount || 0,
      });
      console.log(data);
    } catch (error) {
      axiosError(error, navigate, setError, null, "Something went wrong !");
    } finally {
      setLoading(false);
    }
  }, [setUserProfileInfo, navigate, setError]);

  async function handleLogout() {
    try {
      const { data } = await axiosWithCreds.post(`/user/logout`, {
        withCredentials: true,
      });
      console.log(data.message);
      navigate("/login", { replace: true });
    } catch (error) {
      axiosError(error, navigate, setError);
    }
  }

  useEffect(() => {
    handleUserProfileData();
  }, [handleUserProfileData]);

  useEffect(() => {
    setImgError(false);
  }, [userProfileInfo?.picture]);

  if (loading) {
    return <ProfilePageShimmer />;
  }

  return (
    <div className="min-h-screen font-google font-medium bg-bgPrimary text-textPrimary flex flex-col">
      {/* LOGOUT EVERYWHERE MODAL */}
      <div>
        {allLogoutConfirm && (
          <AllLogoutConfirm setAllLogoutConfirm={setAllLogoutConfirm} />
        )}
      </div>

      {/* TOP NAVBAR */}
      <div className="w-full bg-bgSecondary border-b border-borderDefault px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <IoCloudUploadOutline className="text-accentFocus text-4xl" />
          <span className="font-bold text-2xl">My-Drive Dashboard</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/directory")}
            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-bgElevated transition-colors"
          >
            <FaHome />
            <span className="hidden sm:inline text-lg">Home</span>
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-info hover:text-black transition-colors"
          >
            <IoLogOut />
            <span className="hidden sm:inline text-lg">Logout</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {/* PROFILE HERO */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* COVER BANNER */}
          <div className="h-15 sm:h-17 rounded-xl bg-linear-to-r from-accentPrimary via-info to-warning relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* FLOATING CARD */}
          <div className="relative -mt-14 sm:-mt-16 bg-bgSecondary/80 backdrop-blur-xl border border-borderDefault rounded-2xl shadow-elevated px-5 py-6 sm:px-6 sm:py-7 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* AVATAR (FLOATING OVER BANNER) */}
            <div className="relative shrink-0">
              {userProfileInfo?.picture && !imgError ? (
                <img
                  src={userProfileInfo.picture}
                  onError={() => setImgError(true)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-bgSecondary shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-bgElevated border-4 border-bgSecondary flex items-center justify-center text-accentFocus text-4xl font-bold shadow-lg">
                  {userProfileInfo?.name?.charAt(0)?.toUpperCase() || (
                    <IoPersonCircle />
                  )}
                </div>
              )}

              {/* PREMIUM BADGE */}
              {userProfileInfo?.role?.toLowerCase() === "premium" && (
                <div className="absolute -bottom-1 -right-1 bg-warning text-black rounded-full p-1.5 shadow-md">
                  <FaCrown className="text-sm" />
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="flex flex-col gap-2 text-center sm:text-left flex-1">
              {/* NAME + EDIT */}
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <h2 className="text-xl sm:text-2xl font-semibold text-textPrimary">
                  {userProfileInfo.name}
                </h2>

                <button
                  className="text-textSecondary hover:text-info text-2xl transition cursor-pointer"
                  title="Edit your information"
                >
                  <FaUserEdit />
                </button>
              </div>

              {/* EMAIL */}
              <p className="text-textSecondary text-sm sm:text-md">
                {userProfileInfo.email}
              </p>

              {/* TAGS */}
              {userProfileInfo.username && userProfileInfo.contactNumber && (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-1">
                  {userProfileInfo.username && (
                    <span className="px-3 py-1 rounded-full bg-bgPrimary border border-borderHover text-xs text-textPrimary">
                      {userProfileInfo.username}
                    </span>
                  )}

                  {userProfileInfo.contactNumber && (
                    <span className="px-3 py-1 rounded-full bg-bgPrimary border border-borderHover text-xs text-textSecondary">
                      {userProfileInfo.contactNumber}
                    </span>
                  )}
                </div>
              )}

              {/* ROLE + CTA */}
              <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
                <span className="px-3 py-1 rounded-sm bg-accentPrimary text-black text-xs font-semibold uppercase">
                  {userProfileInfo.role}
                </span>

                {userProfileInfo.role !== "PREMIUM" && (
                  <button
                    onClick={() => navigate("/purchase")}
                    className="px-3 py-1 rounded-sm bg-warning text-black text-xs font-semibold flex items-center gap-1 hover:scale-105 transition-transform"
                  >
                    Upgrade
                    <FaArrowUp />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2">
          {/* STORAGE USED */}
          <div className="bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-2 justify-center">
            <FaDatabase className="text-accentFocus text-xl" />
            <span className="text-textSecondary text-md font-medium">
              Storage Used
            </span>
            <span className="font-bold text-textPrimary text-xl">
              {calSize(userProfileInfo.size)}
            </span>
          </div>

          {/* MAX STORAGE */}
          <div className="bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-2 justify-center">
            <FaDatabase className="text-accentFocus text-xl" />
            <span className="text-textSecondary text-md font-medium">
              Max Storage
            </span>
            <span className="font-bold text-textPrimary text-xl">
              {calSize(userProfileInfo.maxStorageInBytes)}
            </span>
          </div>

          {/* STARRED */}
          <button
            onClick={() => navigate("/starred")}
            className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-2 justify-center hover:border-accentPrimary transition-colors group text-left"
          >
            <FaFolder className="text-accentFocus text-xl" />
            <span className="text-textSecondary text-md font-medium">
              Starred Content
            </span>
            <span className="font-bold text-textPrimary text-xl">
              {userProfileInfo.starredItemsCount}
            </span>
          </button>

          {/* SHARED with Me*/}
          <button
            onClick={() => navigate("/shared")}
            className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-2 justify-center hover:border-accentPrimary transition-colors group text-left"
          >
            <FaInbox className="text-accentFocus text-xl" />
            <span className="text-textSecondary text-md font-medium">
              Shared Files with Me
            </span>
            <span className="font-bold text-textPrimary text-xl">
              {userProfileInfo.sharedWithMeCount}
            </span>
          </button>

          {/* SHARED by Me */}
          <button
            onClick={() => navigate("/shared")}
            className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-2 justify-center hover:border-accentPrimary transition-colors group text-left"
          >
            <FaPaperPlane className="text-accentFocus text-xl" />
            <span className="text-textSecondary text-md font-medium">
              Shared Files by Me
            </span>
            <span className="font-bold text-textPrimary text-xl">
              {userProfileInfo.sharedByMeCount}
            </span>
          </button>

          {/* TRASH */}
          <button
            onClick={() => navigate("/trashed")}
            className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-2 justify-center hover:border-error transition-colors group text-left"
          >
            <FaTrashAlt className="text-error text-xl" />
            <span className="text-textSecondary text-md font-medium">
              Trash Files
            </span>
            <span className="font-bold text-textPrimary text-xl">
              {userProfileInfo.trashedItemsCount}
            </span>
          </button>
        </div>

        {/* STORAGE BAR PANEL */}
        <div className="bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-3">
          <div className="flex justify-between text-md">
            <span className="text-textSecondary">Storage Usage</span>

            <span>
              {Math.round(
                (userProfileInfo.size / userProfileInfo.maxStorageInBytes) *
                  100,
              )}
              %
            </span>
          </div>

          <div className="w-full h-3 bg-borderDefault rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-accentPrimary to-accentFocus"
              style={{
                width: `${(userProfileInfo.size / userProfileInfo.maxStorageInBytes) * 100}%`,
              }}
            />
          </div>
        </div>
        {/* ACTION PANEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={() => navigate("/notifications")}
            className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex items-center gap-4 hover:border-accentPrimary transition-colors"
          >
            <FaBell className="text-accentFocus text-xl" />
            <span className="font-semibold">Notifications</span>
          </button>
          <button
            onClick={() => navigate("/projects")}
            className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex items-center gap-4 hover:border-accentPrimary transition-colors"
          >
            <FaRocket className="text-accentFocus text-xl" />
            <span className="font-semibold">Projects</span>
          </button>
          <button
            onClick={() => navigate("/about")}
            className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex items-center gap-4 hover:border-accentPrimary transition-colors"
          >
            <FaInfoCircle className="text-accentFocus text-xl" />
            <span className="font-semibold">About</span>
          </button>

          <button className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex items-center gap-4 hover:border-error hover:bg-error hover:text-black transition-colors">
            <FaTrashAlt />
            <span className="font-semibold">Delete Account</span>
          </button>

          <button className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex items-center gap-4 hover:border-error hover:bg-error hover:text-black transition-colors">
            <FaKey />
            <span className="font-semibold">Deactivate Account</span>
          </button>

          <button
            onClick={() => setAllLogoutConfirm(true)}
            className="cursor-pointer bg-bgSecondary border border-borderDefault rounded-xl p-5 flex items-center gap-4 hover:border-info hover:bg-info hover:text-black transition-colors"
          >
            <IoLogOut />
            <span className="font-semibold">Logout from all devices</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePageShimmer() {
  return (
    <div className="min-h-screen font-google font-medium bg-bgPrimary text-textPrimary flex flex-col">
      {/* TOP NAVBAR */}
      <div className="w-full bg-bgSecondary border-b border-borderDefault px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-bgElevated rounded-full" />
          <div className="h-6 w-48 bg-bgElevated rounded" />
        </div>
        <div className="flex items-center gap-4">
          <div className="h-8 w-20 bg-bgElevated rounded" />
          <div className="h-8 w-24 bg-bgElevated rounded" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {/* PROFILE HERO */}
        <div className="bg-bgSecondary border border-borderDefault rounded-2xl px-5 py-5 sm:px-6 sm:py-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-elevated">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-bgElevated" />
          <div className="flex flex-col gap-3 flex-1 w-full">
            <div className="h-6 w-40 bg-bgElevated rounded" />
            <div className="h-5 w-64 bg-bgElevated rounded" />
            <div className="flex gap-3 mt-2">
              <div className="h-7 w-24 bg-bgElevated rounded" />
              <div className="h-7 w-24 bg-bgElevated rounded" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-2 items-end">
            <div className="h-4 w-24 bg-bgElevated rounded" />
            <div className="h-4 w-16 bg-bgElevated rounded" />
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="w-6 h-6 bg-bgElevated rounded" />
              <div className="h-4 w-32 bg-bgElevated rounded" />
              <div className="h-6 w-20 bg-bgElevated rounded" />
            </div>
          ))}
        </div>

        {/* STORAGE BAR PANEL */}
        <div className="bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="h-4 w-32 bg-bgElevated rounded" />
            <div className="h-4 w-12 bg-bgElevated rounded" />
          </div>
          <div className="w-full h-3 bg-bgElevated rounded-full" />
        </div>

        {/* ACTION PANEL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-bgSecondary border border-borderDefault rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-6 h-6 bg-bgElevated rounded" />
              <div className="h-5 w-40 bg-bgElevated rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

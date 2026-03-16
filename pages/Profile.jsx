import {
  FaDatabase,
  FaFolder,
  FaRocket,
  FaArrowUp,
  FaUserEdit,
} from "react-icons/fa";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ErrorContext, UserDetailsContext } from "../utils/Contexts";
import { calSize } from "../utils/CalculateFileSize";
import { useNavigate } from "react-router-dom";
import {
  IoCloudUploadOutline,
  IoLogOut,
  IoPersonCircle,
} from "react-icons/io5";
import {
  FaUserCircle,
  FaCrown,
  FaKey,
  FaTrashAlt,
  FaHome,
} from "react-icons/fa";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { FaBell, FaInfoCircle } from "react-icons/fa";
import { FaInbox, FaPaperPlane } from "react-icons/fa";
import AllLogoutConfirm from "../modals/AllLogoutConfirm";

export default function PageUserProfile() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
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
      setUserDetails({ ...data });
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    } finally {
      setLoading(false);
    }
  }, [setUserDetails, navigate, setError]);

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

  const fetchStarredItems = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/star/contents`);
      // console.log("Star:", data.filesCount + data.foldersCount);
      setUserDetails((prev) => ({
        ...prev,
        starredFiles:
          (prev.starredFiles ?? 0) + data.filesCount + data.foldersCount,
      }));
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong!");
    }
  }, [navigate, setError, setUserDetails]);

  const fetchTrashedItems = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/trash/contents`);
      // console.log("Trash:", data.filesCount + data.foldersCount);
      setUserDetails((prev) => ({
        ...prev,
        trashedFiles:
          (prev.trashedFiles ?? 0) + data.filesCount + data.foldersCount,
      }));
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }, [navigate, setError, setUserDetails]);

  const fetchSharedWithUserItems = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/share/file/with-user`);
      // console.log("WithMe:", data.filesCount);
      setUserDetails((prev) => ({
        ...prev,
        sharedFilesWithMe: (prev.sharedFilesWithMe ?? 0) + data.filesCount,
      }));
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong!");
    }
  }, [navigate, setError, setUserDetails]);

  const fetchSharedByUserItems = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/share/file/by-user`);
      // console.log("ByMe:", data.filesCount);
      setUserDetails((prev) => ({
        ...prev,
        sharedFilesByMe: (prev.sharedFilesByMe ?? 0) + data.filesCount,
      }));
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong!");
    }
  }, [navigate, setError, setUserDetails]);

  useEffect(() => {
    handleUserProfileData();
    fetchStarredItems();
    fetchTrashedItems();
    fetchSharedByUserItems();
    fetchSharedWithUserItems();
  }, [
    handleUserProfileData,
    fetchStarredItems,
    fetchTrashedItems,
    fetchSharedByUserItems,
    fetchSharedWithUserItems,
  ]);

  useEffect(() => {
    setImgError(false);
  }, [userDetails?.picture]);

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
        <div className="relative bg-linear-to-br from-bgSecondary via-bgElevated to-bgSecondary border border-borderDefault rounded-2xl px-5 py-5 sm:px-6 sm:py-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-elevated overflow-hidden">
          {/* subtle glow accent */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accentPrimary/10 blur-3xl rounded-full pointer-events-none" />

          {/* avatar */}
          <div className="relative shrink-0">
            {userDetails?.picture && !imgError ? (
              <img
                src={userDetails.picture}
                onError={() => setImgError(true)}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-borderHover shadow-md"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-bgElevated border border-borderHover flex items-center justify-center text-accentFocus text-4xl font-bold shadow-md">
                {userDetails?.name?.charAt(0)?.toUpperCase() || (
                  <IoPersonCircle />
                )}
              </div>
            )}

            {/* Role Indicator */}
            {userDetails?.role?.toLowerCase() === "PREMIUM" && (
              <div className="absolute -bottom-1 -right-1 bg-warning text-black rounded-full p-1.5 border border-bgSecondary">
                <FaCrown className="text-md" />
              </div>
            )}
          </div>

          {/* info block */}
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left flex-1 min-w-0">
            {/* name */}
            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
              <span className="text-lg sm:text-2xl font-semibold capitalize text-textPrimary truncate max-w-50 sm:max-w-none">
                {userDetails.name}
              </span>

              <button
                className="cursor-pointer outline-0"
                title="Edit Profile"
                onClick={() => console.log("Edit Profile !")}
              >
                <FaUserEdit className="text-info shrink-0 text-xl" />
              </button>
            </div>

            {/* email */}
            <span className="text-textSecondary text-xl truncate max-w-62.5 sm:max-w-none">
              {userDetails.email}
            </span>

            {/* role + upgrade */}
            <div className="flex items-center gap-2 mt-2 flex-wrap justify-center sm:justify-start">
              <span className="px-3 py-1 rounded-sm bg-accentPrimary text-black text-md font-semibold capitalize tracking-wide shadow-sm">
                {userDetails.role}
              </span>

              {userDetails.role !== "PREMIUM" && (
                <button
                  onClick={() => navigate("/purchase")}
                  className="cursor-pointer px-3 py-1 rounded-sm bg-warning text-black text-md font-semibold flex items-center gap-1 hover:bg-highlightPrimary transition-colors shadow-sm"
                >
                  Upgrade
                  <FaArrowUp className="text-md" />
                </button>
              )}
            </div>
          </div>

          {/* right side quick stat */}
          <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
            <span className="text-textMuted text-md uppercase tracking-wide">
              Account Status
            </span>

            <span className="text-success text-md font-semibold">Active</span>
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
              {calSize(userDetails.size)}
            </span>
          </div>

          {/* MAX STORAGE */}
          <div className="bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-2 justify-center">
            <FaDatabase className="text-accentFocus text-xl" />
            <span className="text-textSecondary text-md font-medium">
              Max Storage
            </span>
            <span className="font-bold text-textPrimary text-xl">
              {calSize(userDetails.maxStorageInBytes)}
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
              {userDetails.starredFiles ?? 0}
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
              {userDetails.sharedFilesWithMe ?? 0}
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
              {userDetails.sharedFilesByMe ?? 0}
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
              {userDetails.trashedFiles ?? 0}
            </span>
          </button>
        </div>

        {/* STORAGE BAR PANEL */}
        <div className="bg-bgSecondary border border-borderDefault rounded-xl p-5 flex flex-col gap-3">
          <div className="flex justify-between text-md">
            <span className="text-textSecondary">Storage Usage</span>

            <span>
              {Math.round(
                (userDetails.size / userDetails.maxStorageInBytes) * 100,
              )}
              %
            </span>
          </div>

          <div className="w-full h-3 bg-borderDefault rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-accentPrimary to-accentFocus"
              style={{
                width: `${(userDetails.size / userDetails.maxStorageInBytes) * 100}%`,
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

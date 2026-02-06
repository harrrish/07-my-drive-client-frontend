import React, { useCallback, useContext, useEffect, useState } from "react";
import { ErrorContext, UserDetailsContext } from "../utils/Contexts";
import { calSize } from "../utils/CalculateFileSize";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../src/main";
import { IoCloudUploadOutline, IoLogOut } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { FaUserCircle, FaCrown, FaKey, FaTrashAlt } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

export default function PageUserProfile() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { setError } = useContext(ErrorContext);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const handleUserProfileData = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/user/profile`, {
        withCredentials: true,
      });
      console.log(data);
      setUserDetails({ ...data });
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }, [setUserDetails, navigate, setError]);

  async function handleLogout() {
    const res = await fetch(`${baseURL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) navigate("/login");
  }

  useEffect(() => {
    handleUserProfileData();
  }, [handleUserProfileData]);

  useEffect(() => {
    setImgError(false);
  }, [userDetails?.picture]);

  return (
    <div className="min-h-screen flex items-center justify-center font-google bg-bgPrimary text-textPrimary px-4 font-medium py-8">
      <div className="w-full max-w-xl bg-bgSecondary border border-borderDefault rounded-2xl p-5 sm:p-6 flex flex-col gap-5 shadow-xl relative overflow-hidden">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-bgElevated/5 to-transparent animate-[slide_3s_ease-in-out_infinite]" />

        {/* HEADER */}
        <div className="flex justify-between items-center gap-3 pb-3 border-b border-borderHover relative z-10">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <IoCloudUploadOutline className="text-2xl text-accentFocus" />
            <span>My-Drive</span>
            <span className="text-textSecondary">· Profile</span>
          </h2>
          <span
            className="text-xs text-textSecondary truncate max-w-[45%] sm:max-w-[55%] bg-bgElevated px-2 py-1 rounded border border-borderDefault"
            title={userDetails.email}
          >
            {userDetails.email}
          </span>
        </div>

        {/* AVATAR */}
        <div className="flex justify-center relative z-10">
          {userDetails?.picture && !imgError ? (
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-accentPrimary/20 to-accentFocus/20 blur-xl animate-pulse" />
              <img
                src={userDetails.picture}
                alt={`${userDetails.name}'s profile picture`}
                onError={() => setImgError(true)}
                className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-2 border-borderHover shadow-lg relative z-10"
              />
            </div>
          ) : (
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center text-5xl font-bold bg-linear-to-br from-bgElevated to-borderDefault border-2 border-borderHover text-accentFocus shadow-lg">
              {userDetails?.name?.charAt(0)?.toUpperCase() || (
                <IoPersonCircle className="text-4xl" />
              )}
            </div>
          )}
        </div>

        {/* USER INFO */}
        <div className="flex justify-between items-center bg-linear-to-r from-bgElevated to-borderDefault/50 border border-borderHover rounded-lg px-3 py-2.5 relative z-10">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-accentPrimary text-xl" />
            <span className="font-medium capitalize text-textPrimary">
              {userDetails.name}
            </span>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-linear-to-r from-borderDefault to-bgElevated text-textSecondary font-medium border border-borderHover">
            {userDetails.role}
          </span>
        </div>

        {/* STORAGE */}
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-full h-2 rounded-full bg-borderDefault overflow-hidden border border-borderHover">
            <div
              className="h-full bg-linear-to-r from-accentPrimary to-accentFocus transition-all"
              style={{
                width: `${(userDetails.size / userDetails.maxStorageInBytes) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-center text-textSecondary">
            Used{" "}
            <span className="text-textPrimary font-medium bg-bgElevated px-1 rounded">
              {calSize(userDetails.size)}
            </span>{" "}
            of{" "}
            <span className="text-textPrimary font-medium bg-bgElevated px-1 rounded">
              {calSize(userDetails.maxStorageInBytes)}
            </span>
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-2.5 relative z-10">
          <button
            onClick={() => navigate("/directory")}
            className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-lg bg-linear-to-r from-bgElevated to-borderDefault/30 border border-borderHover hover:border-accentPrimary hover:bg-accentPrimary transition-all duration-150 group"
          >
            <div className="flex items-center gap-3">
              <FaHome className="text-base group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">HOME</span>
            </div>
            <div className="w-1 h-4 bg-accentPrimary rounded opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => navigate("/purchase-premium")}
            className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-lg bg-linear-to-r from-bgElevated to-borderDefault/30 border border-borderHover hover:border-warning hover:bg-warning transition-all duration-150 group"
          >
            <div className="flex items-center gap-3">
              <FaCrown className="text-base group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">UPGRADE TO PREMIUM</span>
            </div>
            <div className="w-1 h-4 bg-warning rounded opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-lg bg-linear-to-r from-bgElevated to-borderDefault/30 border border-borderHover hover:border-info hover:bg-info transition-all duration-150 group"
          >
            <div className="flex items-center gap-3">
              <IoLogOut className="text-base group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">LOGOUT ALL ACCOUNTS</span>
            </div>
            <div className="w-1 h-4 bg-info rounded opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-lg bg-linear-to-r from-bgElevated to-borderDefault/30 border border-borderHover hover:border-error hover:bg-error transition-all duration-150 group">
            <div className="flex items-center gap-3">
              <FaKey className="text-base group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">DEACTIVATE ACCOUNT</span>
            </div>
            <div className="w-1 h-4 bg-error rounded opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => console.log("User deleted")}
            className="cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-lg bg-linear-to-r from-bgElevated to-borderDefault/30 border border-borderHover hover:border-error hover:bg-error transition-all duration-150 group"
          >
            <div className="flex items-center gap-3">
              <FaTrashAlt className="text-base group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-sm">DELETE ACCOUNT</span>
            </div>
            <div className="w-1 h-4 bg-error rounded opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}

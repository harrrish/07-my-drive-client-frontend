import React, { useCallback, useContext, useEffect } from "react";
import {
  ErrorContext,
  UserDetailsContext,
  UserStorageContext,
} from "../utils/Contexts";
import { calSize } from "../utils/CalculateFileSize";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../src/main";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { IoCloudUploadOutline, IoLogOut } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { TiUserDelete } from "react-icons/ti";

export default function PageUserProfile() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { userStorage, setUserStorage } = useContext(UserStorageContext);
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);

  const imgDefault =
    "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg";

  const handleUserProfileDetails = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/user/profile`, {
        withCredentials: true,
      });
      setUserDetails({ ...data });
    } catch (error) {
      axiosError(error, navigate, setError, "Failed to fetch user info");
    }
  }, [setUserDetails, navigate, setError]);

  const handleUserStorageDetails = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/user/storage-details`, {
        withCredentials: true,
      });
      setUserStorage({ ...data });
    } catch (error) {
      axiosError(error, navigate, setError, "Failed to fetch storage info");
    }
  }, [setUserStorage, navigate, setError]);

  async function handleLogout() {
    const res = await fetch(`${baseURL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) navigate("/login");
  }

  useEffect(() => {
    handleUserProfileDetails();
    handleUserStorageDetails();
  }, [handleUserProfileDetails, handleUserStorageDetails]);

  return (
    <div className="min-h-screen flex items-center justify-center font-google bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] px-4 font-medium">
      <div className="w-full max-w-xl bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
        {/* Header */}
        <div className="flex flex-row justify-between items-center sm:items-center gap-3">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <IoCloudUploadOutline className="text-3xl text-[var(--color-accentFocus)]" />
            My-Drive
          </h2>
          <span className="text-sm text-[var(--color-textSecondary)] truncate">
            {userDetails.email}
          </span>
        </div>

        {/* Avatar */}
        <div className="flex justify-center">
          {userDetails.picture !== imgDefault ? (
            <img
              src={userDetails.picture}
              alt={`${userDetails.name}'s profile picture`}
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border border-[var(--color-borderHover)]"
            />
          ) : (
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center text-6xl font-semibold bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)]">
              {userDetails.name?.[0]?.toUpperCase() || "U"}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex justify-between items-center bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] rounded-lg px-4 py-2">
          <span className="font-medium">{userDetails.name}</span>
          <span className="text-sm text-[var(--color-textSecondary)]">
            BASIC
          </span>
        </div>

        {/* Storage */}
        <div className="flex flex-col gap-2">
          <div className="w-full h-2 rounded-full bg-[var(--color-borderDefault)] overflow-hidden">
            <div
              className="h-full bg-[var(--color-accentPrimary)] transition-all"
              style={{
                width: `${
                  (userStorage.size / userStorage.maxStorageInBytes) * 100
                }%`,
              }}
            />
          </div>
          <p className="text-xs text-center text-[var(--color-textSecondary)]">
            Used{" "}
            <span className="text-[var(--color-textPrimary)]">
              {calSize(userStorage.size)}
            </span>{" "}
            of{" "}
            <span className="text-[var(--color-textPrimary)]">
              {calSize(userStorage.maxStorageInBytes)}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/directory")}
            className="cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-accentPrimary)] hover:border-[var(--color-borderActive)] transition-all"
          >
            <FaHome />
            <span className="font-semibold">HOME</span>
          </button>

          <button
            onClick={() => navigate("/purchase-premium")}
            className="cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-warning)] hover:text-black transition-all"
          >
            <BiSolidPurchaseTag />
            <span className="font-semibold">BUY PREMIUM</span>
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-info)] transition-all"
          >
            <IoLogOut />
            <span className="font-semibold">LOGOUT ALL ACCOUNTS</span>
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-error)] transition-all"
          >
            <IoLogOut />
            <span className="font-semibold">DEACTIVATE</span>
          </button>

          <button
            onClick={() => console.log("User deleted")}
            className="cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-error)] transition-all"
          >
            <TiUserDelete />
            <span className="font-semibold">DELETE ACCOUNT</span>
          </button>
        </div>
      </div>
    </div>
  );
}

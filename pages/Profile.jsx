import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { TiUserDelete } from "react-icons/ti";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import ProfilePageShimmer from "../components/ProfilePageShimmer";

export default function PageUserProfile() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { userStorage, setUserStorage } = useContext(UserStorageContext);
  const { setError } = useContext(ErrorContext);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  /* ---------- DATA ---------- */

  const handleUserProfileDetails = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axiosWithCreds.get(`/user/profile`, {
        withCredentials: true,
      });
      // console.log(data);
      setUserDetails({ ...data });
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    } finally {
      setLoading(false);
    }
  }, [setUserDetails, navigate, setError]);

  const handleUserStorageDetails = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/user/storage-details`, {
        withCredentials: true,
      });
      setUserStorage({ ...data });
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
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

  /* reset image error when picture changes */
  useEffect(() => {
    setImgError(false);
  }, [userDetails?.picture]);

  /* ---------- STYLES ---------- */

  const actionBtn =
    "cursor-pointer flex items-center gap-3 justify-between px-4 py-3 rounded-lg " +
    "bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] " +
    "transition-all duration-200 active:scale-[0.98]";

  /* ---------- UI ---------- */

  if (loading) {
    return <ProfilePageShimmer />;
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center font-google bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] px-4 font-medium">
        <div className="w-full max-w-xl bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
          {/* HEADER */}
          <div className="flex justify-between items-center gap-3">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <IoCloudUploadOutline className="text-3xl text-[var(--color-accentFocus)]" />
              My-Drive
            </h2>
            <span
              className="text-sm text-[var(--color-textSecondary)] truncate max-w-[50%]"
              title={userDetails.email}
            >
              {userDetails.email}
            </span>
          </div>

          {/* AVATAR */}
          <div className="flex justify-center">
            {userDetails?.picture && !imgError ? (
              <img
                src={userDetails.picture}
                alt={`${userDetails.name}'s profile picture`}
                onError={() => setImgError(true)}
                className="
                w-48 h-48 sm:w-56 sm:h-56
                rounded-full object-cover
                border border-[var(--color-borderHover)]
              "
              />
            ) : (
              <div
                className="
                w-48 h-48 sm:w-56 sm:h-56
                rounded-full flex items-center justify-center
                text-6xl font-semibold
                bg-[var(--color-bgElevated)]
                border border-[var(--color-borderHover)]
              "
              >
                {userDetails?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>

          {/* USER INFO */}
          <div className="flex justify-between items-center bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] rounded-lg px-4 py-2">
            <span className="font-medium capitalize">{userDetails.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-borderDefault)] text-[var(--color-textSecondary)]">
              BASIC
            </span>
          </div>

          {/* STORAGE */}
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

          {/* ACTIONS */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/directory")}
              className={`${actionBtn} hover:bg-[var(--color-accentPrimary)] hover:border-[var(--color-borderActive)]`}
            >
              <FaHome />
              <span className="font-semibold tracking-wide">HOME</span>
            </button>

            <button
              onClick={() => navigate("/purchase-premium")}
              className={`${actionBtn} hover:bg-[var(--color-warning)] hover:text-black`}
            >
              <BiSolidPurchaseTag />
              <span className="font-semibold tracking-wide">BUY PREMIUM</span>
            </button>

            <button
              onClick={handleLogout}
              className={`${actionBtn} hover:bg-[var(--color-info)]`}
            >
              <IoLogOut />
              <span className="font-semibold tracking-wide">
                LOGOUT ALL ACCOUNTS
              </span>
            </button>

            <button className={`${actionBtn} hover:bg-[var(--color-error)]`}>
              <IoLogOut />
              <span className="font-semibold tracking-wide">DEACTIVATE</span>
            </button>

            <button
              onClick={() => console.log("User deleted")}
              className={`${actionBtn} hover:bg-[var(--color-error)]`}
            >
              <TiUserDelete />
              <span className="font-semibold tracking-wide">
                DELETE ACCOUNT
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

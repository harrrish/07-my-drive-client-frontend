import React, { useContext } from "react";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { ErrorContext } from "../utils/Contexts";
import { useNavigate } from "react-router-dom";
import { MdDevices, MdLogout, MdClose } from "react-icons/md";

export default function AllLogoutConfirm({ setAllLogoutConfirm }) {
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();
  async function handleLogoutAll() {
    try {
      const { data } = await axiosWithCreds.post(`/user/logout-all`, {
        withCredentials: true,
      });
      console.log(data.message);
      navigate("/login", { replace: true });
      setAllLogoutConfirm(false);
    } catch (error) {
      axiosError(error, navigate, setError);
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 sm:px-6">
      <div className="relative w-full max-w-xl bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-6 sm:p-7 flex flex-col gap-6">
        <button
          onClick={() => setAllLogoutConfirm(false)}
          className="cursor-pointer absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-lg bg-bgElevated border border-borderHover text-textSecondary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150"
        >
          <MdClose className="text-lg" />
        </button>

        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accentSoft text-accentPrimary text-2xl">
            <MdDevices />
          </div>

          <h1 className="text-lg sm:text-xl font-semibold text-textPrimary">
            Are you sure you want to logout from all devices ?
          </h1>

          <p className="text-textSecondary text-sm sm:text-md max-w-md">
            This will immediately end all active sessions associated with your
            account across all logged in devices.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleLogoutAll}
            className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-error border border-error text-white hover:bg-errorHover hover:border-errorHover transition-colors duration-150 text-md font-semibold"
          >
            <MdLogout className="text-lg" />
            Confirm
          </button>

          <button
            onClick={() => setAllLogoutConfirm(false)}
            className="cursor-pointer w-full sm:w-auto px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-bgHover hover:border-borderActive transition-colors duration-150 text-md font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

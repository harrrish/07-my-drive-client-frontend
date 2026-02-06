import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CompGoogleBtn from "../components/GoogleBtn";
import { axiosError, axiosWithOutCreds } from "../utils/AxiosInstance";
import { MdPersonAdd } from "react-icons/md";
import { IoArrowForwardCircle, IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineMarkEmailRead, MdOutlinePassword } from "react-icons/md";
import { IoLockClosed, IoMailOutline } from "react-icons/io5";
import { FaUserCircle, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import {} from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { FaGoogle, FaRegIdCard } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

export default function PageUserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "kaskdb",
    email: "asdasd@dsf.com",
    password: "",
    otp: "",
  });

  const [showOTPRequestBtn, setShowOTPRequestBtn] = useState(true);
  const [openVerify, setOpenVerify] = useState(false);
  const [enableRegister, setEnableRegister] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const [requestLoad, setRequestLoad] = useState(false);
  const [verifyLoad, setVerifyLoad] = useState(false);
  const [registerLoad, setRegisterLoad] = useState(false);

  const [error, setError] = useState("");
  const [update, setUpdate] = useState("");
  const [timer, setTimer] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleRequestOTP() {
    setRequestLoad(true);
    try {
      const res = await axiosWithOutCreds.post("/otp/request", {
        name: formData.name,
        email: formData.email,
      });
      if (res.status === 201) {
        setShowOTPRequestBtn(false);
        setOpenVerify(true);
      }
    } catch (error) {
      axiosError(error, navigate, setError);
    } finally {
      setRequestLoad(false);
    }
  }

  async function handleVerifyOTP() {
    setVerifyLoad(true);
    try {
      const res = await axiosWithOutCreds.post("/otp/verify", {
        email: formData.email,
        otp: formData.otp,
      });
      if (res.status === 200) {
        setShowOTPRequestBtn(false);
        setOpenVerify(false);
        setOpenPassword(true);
        setEnableRegister(true);
        setUpdate("OTP verified successfully");
        setTimeout(() => setUpdate(""), 3000);
      }
    } catch (error) {
      const errorValue = error.response?.data?.error;
      if (errorValue === "OTP Expired !") {
        setShowOTPRequestBtn(true);
        setOpenVerify(false);
        axiosError(error, navigate, setError);
      } else if (errorValue === "Invalid Email or OTP !") {
        axiosError(error, navigate, setError);
      }
    } finally {
      setVerifyLoad(false);
    }
  }

  async function handleRegister() {
    setRegisterLoad(true);
    try {
      await axiosWithOutCreds.post("/user/register", formData);
      navigate("/login", { replace: true });
    } catch (error) {
      const errorValue = error.response?.data?.error;
      if (errorValue === "Session Expired to create account !") {
        setShowOTPRequestBtn(true);
        setOpenVerify(false);
        setOpenPassword(false);
        formData.password = "";
        setEnableRegister(false);
      }
      axiosError(error, navigate, setError);
    } finally {
      setRegisterLoad(false);
    }
  }

  useEffect(() => {
    if (!openVerify) return;

    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!enableRegister) {
            setShowOTPRequestBtn(true);
            setOpenVerify(false);
            setEnableRegister(false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval
    return () => clearInterval(interval);
  }, [openVerify, enableRegister]);

  return (
    <div className="min-h-screen flex items-center justify-center font-google bg-bgPrimary px-4 font-medium py-8 sm:py-12">
      <div className="w-full max-w-lg bg-bgSecondary border border-borderDefault rounded-2xl p-6 sm:p-8 flex flex-col gap-7 shadow-xl text-textPrimary">
        {/* App Title */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <IoCloudUploadOutline className="text-3xl text-accentFocus" />
            <span className="text-textPrimary">UVDS</span>
            <span className="text-textSecondary">· My-Drive</span>
          </div>
          <div className="h-px w-12 bg-linear-to-r from-transparent via-accentFocus to-transparent rounded-full"></div>
        </div>

        {/* Page Title */}
        <h2 className="flex items-center justify-center gap-3 text-xl font-semibold text-center">
          <MdPersonAdd className="text-xl text-accentFocus" />
          <span className="bg-linear-to-r from-accentFocus to-accentPrimary bg-clip-text text-transparent">
            Create Account
          </span>
          <FaUserCircle className="text-xl text-info" />
        </h2>

        <div className="flex flex-col gap-4">
          {/* Name Input */}
          <div className="relative group">
            <FaRegIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary text-base group-focus-within:text-accentFocus transition-colors z-10" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-bgElevated border border-borderHover focus:outline-none focus:border-accentFocus focus:ring-1 focus:ring-accentFocus/30 transition-colors duration-150 text-textPrimary placeholder-textDisabled text-sm"
            />
          </div>
          {/* Email Input */}
          <div className="relative group">
            <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary text-base group-focus-within:text-accentFocus transition-colors z-10" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-bgElevated border border-borderHover focus:outline-none focus:border-accentFocus focus:ring-1 focus:ring-accentFocus/30 transition-colors duration-150 text-textPrimary placeholder-textDisabled text-sm"
            />
          </div>

          {/* OTP Request Button */}
          {showOTPRequestBtn && (
            <button
              onClick={handleRequestOTP}
              className="cursor-pointer text-xs text-info hover:text-accentFocus hover:underline self-start font-medium flex items-center gap-1.5 transition-colors"
            >
              {requestLoad ? (
                <span className="flex items-center gap-1.5">
                  <span className="animate-spin rounded-full h-2.5 w-2.5 border-b-2 border-info"></span>{" "}
                  Requesting OTP...
                </span>
              ) : (
                <>
                  <MdOutlineMarkEmailRead className="text-sm" /> Request OTP
                </>
              )}
            </button>
          )}

          {/* OTP Verification */}
          {openVerify && (
            <div className="space-y-3">
              <div className="relative">
                <FaShieldAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full pl-10 pr-3 py-2.5 rounded border border-borderHover bg-bgPrimary text-textPrimary text-center font-medium"
                  maxLength="4"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handleVerifyOTP}
                  disabled={verifyLoad || formData.otp.length !== 4}
                  className="cursor-pointer px-3 py-1.5 rounded border border-success text-success text-sm hover:bg-success hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifyLoad ? "Verifying..." : "Verify OTP"}
                </button>

                <span className="text-sm text-warning">{timer}s left</span>
              </div>
            </div>
          )}

          {/* Password Input */}
          {openPassword && (
            <div className="relative group">
              <IoLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary text-base group-focus-within:text-accentFocus transition-colors z-10" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-bgElevated border border-borderHover focus:outline-none focus:border-accentFocus focus:ring-1 focus:ring-accentFocus/30 transition-colors duration-150 text-textPrimary placeholder-textDisabled text-sm"
              />
            </div>
          )}

          {/* Error Message */}
          {error.length > 0 && (
            <div className="bg-error/20 border border-error text-error text-xs text-center py-2.5 rounded-lg font-medium flex items-center justify-center gap-1.5">
              <span className="text-base">⚠</span> {error}
            </div>
          )}
          {/* Success Message */}
          {update.length > 0 && (
            <div className="bg-success/20 border border-success text-success text-xs text-center py-2.5 rounded-lg font-medium flex items-center justify-center gap-1.5">
              <span className="text-base">✓</span> {update}
            </div>
          )}

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={!enableRegister}
            className="cursor-pointer w-full py-2.5 rounded-lg font-semibold text-base bg-accentPrimary hover:bg-accentHover disabled:bg-borderHover disabled:text-textDisabled transition-colors duration-150 shadow flex items-center justify-center gap-2"
          >
            {registerLoad ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>{" "}
                Registering...
              </span>
            ) : (
              <>
                <IoCloudUploadOutline className="text-lg" /> Register Account
              </>
            )}
          </button>
        </div>

        {/* Divider & Login Link */}
        <div className="flex flex-col items-center gap-3.5">
          <div className="relative w-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-borderDefault"></div>
            </div>
            <span className="relative bg-bgSecondary px-3 text-xs text-textSecondary font-medium">
              Already have an account?
            </span>
          </div>

          <p className="font-google text-sm text-center">
            <span className="text-textSecondary">
              Sign-in into your account{" "}
            </span>
            <NavLink
              to={"/login"}
              className="hover:underline text-info hover:text-accentFocus font-semibold cursor-pointer transition-colors"
            >
              Login
              <IoArrowForwardCircle className="inline ml-0.5 text-accentFocus/70 text-lg" />
            </NavLink>
          </p>

          <span className="text-xs text-textSecondary font-medium">
            Or continue with
          </span>
          <div className="w-full">
            <CompGoogleBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

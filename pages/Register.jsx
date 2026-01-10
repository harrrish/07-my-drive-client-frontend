import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CompGoogleBtn from "../components/GoogleBtn";
import { axiosError, axiosWithOutCreds } from "../utils/AxiosInstance";
import { MdPersonAdd } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";

export default function PageUserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [requestOTP, setRequestOTP] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [enableRegister, setEnableRegister] = useState(false);

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
        setRequestOTP(true);
        setVerifyOTP(true);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
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
        setUpdate("OTP verified successfully");
        setVerifyOTP(false);
        setEnableRegister(true);
        setTimeout(() => setUpdate(""), 3000);
      }
    } catch (error) {
      const errorMsg = axios.isAxiosError(error)
        ? error.response?.data?.error
        : "Something went wrong !";
      setError(errorMsg);
      setTimeout(() => setError(""), 3000);
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
      axiosError(error, navigate, setError, "Something went wrong !");
    } finally {
      setRegisterLoad(false);
    }
  }

  useEffect(() => {
    if (!verifyOTP) return;
    setTimer(120);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setVerifyOTP(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [verifyOTP]);

  return (
    <div className="min-h-screen flex items-center justify-center font-google bg-[var(--color-bgPrimary)] px-4 font-medium">
      <div className="w-full max-w-xl bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl text-[var(--color-textPrimary)]">
        {/* App Title */}
        <h1 className="flex items-center justify-center gap-2 text-3xl font-semibold">
          <IoCloudUploadOutline className="text-4xl text-[var(--color-accentFocus)]" />
          <span>My-Drive</span>
        </h1>

        {/* Page Title */}
        <h2 className="flex items-center gap-2 text-xl justify-center text-[var(--color-textSecondary)]">
          <MdPersonAdd className="text-2xl" />
          Create Account
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full px-3 py-2 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
          />

          {!requestOTP && (
            <button
              onClick={handleRequestOTP}
              className="cursor-pointer text-sm text-[var(--color-info)] hover:underline self-start font-medium"
            >
              {requestLoad ? "Requesting OTP..." : "Request OTP"}
            </button>
          )}

          {verifyOTP && (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full px-3 py-2 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
              />
              <div className="flex justify-between text-xs text-[var(--color-textSecondary)]">
                <button
                  onClick={handleVerifyOTP}
                  className="cursor-pointer text-[var(--color-info)] hover:underline font-medium"
                >
                  {verifyLoad ? "Verifying..." : "Verify OTP"}
                </button>
                <span>Valid for {timer}s</span>
              </div>
            </div>
          )}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className="w-full px-3 py-2 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
          />

          {error.length > 0 && (
            <div className="bg-[var(--color-error)] text-white text-sm text-center py-2 rounded-md font-medium">
              {error}
            </div>
          )}

          {update.length > 0 && (
            <div className="bg-[var(--color-success)] text-black text-sm text-center py-2 rounded-md font-medium">
              {update}
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={!enableRegister}
            className="cursor-pointer w-full py-2 rounded-md font-semibold bg-[var(--color-accentPrimary)] hover:bg-[var(--color-accentHover)] disabled:bg-[var(--color-borderHover)] disabled:text-[var(--color-textDisabled)] transition-all"
          >
            {registerLoad ? "Registering..." : "Register"}
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="font-google text-lg">
            Already have an account?{" "}
            <NavLink
              to={"/login"}
              className="hover:underline hover:text-sky-600 text-sky-300"
            >
              Login
            </NavLink>
          </p>
          <span className="text-sm text-[var(--color-textSecondary)]">Or</span>
          <CompGoogleBtn />
        </div>
      </div>
    </div>
  );
}

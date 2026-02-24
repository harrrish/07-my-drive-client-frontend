import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompGoogleBtn from "../components/GoogleBtn";
import { axiosWithCreds } from "../utils/AxiosInstance";
import { UserSettingViewContext } from "../utils/Contexts";
import { IoCloudUploadOutline } from "react-icons/io5";
import { VscSignIn } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  IoMailOutline,
  IoLockClosed,
  IoArrowForwardCircle,
} from "react-icons/io5";
import { FaShieldAlt, FaRegQuestionCircle } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";

export default function PageUserLogin() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "Basic@uvds.store",
    password: "Qwerty@1234",
  });

  const { setOpenSettings } = useContext(UserSettingViewContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleLogin() {
    setLogin(true);
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setLogin(false);
      setError("Invalid Credentials");
      setTimeout(() => setError(""), 3000);
    } else {
      try {
        const { data } = await axiosWithCreds.post("/user/login", formData);
        console.log(data.message);
        setOpenSettings(false);
        navigate("/directory", { replace: true });
        setLogin(false);
      } catch (error) {
        const errorMsg = axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Something went wrong !";
        setError(errorMsg);
        setTimeout(() => setError(""), 3000);
        setLogin(false);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-google bg-bgPrimary px-4 font-medium py-8 sm:py-12">
      <div className="w-full max-w-md bg-bgSecondary border border-borderDefault rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-xl text-textPrimary">
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
        <h2 className="flex items-center justify-center gap-2 text-xl font-semibold text-center">
          <VscSignIn className="text-xl text-accentFocus" />
          <span className="bg-linear-to-r from-accentFocus to-info bg-clip-text text-transparent">
            Account Login
          </span>
          <FaShieldAlt className="text-xl text-accentFocus" />
        </h2>

        {/* FORM */}
        <div className="flex flex-col gap-4">
          {/* EMAIL */}
          <div className="flex flex-col gap-1.5 group">
            <label
              htmlFor="email"
              className="text-md font-medium text-textSecondary flex items-center gap-1.5"
            >
              <IoMailOutline className="text-md" /> Email
            </label>
            <div className="relative">
              <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary text-md group-focus-within:text-accentFocus transition-colors z-10" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="haridir150@gmail.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary focus:outline-none focus:border-accentFocus focus:ring-1 focus:ring-accentFocus/30 transition-colors duration-150 placeholder-textDisabled text-md"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1.5 group">
            <label
              htmlFor="password"
              className="text-md font-medium text-textSecondary flex items-center gap-1.5"
            >
              <IoLockClosed className="text-md" /> Password
            </label>
            <div className="relative">
              <IoLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary text-md group-focus-within:text-accentFocus transition-colors z-10" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary focus:outline-none focus:border-accentFocus focus:ring-1 focus:ring-accentFocus/30 transition-colors duration-150 placeholder-textDisabled tracking-widest text-md"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="text-md text-info hover:text-accentFocus hover:underline cursor-pointer transition-colors font-medium flex items-center gap-1"
              >
                <FaRegQuestionCircle className="text-md" /> Forgot password?
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error.length > 0 && (
            <div className="text-center text-md py-2.5 px-3 rounded-lg bg-error/20 border border-error text-error font-medium flex items-center justify-center gap-1.5">
              <span className="text-base">⚠</span> {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="button"
            onClick={handleLogin}
            className="cursor-pointer w-full py-2.5 rounded-lg font-semibold text-base bg-accentPrimary hover:bg-accentHover disabled:bg-borderHover disabled:text-textDisabled transition-colors duration-150 shadow flex items-center justify-center gap-2"
          >
            {login ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></span>{" "}
                Logging in...
              </span>
            ) : (
              <>
                <BiLogInCircle className="text-lg" /> Login
              </>
            )}
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col items-center gap-3.5 pt-2">
          <div className="relative w-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-borderDefault"></div>
            </div>
            <span className="relative bg-bgSecondary px-3 text-md text-textSecondary font-medium">
              New to UVDS?
            </span>
          </div>

          <p className="font-google text-md text-center">
            <span className="text-textSecondary">Create your account </span>
            <NavLink
              to={"/register"}
              className="hover:underline text-info hover:text-accentFocus font-semibold cursor-pointer transition-colors"
            >
              Sign up
              <IoArrowForwardCircle className="inline ml-0.5 text-accentFocus/70 text-lg" />
            </NavLink>
          </p>

          <span className="text-md text-textSecondary font-medium">
            Or continue with
          </span>
          <div className="w-fit mx-auto">
            <CompGoogleBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

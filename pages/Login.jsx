import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompGoogleBtn from "../components/GoogleBtn";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { UserSettingViewContext } from "../utils/Contexts";
import { IoCloudUploadOutline } from "react-icons/io5";
import { VscSignIn } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

export default function PageUserLogin() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "alpha@gmail.com",
    password: "1234567890",
  });

  const { setUserView } = useContext(UserSettingViewContext);

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
        console.log("login:", data.message);
        setUserView(false);
        navigate("/directory");
        setLogin(false);
      } catch (error) {
        axiosError(error, navigate, setError, "Failed to login user");
        setLogin(false);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-google bg-[var(--color-bgPrimary)] px-4">
      <div className="w-full max-w-xl bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl text-[var(--color-textPrimary)]">
        {/* App Title */}
        <h1 className="flex items-center justify-center gap-2 text-3xl font-semibold">
          <IoCloudUploadOutline className="text-4xl text-[var(--color-accentFocus)]" />
          <span>My Drive</span>
        </h1>

        {/* Page Title */}
        <h2 className="flex items-center justify-center gap-2 text-xl text-[var(--color-textSecondary)]">
          <VscSignIn className="text-2xl" />
          Login to your account
        </h2>

        {/* FORM */}
        <div className="flex flex-col gap-4">
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm text-[var(--color-textSecondary)]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="harish@example.com"
              className="
                w-full px-3 py-2 rounded-md
                bg-[var(--color-bgElevated)]
                border border-[var(--color-borderHover)]
                text-[var(--color-textPrimary)]
                focus:outline-none
                focus:border-[var(--color-borderActive)]
                focus:ring-2 focus:ring-[var(--color-accentFocus)]
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm text-[var(--color-textSecondary)]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="
                w-full px-3 py-2 rounded-md
                bg-[var(--color-bgElevated)]
                border border-[var(--color-borderHover)]
                text-[var(--color-textPrimary)]
                focus:outline-none
                focus:border-[var(--color-borderActive)]
                focus:ring-2 focus:ring-[var(--color-accentFocus)]
              "
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="text-center text-sm py-2 rounded-md bg-[var(--color-error)] text-white">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="button"
            onClick={handleLogin}
            className="
              cursor-pointer w-full py-2 rounded-md font-semibold
              bg-[var(--color-accentPrimary)]
              hover:bg-[var(--color-accentHover)]
              disabled:bg-[var(--color-borderHover)]
              transition-all duration-300
            "
          >
            {login ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="font-google text-lg">
            Do not have an account?{" "}
            <NavLink
              to={"/register"}
              className="hover:underline hover:text-sky-600 text-sky-300"
            >
              Sign up
            </NavLink>
          </p>
          <span className="text-sm text-[var(--color-textSecondary)]">Or</span>
          <CompGoogleBtn />
        </div>
      </div>
    </div>
  );
}

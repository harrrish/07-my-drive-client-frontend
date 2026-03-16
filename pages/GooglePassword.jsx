import { MdPassword, MdArrowForward } from "react-icons/md";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosWithCreds } from "../utils/AxiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdCheckCircle, MdHome } from "react-icons/md";

export default function GooglePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fromPage = location.state?.from;
  const userEmail = location.state?.email;

  // console.log(location.state);

  async function handleAddGooglePassword() {
    if (password.length < 8) {
      setError("Password too weak !");
      setTimeout(() => setError(""), 3000);
    } else {
      try {
        setLoading(true);
        // console.log(email, password);
        const { data } = await axiosWithCreds.post("/google/add-password", {
          email,
          password,
        });
        // console.log(data.message);
        if (data.message === "PASSWORD_ADDED") {
          setSuccess(true);
        }
      } catch (error) {
        const err = error.response.data.error || "Something went wrong";
        if (err === "INVALID_USER") {
          navigate("/login", { replace: true });
        }
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (!fromPage || (fromPage !== "GOOGLE" && fromPage !== "LOGIN")) {
      navigate("/login", { replace: true });
      return;
    }
    setEmail(userEmail);
  }, [navigate, fromPage, userEmail]);

  if (success) {
    return (
      <div className="min-h-screen bg-bgPrimary text-textPrimary font-google flex items-center justify-center px-4 font-medium">
        <div className="w-full max-w-xl bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-6 sm:p-7 flex flex-col items-center text-center gap-5">
          <MdCheckCircle className="text-success text-5xl" />

          <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-textPrimary">
              Password successfully set !
            </h1>
            <p className="text-textSecondary text-md">
              Your account password has been created successfully. You can now
              explore the application and access all available features.
            </p>
          </div>

          <button
            onClick={() => navigate("/directory", { replace: true })}
            className="cursor-pointer px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 font-medium flex items-center justify-center gap-2"
          >
            <MdHome />
            Go to Home
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary font-google flex items-center justify-center px-4 font-medium">
      <div className="w-full max-w-2xl bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-6 sm:p-7 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-3">
          <MdPassword className="text-accentPrimary text-4xl" />
          <h1 className="text-xl sm:text-2xl font-semibold text-textPrimary">
            Set a password for your account
          </h1>
          <p className="text-textSecondary text-md">
            Hello{" "}
            <span className="text-textPrimary font-medium">{email} !</span>
          </p>
          <p className="text-textSecondary text-md">
            You signed in using your Google credentials. You can optionally set
            a password to allow login using email and password in the future.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-textSecondary text-md">
            <MdPassword className="text-accentPrimary text-lg" />
            <span>Create a password</span>
          </div>

          <div className="relative w-full">
            <input
              type={viewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 pr-11 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary placeholder-textDisabled focus:outline-none focus:border-accentPrimary"
            />

            <button
              onClick={() => setViewPassword((prev) => !prev)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-textPrimary transition-colors duration-150 flex items-center justify-center"
            >
              {viewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && (
            <div className="text-md text-center px-4 py-2.5 rounded-lg border border-error bg-error/15 text-error font-medium">
              {error}
            </div>
          )}

          <button
            onClick={handleAddGooglePassword}
            className="cursor-pointer w-full px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-success hover:border-success hover:text-black transition-colors duration-150 font-medium flex items-center justify-center gap-2"
          >
            <MdPassword />
            {loading ? "Updating password..." : "Update Password"}
          </button>
        </div>

        <button
          onClick={() => navigate("/directory")}
          className="cursor-pointer w-full px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-warning hover:border-warning hover:text-black transition-colors duration-150 font-medium flex items-center justify-center gap-2"
        >
          <MdArrowForward />
          Skip for now
        </button>
      </div>
    </div>
  );
}

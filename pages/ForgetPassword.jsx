import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdMarkEmailRead,
  MdLockReset,
  MdPassword,
  MdLogin,
  MdSwitchAccount,
} from "react-icons/md";
import { axiosWithOutCreds } from "../utils/AxiosInstance";
import CompGoogleBtn from "../components/GoogleBtn";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpDiv, setOTPDiv] = useState(false);
  const [googleLogin, setGoogleLogin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const fromPage = location.state?.from;

  async function handlePasswordReset() {
    if (otp.length !== 4 || !otp.trim()) {
      setError("Invalid OTP !");
      setTimeout(() => setError(""), 3000);
    } else if (!password.trim() || password.length < 8) {
      setError("Password too weak !");
      setTimeout(() => setError(""), 3000);
    } else {
      try {
        setLoading(true);
        const { data } = await axiosWithOutCreds.post("/user/reset-password", {
          email,
          otp,
          password,
        });
        console.log(data);
        setSuccess(`${data.message}`);
      } catch (error) {
        const err = error.response.data.error || "Something went wrong !";
        if (err === "INVALID_REQUEST") {
          navigate("/login", { replace: true });
        } else if (err === "OTP_EXPIRED_OR_INVALID_CREDENTIALS") {
          setOTPDiv(false);
          setError("OTP Expired or Invalid Credentials !");
          setTimeout(() => setError(""), 3000);
        } else {
          setError(err);
          setTimeout(() => setError(""), 3000);
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleRequestOTP() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please provide a valid email!");
      setTimeout(() => setError(""), 3000);
      return;
    } else {
      try {
        setLoading(true);
        const { data } = await axiosWithOutCreds.post("/otp/request-password", {
          email,
        });
        setOTPDiv(true);
        console.log(data);
      } catch (error) {
        const err = error.response.data.error || "Something went wrong !";
        if (err === "NO_PASSWORD_EXIST") {
          setGoogleLogin(true);
          setError("Your account is logged through email !");
          setTimeout(() => setError(""), 3000);
        } else {
          setError(err);
          setTimeout(() => setError(""), 3000);
        }
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (fromPage !== "login") navigate("/login");
  }, [navigate, fromPage]);

  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary font-google flex items-center justify-center px-4 py-6 font-medium">
      <div className="w-full max-w-3xl bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-6 sm:p-7 flex flex-col gap-8">
        {/* HEADER */}
        {!success && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-3">
              <MdLockReset className="text-accentPrimary text-4xl" />
              <h1 className="text-xl sm:text-2xl font-semibold text-textPrimary">
                Reset your password
              </h1>
              <p className="text-textSecondary text-md">
                Hello{" "}
                <span className="text-textPrimary font-medium">
                  {email ? email : "User"}
                </span>
                , verify the OTP sent to your registered email address and set a
                new password to continue.
              </p>
              <h1 className="text-md text-center px-4 py-2.5 rounded-lg border font-medium bg-warning/15 border-warning text-warning">
                Note: After updating your password, you will be automatically
                logged out from all currently active sessions. You will need to
                sign in again using your new password.
              </h1>
            </div>

            {/* REQUEST OTP */}
            {!otpDiv && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-textSecondary text-md">
                  <MdMarkEmailRead className="text-info text-lg" />
                  <span>Enter your registered email to request an OTP</span>
                </div>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary placeholder-textDisabled focus:outline-none focus:border-accentPrimary"
                />

                <button
                  onClick={handleRequestOTP}
                  className="cursor-pointer w-full px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 font-medium flex items-center justify-center gap-2"
                >
                  <MdMarkEmailRead />
                  {loading ? "Requesting OTP..." : "Request OTP"}
                </button>
              </div>
            )}

            {/* OTP + PASSWORD SECTION */}
            {otpDiv && (
              <div className="flex flex-col gap-5">
                <h1 className="text-md text-center px-4 py-2 rounded-lg border border-warning bg-warning/15 text-warning font-medium">
                  Note: An OTP has been sent to {email} and will be valid for 2
                  minutes!
                </h1>

                {/* OTP INPUT */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-textSecondary text-md">
                    <MdMarkEmailRead className="text-info text-lg" />
                    <span>Enter the OTP received in your email</span>
                  </div>

                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary placeholder-textDisabled focus:outline-none focus:border-accentPrimary"
                  />
                </div>

                {/* PASSWORD UPDATE */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-textSecondary text-md">
                    <MdPassword className="text-accentPrimary text-lg" />
                    <span>Enter your new password</span>
                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full px-4 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary placeholder-textDisabled focus:outline-none focus:border-accentPrimary"
                  />

                  <div
                    onClick={handlePasswordReset}
                    className="flex flex-col sm:flex-row gap-3 w-full"
                  >
                    <button className="cursor-pointer w-full px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-success hover:border-success hover:text-black transition-colors duration-150 font-medium flex items-center justify-center gap-2">
                      <MdLockReset />
                      {loading
                        ? "Verifying and Updating..."
                        : "Verify OTP & Update Password"}
                    </button>

                    <button
                      onClick={() => setOTPDiv(false)}
                      className="cursor-pointer w-full px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-warning hover:border-warning hover:text-black transition-colors duration-150 font-medium flex items-center justify-center gap-2"
                    >
                      <MdSwitchAccount />
                      Try different account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* GOOGLE LOGIN RECOVERY */}
            {googleLogin && (
              <div className="flex flex-col items-center gap-5 bg-bgElevated border border-borderHover rounded-xl p-5">
                <div className="flex items-center gap-2 text-textSecondary text-md">
                  <MdSwitchAccount className="text-accentPrimary text-lg" />
                  <span>You previously signed in using Google</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                  <div className="w-fit">
                    <CompGoogleBtn />
                  </div>

                  <button className="cursor-pointer px-5 py-2.5 rounded-lg bg-bgSecondary border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 font-medium flex items-center justify-center gap-2">
                    <MdPassword />
                    Setup a Password
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {/* ERROR MESSAGE */}
          {error && (
            <div className="text-md text-center px-4 py-2.5 rounded-lg border border-error bg-error/15 text-error font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="text-md text-center px-4 py-2.5 rounded-lg border border-success bg-success/15 text-success font-medium">
              {success}
            </div>
          )}

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 font-medium"
          >
            <MdLogin />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

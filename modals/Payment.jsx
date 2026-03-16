import React, { useContext, useEffect, useState } from "react";
import { MdClose, MdTimer, MdSecurity } from "react-icons/md";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { ErrorContext, UserSettingViewContext } from "../utils/Contexts";

export default function Payment({
  name,
  setPaymentModal,
  razorpayID,
  userID,
  setLoading,
}) {
  const [timeLeft, setTimeLeft] = useState(5);
  const { setError } = useContext(ErrorContext);
  const { setOpenSettings } = useContext(UserSettingViewContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  async function upgradePlan(planID, planName, userID) {
    try {
      setLoading(true);
      setPaymentModal(null);
      const { data } = await axiosWithCreds.post(
        `/upgradePlan`,
        { planID, planName, userID },
        { withCredentials: true },
      );
      console.log(data);
      setOpenSettings(false);
      navigate("/directory", { replace: true });
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    } finally {
      setLoading(false);
    }
  }

  const progressWidth = (timeLeft / 5) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="relative w-full max-w-4xl bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-6 sm:p-7 flex flex-col items-center text-center gap-6">
        <button
          onClick={() => setPaymentModal(null)}
          className="cursor-pointer absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-lg bg-bgElevated border border-borderHover text-textSecondary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150"
        >
          <MdClose className="text-xl" />
        </button>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-textPrimary">
            {name}
          </h1>
          <p className="text-textSecondary text-md max-w-xl">
            Preparing your payment session. This step simulates the
            communication delay that normally happens between the application
            and the payment gateway.
          </p>
        </div>

        {timeLeft > 0 && (
          <div className="relative flex items-center justify-center w-28 h-28">
            <svg
              viewBox="0 0 120 120"
              className="absolute w-28 h-28 -rotate-90"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                strokeWidth="4"
                className="fill-none stroke-borderHover"
              />

              <circle
                cx="60"
                cy="60"
                r="50"
                strokeWidth="4"
                className="fill-none stroke-error transition-all duration-1000"
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={
                  (1 - progressWidth / 100) * (2 * Math.PI * 50)
                }
                strokeLinecap="round"
              />
            </svg>

            <div className="flex flex-col items-center justify-center">
              <MdTimer className="text-warning text-xl" />
              <span className="text-lg font-semibold text-textPrimary">
                {timeLeft}s
              </span>
            </div>
          </div>
        )}

        {timeLeft <= 0 && (
          <div className="flex flex-col items-center gap-5 pt-2 max-w-xl">
            <div className="flex items-start gap-3 bg-bgElevated border border-borderHover rounded-lg p-4 text-justify">
              <MdSecurity className="text-info text-xl shrink-0 mt-0.5" />
              <p className="text-textSecondary text-md">
                Note: This application is currently in{" "}
                <span className="text-warning font-semibold">BETA</span>. The
                payment flow is only a simulation —{" "}
                <span className="text-error font-semibold">
                  no real money will be deducted
                </span>
                . Click{" "}
                <span className="text-accentPrimary font-semibold">
                  Upgrade
                </span>{" "}
                to mimic a successful payment and explore the features of the
                upgraded plan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <button
                onClick={() => upgradePlan(razorpayID, name, userID)}
                className="cursor-pointer w-full sm:w-auto px-5 py-2.5 rounded-lg bg-accentPrimary border border-accentPrimary text-black hover:bg-accentHover hover:border-accentHover transition-colors duration-150 text-md font-semibold"
              >
                Upgrade to {name}
              </button>

              <button
                onClick={() => setPaymentModal(null)}
                className="cursor-pointer w-full sm:w-auto px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-bgHover hover:border-borderActive transition-colors duration-150 text-md font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { NavLink, useNavigate } from "react-router-dom";
import { MdWorkspacePremium, MdHome } from "react-icons/md";
import {
  FaStar,
  FaBolt,
  FaCrown,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowUp,
} from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import { ErrorContext } from "../utils/Contexts";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";

export default function PurchasePremium() {
  const { setError } = useContext(ErrorContext);

  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [nextPlans, setNextPlans] = useState([]);

  const navigate = useNavigate();

  const handleGetUserPlan = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axiosWithCreds.get(`/purchase-premium`, {
        withCredentials: true,
      });
      console.log(data);
      setCurrentPlan(data.currentPlan);
      setNextPlans(data.nextPlans);
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    } finally {
      setLoading(false);
    }
  }, [navigate, setError]);

  useEffect(() => {
    handleGetUserPlan();
  }, [handleGetUserPlan]);

  const getIcon = (name) => {
    if (name === "basic") return <FaStar />;
    if (name === "pro") return <FaBolt />;
    if (name === "premium") return <FaCrown />;
    return <MdWorkspacePremium />;
  };

  if (loading) {
    return (
      <div className="font-google min-h-screen bg-bgPrimary text-textPrimary flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-google font-medium min-h-screen bg-bgPrimary text-textPrimary px-4 py-8">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        {/* HEADER */}
        <div className="bg-bgSecondary border border-borderDefault rounded-xl p-6 text-center">
          <h1 className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold text-textPrimary">
            <MdWorkspacePremium className="text-warning text-3xl" />
            Plans & Pricing
          </h1>

          <p className="text-md text-textSecondary mt-2">
            Choose the plan that fits your storage and collaboration needs on{" "}
            <span className="text-textPrimary font-medium">My-Drive</span>
          </p>
        </div>

        {/* CURRENT PLAN */}
        {currentPlan && (
          <div className="relative bg-linear-to-br from-bgElevated to-bgSecondary border-2 border-accentPrimary rounded-xl p-8 shadow-elevated">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-accentPrimary text-black text-md font-bold uppercase">
                Current Plan
              </span>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accentPrimary/20 text-accentPrimary text-2xl mb-3">
                {getIcon(currentPlan.name)}
              </div>

              <h2 className="text-2xl font-bold capitalize text-textPrimary">
                {currentPlan.name}
              </h2>

              <p className="text-textSecondary text-md mt-1">
                {currentPlan.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentPlan.features.map((f, index) => (
                <div key={index} className="flex items-center gap-2 text-md">
                  {f.value ? (
                    <FaCheckCircle className="text-success shrink-0" />
                  ) : (
                    <FaTimesCircle className="text-error shrink-0" />
                  )}

                  <span
                    className={`text-md ${
                      f.value ? "text-textPrimary" : "text-textDisabled"
                    }`}
                  >
                    {f.feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEXT PLANS */}
        {nextPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nextPlans.map((plan) => (
              <div
                key={plan._id}
                className="relative bg-bgSecondary border border-borderHover hover:border-accentPrimary rounded-xl p-8 transition-colors duration-200 shadow-elevated"
              >
                <div className="absolute top-4 right-4 text-accentPrimary">
                  <FaArrowUp />
                </div>

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accentPrimary/15 text-accentPrimary text-xl mb-3">
                    {getIcon(plan.name)}
                  </div>

                  <h3 className="text-xl font-bold capitalize text-textPrimary">
                    {plan.name}
                  </h3>

                  <div className="text-accentFocus font-bold text-lg mt-1">
                    ₹{plan.price} / {plan.planType}
                  </div>

                  <p className="text-textSecondary text-md mt-2">
                    {plan.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  {plan.features.map((f, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-md"
                    >
                      {f.value ? (
                        <FaCheckCircle className="text-success shrink-0" />
                      ) : (
                        <FaTimesCircle className="text-error shrink-0" />
                      )}

                      <span
                        className={`text-md ${
                          f.value ? "text-textPrimary" : "text-textDisabled"
                        }`}
                      >
                        {f.feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="cursor-pointer w-full py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 text-md font-semibold">
                  Upgrade to {plan.name}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-bgSecondary border border-accentPrimary rounded-xl p-8 text-center">
            <FaCrown className="text-accentPrimary text-3xl mx-auto mb-3" />

            <h3 className="text-xl font-semibold text-textPrimary">
              Thank you for being a Premium user
            </h3>

            <p className="text-textSecondary text-md mt-2">
              You already have access to all available features.
            </p>
          </div>
        )}

        {/* FOOTER */}
        <div className="pt-5 border-t border-borderDefault flex justify-center">
          <NavLink
            to="/directory"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150"
          >
            <MdHome />
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

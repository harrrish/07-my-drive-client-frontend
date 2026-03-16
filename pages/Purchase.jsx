import Razorpay from "razorpay";
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
import { MdInfoOutline } from "react-icons/md";
import { MdRestartAlt } from "react-icons/md";
import Payment from "../modals/Payment.jsx";

//* Without razorpay
export default function Purchase() {
  const { setError } = useContext(ErrorContext);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [nextPlans, setNextPlans] = useState([]);
  const [purchasePageErr, setPurchasePageError] = useState(false);
  const navigate = useNavigate();

  const [paymentModal, setPaymentModal] = useState(null);

  const handleGetUserPlan = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosWithCreds.get(`/upgradePlan`, {
        withCredentials: true,
      });
      // console.log(data);
      setCurrentPlan(data.currentPlan);
      setNextPlans(data.nextPlans);

      const { data: user } = await axiosWithCreds.get(`/user/profile`, {
        withCredentials: true,
      });
      // console.log(user);
      setUser(user.name);
    } catch (error) {
      setPurchasePageError(true);
      axiosError(error, navigate, setError, "Something went wrong !");
    } finally {
      setLoading(false);
    }
  }, [navigate, setError]);

  async function handleReset() {
    try {
      setLoading(true);
      const { data } = await axiosWithCreds.post(`/downgradePlan`, {
        withCredentials: true,
      });
      console.log(data);
      navigate("/login", { replace: true });
    } catch (error) {
      setPurchasePageError(true);
      axiosError(error, navigate, setError, "Something went wrong !");
    } finally {
      setLoading(false);
    }
  }

  //* LOADING RAZORPAY SCRIPT
  // useEffect(() => {
  //   const razorpayScript = document.querySelector("#rzp-script");
  //   if (razorpayScript) return;
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   script.id = "rzp-script";
  //   document.body.appendChild(script);
  // }, []);

  useEffect(() => {
    // console.log(userDetails);
    setPurchasePageError(false);
    handleGetUserPlan();
  }, [handleGetUserPlan]);

  const getIcon = (name) => {
    if (name === "BASIC") return <FaStar />;
    if (name === "PRO") return <FaBolt />;
    if (name === "PREMIUM") return <FaCrown />;
    return <MdWorkspacePremium />;
  };

  if (loading) {
    return (
      <div class="font-go min-h-screen bg-bgPrimary px-4 py-4">
        <div className="w-full max-w-350 mx-auto flex flex-col gap-4">
          {/* BETA Skeleton */}
          <div className="bg-bgSecondary border border-borderDefault rounded-xl p-6">
            <div className="h-8 w-48 bg-bgElevated rounded mx-auto mb-4" />
            <div className="h-4 w-72 bg-bgElevated rounded mx-auto" />
          </div>

          {/* Header Skeleton */}
          <div className="bg-bgSecondary border border-borderDefault rounded-xl p-6">
            <div className="h-8 w-48 bg-bgElevated rounded mx-auto mb-4" />
            <div className="h-4 w-72 bg-bgElevated rounded mx-auto" />
          </div>

          {/* Current Plan Skeleton */}
          <div className="bg-bgSecondary border border-borderDefault rounded-xl p-8">
            <div className="h-6 w-40 bg-bgElevated rounded mx-auto mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-bgElevated rounded" />
              ))}
            </div>
          </div>

          {/* Next Plans Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-bgSecondary border border-borderDefault rounded-xl p-8 flex flex-col gap-4"
              >
                <div className="h-5 w-32 bg-bgElevated rounded mx-auto" />
                <div className="h-4 w-20 bg-bgElevated rounded mx-auto" />

                <div className="flex flex-col gap-2 mt-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-4 bg-bgElevated rounded" />
                  ))}
                </div>

                <div className="h-10 bg-bgElevated rounded mt-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (purchasePageErr) {
    return (
      <div className="font-google min-h-screen bg-bgPrimary flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-bgSecondary border border-error/40 rounded-xl p-8 text-center shadow-elevated">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-error/15 flex items-center justify-center">
            <FaTimesCircle className="text-error text-2xl" />
          </div>

          <h2 className="text-xl font-bold text-textPrimary mb-2">
            Failed to load Plans !
          </h2>

          <p className="text-textSecondary text-md mb-6">
            We couldn’t retrieve your subscription details. Please try again.
          </p>

          <button
            onClick={() => handleGetUserPlan()}
            className="cursor-pointer w-full py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-error hover:border-error hover:text-white transition-colors duration-150 font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-google font-medium min-h-screen bg-bgPrimary text-textPrimary px-4 py-4">
      <div>
        {user === "Test" && (
          <button
            onClick={() => handleReset()}
            className="fixed bottom-2 right-2 z-50 cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-highlightPrimary text-black border border-highlightSoft text-sm font-semibold shadow-elevated bg-white hover:bg-warning hover:border-warning transition-colors duration-150"
          >
            <MdRestartAlt className="text-base" />
            Reset to Basic role
          </button>
        )}
      </div>

      <div className="w-full max-w-350 mx-auto flex flex-col gap-4">
        {/* BETA TESTING NOTE */}
        <div className="w-full bg-bgSecondary border border-info rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-elevated">
          <MdInfoOutline className="text-info text-2xl sm:text-3xl shrink-0 mt-0.5" />
          <h1 className="text-md sm:text-lg text-textSecondary leading-relaxed text-justify">
            <span className="text-info font-semibold">Note:</span> This
            application is currently in{" "}
            <span className="text-warning font-semibold">"BETA" </span>testing.
            The payment flow you will see is designed to mimic a{" "}
            <span className="text-textPrimary font-semibold">real</span> payment
            setup ; however, no actual money will be deducted . You may{" "}
            <span className="text-accentPrimary font-semibold">
              proceed with the purchase
            </span>{" "}
            or{" "}
            <span className="text-accentPrimary font-semibold">
              cancel the process
            </span>{" "}
            . This setup allows you to{" "}
            <span className="text-highlightPrimary font-semibold">
              explore the features of the upgraded plan
            </span>
            . Thank you for understanding.
          </h1>
        </div>

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
                <div>
                  {paymentModal === plan.name && (
                    <Payment
                      {...plan}
                      setLoading={setLoading}
                      setPaymentModal={setPaymentModal}
                    />
                  )}
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

                <button
                  onClick={() => setPaymentModal(plan.name)}
                  className="cursor-pointer w-full py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 text-md font-semibold"
                >
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

//* With razorpay
// export default function Purchase() {
//   const { setError } = useContext(ErrorContext);

//   const [loading, setLoading] = useState(false);
//   const [currentPlan, setCurrentPlan] = useState(null);
//   const [nextPlans, setNextPlans] = useState([]);
//   const [purchasePageErr, setPurchasePageError] = useState(false);
//   const navigate = useNavigate();

//   const handleGetUserPlan = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosWithCreds.get(`/upgradePlan`, {
//         withCredentials: true,
//       });
//       // console.log(data);
//       setCurrentPlan(data.currentPlan);
//       setNextPlans(data.nextPlans);
//     } catch (error) {
//       setPurchasePageError(true);
//       axiosError(error, navigate, setError, "Something went wrong !");
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate, setError]);

//   //* RAZORPAY POP UP
//   function openRazorpayPopup(subscriptionID, userID, planName) {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       subscription_id: subscriptionID,
//       notes: { userID },
//       handler: async function () {
//         // Payment success callback
//         await verifyUpgrade(userID, planName); // Call backend to confirm
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     setLoading(true);
//     rzp.open();
//   }

//   async function upgradePlan(planID, planName, userID) {
//     const {
//       data: { subscriptionID },
//     } = await axiosWithCreds.post(
//       `/upgradePlan`,
//       { planID, planName, userID },
//       {
//         withCredentials: true,
//       },
//     );
//     // console.log(subscriptionID);
//     if (subscriptionID) {
//       openRazorpayPopup(subscriptionID, userID, planName);
//     }
//   }

//   async function verifyUpgrade(userID, planName) {
//     let attempts = 0;

//     const interval = setInterval(async () => {
//       attempts++;

//       try {
//         const { data } = await axiosWithCreds.post(
//           `/webhook/verify`,
//           { userID, planName },
//           { withCredentials: true },
//         );
//         if (data.message === "PURCHASE_VERIFIED") {
//           clearInterval(interval);
//           navigate("/directory");
//         }
//       } catch (error) {
//         axiosError(error, navigate, setError, "Something went wrong !");
//       } finally {
//         setLoading(false);
//       }

//       if (attempts > 15) {
//         clearInterval(interval);
//         console.log("Verification timeout");
//       }
//     }, 2000);
//   }

//   //* LOADING RAZORPAY SCRIPT
//   useEffect(() => {
//     const razorpayScript = document.querySelector("#rzp-script");
//     if (razorpayScript) return;
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.id = "rzp-script";
//     document.body.appendChild(script);
//   }, []);

//   useEffect(() => {
//     setPurchasePageError(false);
//     handleGetUserPlan();
//   }, [handleGetUserPlan]);

//   const getIcon = (name) => {
//     if (name === "BASIC") return <FaStar />;
//     if (name === "PRO") return <FaBolt />;
//     if (name === "PREMIUM") return <FaCrown />;
//     return <MdWorkspacePremium />;
//   };

//   if (loading) {
//     return (
//       <div className="font-google min-h-screen bg-bgPrimary px-4 py-8 animate-pulse">
//         <div className="w-full max-w-350 mx-auto flex flex-col gap-8">
//           {/* Header Skeleton */}
//           <div className="bg-bgSecondary border border-borderDefault rounded-xl p-6">
//             <div className="h-8 w-48 bg-bgElevated rounded mx-auto mb-4" />
//             <div className="h-4 w-72 bg-bgElevated rounded mx-auto" />
//           </div>

//           {/* Current Plan Skeleton */}
//           <div className="bg-bgSecondary border border-borderDefault rounded-xl p-8">
//             <div className="h-6 w-40 bg-bgElevated rounded mx-auto mb-6" />

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={i} className="h-4 bg-bgElevated rounded" />
//               ))}
//             </div>
//           </div>

//           {/* Next Plans Skeleton */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {Array.from({ length: 2 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-bgSecondary border border-borderDefault rounded-xl p-8 flex flex-col gap-4"
//               >
//                 <div className="h-5 w-32 bg-bgElevated rounded mx-auto" />
//                 <div className="h-4 w-20 bg-bgElevated rounded mx-auto" />

//                 <div className="flex flex-col gap-2 mt-4">
//                   {Array.from({ length: 5 }).map((_, j) => (
//                     <div key={j} className="h-4 bg-bgElevated rounded" />
//                   ))}
//                 </div>

//                 <div className="h-10 bg-bgElevated rounded mt-4" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (purchasePageErr) {
//     return (
//       <div className="font-google min-h-screen bg-bgPrimary flex items-center justify-center px-4">
//         <div className="w-full max-w-md bg-bgSecondary border border-error/40 rounded-xl p-8 text-center shadow-elevated">
//           <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-error/15 flex items-center justify-center">
//             <FaTimesCircle className="text-error text-2xl" />
//           </div>

//           <h2 className="text-xl font-bold text-textPrimary mb-2">
//             Failed to load Plans !
//           </h2>

//           <p className="text-textSecondary text-md mb-6">
//             We couldn’t retrieve your subscription details. Please try again.
//           </p>

//           <button
//             onClick={() => handleGetUserPlan()}
//             className="cursor-pointer w-full py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-error hover:border-error hover:text-white transition-colors duration-150 font-semibold"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="font-google font-medium min-h-screen bg-bgPrimary text-textPrimary px-4 py-8">
//       <div className="w-full max-w-350 mx-auto flex flex-col gap-8">
//         {/* HEADER */}
//         <div className="bg-bgSecondary border border-borderDefault rounded-xl p-6 text-center">
//           <h1 className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold text-textPrimary">
//             <MdWorkspacePremium className="text-warning text-3xl" />
//             Plans & Pricing
//           </h1>

//           <p className="text-md text-textSecondary mt-2">
//             Choose the plan that fits your storage and collaboration needs on{" "}
//             <span className="text-textPrimary font-medium">My-Drive</span>
//           </p>
//         </div>

//         {/* CURRENT PLAN */}
//         {currentPlan && (
//           <div className="relative bg-linear-to-br from-bgElevated to-bgSecondary border-2 border-accentPrimary rounded-xl p-8 shadow-elevated">
//             <div className="absolute -top-3 left-1/2 -translate-x-1/2">
//               <span className="px-4 py-1 rounded-full bg-accentPrimary text-black text-md font-bold uppercase">
//                 Current Plan
//               </span>
//             </div>

//             <div className="text-center mb-6">
//               <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accentPrimary/20 text-accentPrimary text-2xl mb-3">
//                 {getIcon(currentPlan.name)}
//               </div>

//               <h2 className="text-2xl font-bold capitalize text-textPrimary">
//                 {currentPlan.name}
//               </h2>

//               <p className="text-textSecondary text-md mt-1">
//                 {currentPlan.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//               {currentPlan.features.map((f, index) => (
//                 <div key={index} className="flex items-center gap-2 text-md">
//                   {f.value ? (
//                     <FaCheckCircle className="text-success shrink-0" />
//                   ) : (
//                     <FaTimesCircle className="text-error shrink-0" />
//                   )}

//                   <span
//                     className={`text-md ${
//                       f.value ? "text-textPrimary" : "text-textDisabled"
//                     }`}
//                   >
//                     {f.feature}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* NEXT PLANS */}
//         {nextPlans.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {nextPlans.map((plan) => (
//               <div
//                 key={plan._id}
//                 className="relative bg-bgSecondary border border-borderHover hover:border-accentPrimary rounded-xl p-8 transition-colors duration-200 shadow-elevated"
//               >
//                 <div className="absolute top-4 right-4 text-accentPrimary">
//                   <FaArrowUp />
//                 </div>

//                 <div className="text-center mb-6">
//                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accentPrimary/15 text-accentPrimary text-xl mb-3">
//                     {getIcon(plan.name)}
//                   </div>

//                   <h3 className="text-xl font-bold capitalize text-textPrimary">
//                     {plan.name}
//                   </h3>

//                   <div className="text-accentFocus font-bold text-lg mt-1">
//                     ₹{plan.price} / {plan.planType}
//                   </div>

//                   <p className="text-textSecondary text-md mt-2">
//                     {plan.description}
//                   </p>
//                 </div>

//                 <div className="flex flex-col gap-2 mb-6">
//                   {plan.features.map((f, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 text-md"
//                     >
//                       {f.value ? (
//                         <FaCheckCircle className="text-success shrink-0" />
//                       ) : (
//                         <FaTimesCircle className="text-error shrink-0" />
//                       )}

//                       <span
//                         className={`text-md ${
//                           f.value ? "text-textPrimary" : "text-textDisabled"
//                         }`}
//                       >
//                         {f.feature}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() =>
//                     upgradePlan(plan.razorpayID, plan.name, plan.userID)
//                   }
//                   className="cursor-pointer w-full py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 text-md font-semibold"
//                 >
//                   Upgrade to {plan.name}
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="bg-bgSecondary border border-accentPrimary rounded-xl p-8 text-center">
//             <FaCrown className="text-accentPrimary text-3xl mx-auto mb-3" />

//             <h3 className="text-xl font-semibold text-textPrimary">
//               Thank you for being a Premium user
//             </h3>

//             <p className="text-textSecondary text-md mt-2">
//               You already have access to all available features.
//             </p>
//           </div>
//         )}

//         {/* FOOTER */}
//         <div className="pt-5 border-t border-borderDefault flex justify-center">
//           <NavLink
//             to="/directory"
//             className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150"
//           >
//             <MdHome />
//             Back to Home
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { axiosWithCreds } from "../utils/AxiosInstance";
import { MdCloudSync } from "react-icons/md";

export default function CompGoogleBtn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="relative flex items-center justify-center">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-bgElevated border border-borderHover text-textPrimary font-medium">
            <MdCloudSync className="text-info animate-spin" />
            Connecting...
          </div>
        )}

        <div className={loading ? "pointer-events-none opacity-0" : ""}>
          <GoogleLogin
            type="standard"
            shape="rectangular"
            text="Continue with"
            theme="filled_blue"
            useOneTap
            onSuccess={async (credentialResponse) => {
              try {
                setLoading(true);

                const { data } = await axiosWithCreds.post("/google/auth", {
                  idToken: credentialResponse.credential,
                });

                if (data.message === "GOOGLE" && !data.password) {
                  navigate("/add-password", {
                    replace: true,
                    state: { email: data.email, from: "GOOGLE" },
                  });
                } else if (data.message === "GOOGLE") {
                  console.log(
                    "User login complete through GOOGLE credentials !",
                  );
                  navigate("/directory", { replace: true });
                }
              } catch (error) {
                const err = error.response?.data;

                if (err?.error === "LOGIN_LIMIT_EXCEEDED") {
                  sessionStorage.setItem("loginLimitAccess", "true");
                  navigate("/login-activity", { state: { email: err.email } });
                } else {
                  setError(err?.error || "Something went wrong");
                  setTimeout(() => setError(""), 3000);
                }
              } finally {
                setLoading(false);
              }
            }}
            onError={() => {
              setError("Google login failed. Please try again.");
              setTimeout(() => setError(""), 3000);
            }}
          />
        </div>
      </div>

      {error && (
        <div className="text-md text-center px-4 py-2.5 rounded-lg border border-error bg-error/15 text-error font-medium">
          {error}
        </div>
      )}
    </div>
  );
}

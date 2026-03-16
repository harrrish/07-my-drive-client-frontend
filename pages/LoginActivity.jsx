import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { MdDevices, MdLogout, MdAccessTime } from "react-icons/md";
import { MdErrorOutline, MdLogin } from "react-icons/md";
import { ErrorContext } from "../utils/Contexts";
import { MdWarningAmber } from "react-icons/md";

export default function LoginActivity() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  console.log(email);
  // console.log(location.state);

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    picture: "",
  });

  const [activityError, setActivityError] = useState("");
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, email]);

  async function handleDeleteSession(session) {
    // console.log(session);
    try {
      const { data } = await axiosWithCreds.delete(
        `/user/delete-session/${session.id}`,
      );
      console.log(data.message);
      navigate("/login");
    } catch (error) {
      axiosError(error, navigate, setError);
    }
  }

  const checkSessions = useCallback(async () => {
    setActivityError("");
    try {
      const { data } = await axiosWithCreds.post("/user/login-activity", {
        email,
      });
      // console.log(data.sessions.documents[0].value);
      setUser({
        name: data.sessions.documents[0].value.name,
        email: data.sessions.documents[0].value.email,
        role: data.sessions.documents[0].value.role,
        picture: data.sessions.documents[0].value.picture,
      });
      setSessions(data.sessions?.documents || []);
    } catch (error) {
      const e = error.response?.data?.error || "Something went wrong !";
      if (e === "USER_NOT_ALLOWED") {
        navigate("/login", { replace: true });
      } else {
        setActivityError(e);
      }
      // console.error("Failed to fetch sessions:", error);
    } finally {
      setLoading(false);
    }
  }, [email, navigate]);

  useEffect(() => {
    if (email) {
      checkSessions();
    }
  }, [checkSessions, email]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bgPrimary text-textPrimary font-google flex items-center justify-center px-4">
        <div className="bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated px-6 py-5 flex items-center gap-3 text-md sm:text-lg">
          <MdDevices className="text-accentPrimary text-2xl" />
          <h1 className="font-medium text-textPrimary">Loading sessions...</h1>
        </div>
      </div>
    );
  }

  if (activityError) {
    return (
      <div className="min-h-screen bg-bgPrimary text-textPrimary font-google flex items-center justify-center px-4">
        <div className="bg-bgSecondary border border-error rounded-xl shadow-elevated p-6 flex flex-col items-center gap-4 text-center max-w-md">
          <MdErrorOutline className="text-error text-4xl" />
          <h1 className="text-lg sm:text-xl font-semibold text-textPrimary">
            {activityError}
          </h1>
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 font-medium"
          >
            <MdLogin />
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary font-google px-4 py-6 flex flex-col items-center font-medium">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* USER HEADER */}
        <div className="bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-center gap-5">
          {/* avatar */}
          <div className="relative shrink-0">
            {user?.picture ? (
              <img
                src={user.picture}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-borderHover shadow-elevated"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-bgElevated border border-borderHover flex items-center justify-center text-accentFocus text-4xl font-bold shadow-elevated">
                {user?.name?.charAt(0)?.toUpperCase() || <IoPersonCircle />}
              </div>
            )}
          </div>

          {/* user info */}
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 justify-center sm:justify-start">
              <MdDevices className="text-accentPrimary text-2xl" />
              User "{user.name}" active Login Sessions
            </h1>
            <p className="text-textSecondary text-md">
              User email:{" "}
              <span className="text-textPrimary font-medium">{user.email}</span>
            </p>
            <p className="text-textSecondary text-md">
              User Plan:{" "}
              <span className="text-warning font-medium">{user.role}</span>
            </p>
          </div>
        </div>

        {/* LOGIN LIMIT NOTICE */}
        <div className="bg-bgSecondary border border-warning rounded-xl shadow-elevated p-4 sm:p-4 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <MdWarningAmber className="text-warning text-2xl shrink-0 mt-0.5" />
            <div className="flex flex-col gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-textPrimary">
                Login limit exceeded
              </h2>

              <p className="text-textSecondary text-md leading-relaxed">
                Your account allows only a limited number of active login
                sessions at the same time. We detected that this limit has
                already been reached, so this login attempt was paused.
              </p>

              <p className="text-textSecondary text-md leading-relaxed">
                To continue using your account on this device, you can log out
                from one of the existing sessions listed below. Once a session
                is removed, you can return to the login page and sign in again.
              </p>

              <p className="text-textSecondary text-md leading-relaxed">
                If you prefer not to close any active sessions, you can safely
                return to the login page without making any changes.
              </p>

              <div className="pt-2 mx-auto">
                <button
                  onClick={() => navigate("/login", { replace: true })}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-accentPrimary hover:border-accentPrimary hover:text-black transition-colors duration-150 font-medium"
                >
                  <MdLogin />
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SESSION LIST */}
        <div>
          {sessions?.length === 0 ? (
            <div className="bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-6 text-center text-textSecondary">
              No active sessions found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sessions.map((s) => (
                <div
                  key={s.id || s._id}
                  className="bg-bgSecondary border border-borderHover rounded-xl shadow-elevated p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-textPrimary flex items-center gap-2">
                      <MdDevices className="text-accentPrimary" />
                      Device Session
                    </h2>
                  </div>

                  <div className="flex flex-col gap-1 text-md text-textSecondary">
                    <p>
                      <span className="text-textPrimary font-medium">
                        Browser:
                      </span>{" "}
                      {s.value.sessionMeta?.browser}
                    </p>
                    <p>
                      <span className="text-textPrimary font-medium">OS:</span>{" "}
                      {s.value.sessionMeta?.os}
                    </p>
                    <p>
                      <span className="text-textPrimary font-medium">
                        Device:
                      </span>{" "}
                      {s.value.sessionMeta?.device}
                    </p>
                    <p>
                      <span className="text-textPrimary font-medium">IP:</span>{" "}
                      {s.value.sessionMeta?.ip}
                    </p>
                    <p className="flex items-center gap-1">
                      <MdAccessTime className="text-info" />
                      <span className="text-textPrimary font-medium">
                        Login Time:
                      </span>{" "}
                      {new Date(
                        s.value.sessionMeta?.loginTime,
                      ).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteSession(s)}
                    className="cursor-pointer mt-2 w-full py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary hover:bg-error hover:border-error hover:text-black transition-colors duration-150 flex items-center justify-center gap-2 font-medium"
                  >
                    <MdLogout />
                    Logout Session
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

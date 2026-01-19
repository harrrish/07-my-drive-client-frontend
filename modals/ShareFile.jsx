import React, { useContext, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { FaUserPlus } from "react-icons/fa";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function ShareFile({
  setShare,
  sharedLink,
  name,
  _id,
  handleDirectoryDetails,
  parentFID,
}) {
  const { setUpdate } = useContext(UpdateContext);
  const { setError } = useContext(ErrorContext);
  const [user, setUser] = useState("");
  const [userError, setUserError] = useState("");

  const navigate = useNavigate();

  function handleCopyShareLink() {
    navigator.clipboard.writeText(sharedLink);
    setUpdate((prev) => [...prev, "Link copied to Clipboard !"]);
    setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
    setShare(false);
  }

  async function handleShareAccess() {
    if (!user) {
      setUserError("Please provide a valid email ID !");
      setTimeout(() => setUserError(""), 3000);
      return;
    } else {
      try {
        const { data, status } = await axiosWithCreds.post(
          `/share/file/access/add`,
          {
            email: user,
            _id,
          },
        );
        if (status === 200) {
          handleDirectoryDetails(parentFID);
          setShare(false);
          console.log(data.message);
          setUpdate((prev) => [...prev, data.message]);
          setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
        }
      } catch (error) {
        if (error.response.data.error === "Email ID could not be found !") {
          setUser("");
          setUserError("Your friend's email ID could not be found !");
          setTimeout(() => setUserError(""), 3000);
        } else if (error.response.data.error === "Self share !") {
          setUser("");
          setUserError("Can't share file to self !");
          setTimeout(() => setUserError(""), 3000);
        } else if (error.response.data.error === "Access present !") {
          setUser("");
          setUserError(`User "${user}" already has access to this file !`);
          setTimeout(() => setUserError(""), 3000);
        } else {
          axiosError(error, navigate, setError, "Something went wrong !");
        }
      }
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/80 backdrop-blur-sm
        px-3
      "
    >
      <div
        className="
          w-full max-w-2xl
          rounded-xl
          bg-[var(--color-bgSecondary)]
          border border-[var(--color-borderDefault)]
          shadow-2xl
          p-5 sm:p-6
          flex flex-col gap-6
          text-[var(--color-textPrimary)]
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-[var(--color-borderHover)] pb-3">
          <div className="min-w-0">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <IoCloudUploadOutline className="text-xl text-[var(--color-accentFocus)] shrink-0" />
              Share
            </h2>
            <p
              className="text-sm text-[var(--color-textSecondary)] truncate"
              title={name}
            >
              {name}
            </p>
          </div>

          <button
            onClick={() => setShare(false)}
            className="
              cursor-pointer
              p-1 rounded-md
              hover:bg-[var(--color-bgElevated)]
              transition
            "
          >
            <IoIosClose className="text-2xl" />
          </button>
        </div>

        {/* ===== SHARE LINK ===== */}
        <section className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <FaLink className="text-[var(--color-info)]" />
            Share link
          </h3>

          <p className="text-sm text-[var(--color-textSecondary)]">
            Anyone with the link can view this file.
          </p>

          <p className="text-xs text-[var(--color-textDisabled)]">
            Note: The shared link expires automatically after 60 minutes.
          </p>

          <div
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-md
              bg-[var(--color-bgPrimary)]
              border border-[var(--color-borderHover)]
              text-[var(--color-textSecondary)]
              truncate
            "
          >
            <FaLink className="text-[var(--color-info)] shrink-0" />
            <span className="truncate">{sharedLink}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <a
              href={sharedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                cursor-pointer
                flex items-center justify-center gap-2
                px-4 py-2
                rounded-md
                bg-[var(--color-bgElevated)]
                border border-[var(--color-borderHover)]
                hover:bg-[var(--color-borderHover)]
                transition
                text-sm font-medium
              "
            >
              <MdOpenInNew className="text-lg text-[var(--color-info)]" />
              Open file
            </a>

            <button
              onClick={handleCopyShareLink}
              className="
                cursor-pointer
                flex items-center justify-center gap-2
                px-4 py-2
                rounded-md
                bg-[var(--color-accentPrimary)]
                hover:bg-[var(--color-accentHover)]
                transition
                text-sm font-medium
                text-black
              "
            >
              <FaLink />
              Copy link
            </button>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="h-px bg-[var(--color-borderHover)]" />

        {/* ===== SHARE ACCESS ===== */}
        <section className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <FaUserPlus className="text-[var(--color-accentFocus)]" />
            Share with people
          </h3>

          <p className="text-sm text-[var(--color-textSecondary)]">
            Share this file with a specific user using their email address.
            Shared users can only view this file.
          </p>

          <p className="text-xs text-[var(--color-textDisabled)]">
            Note: You can revoke access anytime. The receiver can also remove
            themselves.
          </p>

          <div className="flex flex-col gap-1">
            {/* INPUT ROW */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--color-bgPrimary)] border border-[var(--color-borderHover)] focus-within:border-[var(--color-borderActive)] transition">
              <FaUserPlus className="text-[var(--color-textDisabled)] shrink-0" />

              <input
                type="email"
                placeholder="Enter email address"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-[var(--color-textPrimary)] placeholder:text-[var(--color-textDisabled)]"
              />
            </div>

            {/* ERROR MESSAGE */}
            {userError && (
              <p className="text-xs text-[var(--color-error)] pl-1 font-bold">
                {userError}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleShareAccess}
              disabled={!user}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition ${
                !user
                  ? `cursor-not-allowed bg-[var(--color-borderDefault)] text-[var(--color-textDisabled)] opacity-60 `
                  : `cursor-pointer bg-[var(--color-accentPrimary)] text-black hover:bg-[var(--color-accentHover)] active:scale-[0.98]`
              }`}
            >
              Share access
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

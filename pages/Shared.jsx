import { NavLink, useNavigate } from "react-router-dom";
import {
  MdShare,
  MdHome,
  MdUpload,
  MdDownload,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useCallback, useContext, useEffect, useState } from "react";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { ErrorContext, UpdateContext } from "../utils/Contexts";

export default function Shared() {
  const navigate = useNavigate();
  const [filesByUser, setFilesSharedByUser] = useState([]);
  const [filesCountByUser, setFilesCountByUser] = useState(0);
  const { setError } = useContext(ErrorContext);
  const { setUpdate } = useContext(UpdateContext);
  const [loadingByUser, setLoadingByUser] = useState(false);

  const fetchSharedByUserItems = useCallback(async () => {
    try {
      setLoadingByUser(true);
      const { data } = await axiosWithCreds.get(`/share/file/by-user`);
      setFilesSharedByUser(data.files || []);
      setFilesCountByUser(data.filesCount || 0);
      console.log(data.files);
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong!");
    } finally {
      setLoadingByUser(false);
    }
  }, [navigate, setError]);

  useEffect(() => {
    fetchSharedByUserItems();
  }, [fetchSharedByUserItems]);

  return (
    <div className="font-google min-h-screen bg-[var(--color-bgPrimary)] px-4 py-6 font-medium">
      <div
        className="
          w-full max-w-6xl mx-auto
          bg-[var(--color-bgSecondary)]
          text-[var(--color-textPrimary)]
          flex flex-col gap-8
          p-6 sm:p-8
          rounded-xl
          border border-[var(--color-borderDefault)]
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="flex items-center gap-3 text-3xl sm:text-4xl font-semibold tracking-wide">
            <MdShare className="text-[var(--color-info)] text-3xl sm:text-4xl" />
            <span>
              Shared{" "}
              <span className="text-[var(--color-textSecondary)]">Files</span>
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-textSecondary)] max-w-2xl">
            Files you’ve shared with others and files others have shared with
            you, organized for easy access.
          </p>
        </div>

        {/* SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SHARED BY ME */}
          {loadingByUser ? (
            <div className="py-8 text-center text-sm text-[var(--color-textSecondary)]">
              Loading shared files…
            </div>
          ) : (
            <section className="flex flex-col rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] overflow-hidden">
              {/* HEADER */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-borderDefault)]">
                <div className="flex items-center gap-2">
                  <MdUpload className="text-[var(--color-accentPrimary)] text-lg" />
                  <h2 className="text-base font-semibold">Shared by me</h2>
                </div>
                <span className="text-xs text-[var(--color-textSecondary)]">
                  {filesCountByUser}
                </span>
              </div>

              {/* SUBTEXT */}
              <p className="px-4 py-2 text-xs text-[var(--color-textSecondary)]">
                Files you’ve shared with other people
              </p>

              {/* LIST */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {filesCountByUser > 0 ? (
                  <ul className="flex flex-col divide-y divide-[var(--color-borderDefault)]">
                    {filesByUser.map(({ _id, name, sharedWith }) => (
                      <li
                        key={_id}
                        className="group px-4 py-3 hover:bg-[var(--color-bgPrimary)] transition flex items-center gap-4"
                      >
                        {/* FILE INFO (PRIMARY ACTION) */}
                        <button
                          onClick={() => console.log(_id)}
                          className="min-w-0 flex-1 text-left rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)] focus:ring-offset-2 focus:ring-offset-[var(--color-bgElevated)] cursor-pointer"
                        >
                          <p
                            className="text-sm font-medium truncate text-[var(--color-textPrimary)] leading-snug group-hover:underline"
                            title={name}
                          >
                            {name}
                          </p>
                          <p className="mt-0.5 text-xs text-[var(--color-textSecondary)]">
                            Shared with{" "}
                            <span className="font-medium text-[var(--color-textPrimary)]">
                              {sharedWith.length}
                            </span>
                          </p>
                        </button>

                        {/* ACTION ZONE */}
                        <div className="flex items-center pl-3 border-l border-[var(--color-borderDefault)]">
                          <button
                            title="Revoke access"
                            onClick={() =>
                              console.log(`Revoke access for file ID:${_id}`)
                            }
                            className="cursor-pointer opacity-30 group-hover:opacity-100 transition-opacity text-[var(--color-textDisabled)] hover:text-[var(--color-error)] p-1.5 rounded-md hover:bg-[var(--color-bgElevated)] focus:outline-none focus:ring-2 focus:ring-[var(--color-error)] focus:ring-offset-2 focus:ring-offset-[var(--color-bgElevated)]"
                          >
                            <MdRemoveCircleOutline className="text-lg" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-[var(--color-textDisabled)] italic text-center py-10">
                    No files shared by you yet
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SHARED WITH ME */}
          <section
            className="
              flex flex-col
              rounded-lg
              bg-[var(--color-bgElevated)]
              border border-[var(--color-borderHover)]
              overflow-hidden
            "
          >
            {/* Section Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-borderDefault)]">
              <MdDownload className="text-[var(--color-info)] text-xl" />
              <h2 className="text-lg font-semibold">Shared with me</h2>
            </div>

            {/* Section Description */}
            <p className="px-4 py-2 text-sm text-[var(--color-textSecondary)]">
              Files and folders others have shared with you.
            </p>

            {/* FILE LIST AREA */}
            <div
              className="
                flex-1
                px-3 pb-3
                overflow-y-auto
                overscroll-contain
              "
            >
              {/* Replace this with your file components */}
              <div className="flex flex-col gap-2">
                {/* Example placeholder */}
                <div className="text-sm text-[var(--color-textDisabled)] italic text-center py-6">
                  No files shared with you yet
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER ACTION */}
        <div className="flex justify-center pt-2">
          <NavLink
            to="/directory"
            className="
              inline-flex items-center gap-2
              px-6 py-2 rounded-lg
              bg-[var(--color-bgSecondary)]
              text-[var(--color-textPrimary)]
              border border-[var(--color-borderHover)]
              hover:bg-[var(--color-accentPrimary)]
              hover:border-[var(--color-borderActive)]
              transition-all duration-300
              focus:outline-none
              focus:ring-2 focus:ring-[var(--color-accentFocus)]
            "
          >
            <MdHome className="text-lg" />
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

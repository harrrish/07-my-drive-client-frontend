import React from "react";
import { useNavigate } from "react-router-dom";
import { MdFolderOff, MdDelete, MdHome } from "react-icons/md";

export default function FolderNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bgPrimary px-4 font-google text-textPrimary">
      <div className="w-full max-w-2xl bg-bgSecondary border border-borderDefault rounded-xl shadow-elevated p-6 sm:p-8 flex flex-col gap-6 font-medium">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-error/10 text-error text-4xl">
            <MdFolderOff />
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-textPrimary">
            Folder Not Found
          </h1>

          <p className="text-md sm:text-base text-textSecondary max-w-lg">
            The folder you are trying to access either does not exist or you do
            not have permission to view it.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-borderDefault"></div>

        {/* OPTIONS */}
        <div className="flex flex-col gap-4 text-md sm:text-base">
          {/* TRASH OPTION */}
          <div className="flex flex-col gap-4 bg-bgElevated border border-borderHover rounded-lg p-4">
            <div className="flex flex-col gap-1 text-left">
              <h2 className="font-medium text-textPrimary">
                Folder may be in Trash !
              </h2>
              <p className="text-textSecondary text-md">
                The folder might have been moved to Trash and could still be
                restored.
              </p>
            </div>

            <button
              onClick={() => navigate("/trashed", { replace: true })}
              className="cursor-pointer inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-bgSecondary border border-borderHover text-warning hover:bg-bgHover hover:border-warning transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-accentFocus"
            >
              <MdDelete className="text-lg" />
              Visit Trash
            </button>
          </div>

          {/* HOME OPTION */}
          <div className="flex flex-col gap-4 bg-bgElevated border border-borderHover rounded-lg p-4">
            <div className="flex flex-col gap-1 text-left">
              <h2 className="font-medium text-textPrimary">
                Folder permanently deleted or access revoked !
              </h2>
              <p className="text-textSecondary text-md">
                If the folder was permanently deleted or your access was
                removed, you can safely return to Home.
              </p>
            </div>

            <button
              onClick={() => navigate("/directory", { replace: true })}
              className="cursor-pointer inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-md bg-accentPrimary text-black hover:bg-accentHover transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-accentFocus"
            >
              <MdHome className="text-lg" />
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

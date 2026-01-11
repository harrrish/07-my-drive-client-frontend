import React from "react";

export default function CantRestoreFile({ setCantRestoreFile }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 font-google">
      {/* MODAL CARD */}
      <div className="w-full max-w-lg rounded-xl bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] shadow-2xl p-6 flex flex-col gap-4">
        {/* TITLE */}
        <h1 className="text-lg font-semibold text-[var(--color-error)]">
          Action Not Allowed !
        </h1>

        {/* MESSAGE */}
        <div className="flex flex-col gap-2 text-sm text-[var(--color-textSecondary)] leading-relaxed">
          <p>
            Unable to restore this folder from Trash because its{" "}
            <span className="text-[var(--color-textPrimary)] font-medium">
              parent folder no longer exists
            </span>
            .
          </p>

          <p className="text-[var(--color-textDisabled)]">
            You can either restore the parent folder first, or move this file
            directly to the root folder your of{" "}
            <span className="text-[var(--color-textPrimary)] font-medium">
              My-Drive
            </span>{" "}
            account.
          </p>

          <p className="text-sm font-medium text-[var(--color-warning)] mt-1">
            Note: Moving this file to the root is a permanent action and cannot
            be undone.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[var(--color-borderDefault)]">
          {/* MOVE TO ROOT */}
          <button className="w-full px-5 py-2 rounded-md bg-[var(--color-warning)] text-black font-medium hover:opacity-90 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]">
            Move to Root
          </button>

          {/* OK / DISMISS */}
          <button
            onClick={() => setCantRestoreFile(false)}
            className="
              w-full
              px-5 py-2
              rounded-md
              bg-[var(--color-bgElevated)]
              border border-[var(--color-borderHover)]
              text-[var(--color-textPrimary)]
              hover:bg-[var(--color-accentPrimary)]
              hover:border-[var(--color-borderActive)]
              transition-all duration-200
              cursor-pointer
              focus:outline-none
              focus:ring-2 focus:ring-[var(--color-accentFocus)]
            "
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function TrashPageFileParentNotFound({ setCantRestoreFile }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 font-google">
      {/* MODAL CARD */}
      <div
        className="
          w-full max-w-md
          rounded-xl
          bg-[var(--color-bgSecondary)]
          border border-[var(--color-borderDefault)]
          shadow-2xl
          p-6
          flex flex-col gap-4
        "
      >
        {/* TITLE */}
        <h1 className="text-lg font-semibold text-[var(--color-error)]">
          Action Not Allowed !
        </h1>

        {/* MESSAGE */}
        <div className="flex flex-col gap-2 text-sm text-[var(--color-textSecondary)] leading-relaxed">
          <p>
            Unable to remove this file from Trash because its{" "}
            <span className="text-[var(--color-textPrimary)] font-medium">
              parent folder no longer exists !
            </span>
          </p>

          <p className="text-[var(--color-textDisabled)]">
            Please restore its parent folder first, Thank you !
          </p>
        </div>

        {/* ACTION */}
        <div className="flex justify-end pt-3 border-t border-[var(--color-borderDefault)]">
          <button
            onClick={() => setCantRestoreFile(false)}
            className="
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

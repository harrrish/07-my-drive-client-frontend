import React from "react";

export default function ProfilePageShimmer() {
  const shimmer = "animate-pulse bg-[var(--color-borderDefault)] rounded-md";

  return (
    <div className="min-h-screen flex items-center justify-center font-google bg-[var(--color-bgPrimary)] px-4">
      <div className="w-full max-w-xl bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
        {/* HEADER */}
        <div className="flex justify-between items-center gap-3">
          <div className={`h-7 w-36 ${shimmer}`} />
          <div className={`h-4 w-32 ${shimmer}`} />
        </div>

        {/* AVATAR */}
        <div className="flex justify-center">
          <div
            className={`
              w-48 h-48 sm:w-56 sm:h-56
              rounded-full
              ${shimmer}
            `}
          />
        </div>

        {/* USER INFO */}
        <div className="flex justify-between items-center rounded-lg px-4 py-2 bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)]">
          <div className={`h-4 w-28 ${shimmer}`} />
          <div className={`h-4 w-12 ${shimmer}`} />
        </div>

        {/* STORAGE */}
        <div className="flex flex-col gap-2">
          <div className="w-full h-2 rounded-full bg-[var(--color-borderDefault)] overflow-hidden">
            <div className="h-full w-1/3 bg-[var(--color-borderHover)] animate-pulse" />
          </div>
          <div className={`h-3 w-40 mx-auto ${shimmer}`} />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`
                h-12
                rounded-lg
                bg-[var(--color-bgElevated)]
                border border-[var(--color-borderHover)]
                flex items-center px-4
              `}
            >
              <div className={`h-5 w-5 ${shimmer}`} />
              <div className={`h-4 w-32 ml-auto ${shimmer}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

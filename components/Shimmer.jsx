import React from "react";

export default function Shimmer() {
  return (
    <div className="w-full sm:max-w-3xl md:max-w-4xl mx-auto min-h-[50vh] flex flex-col gap-3 animate-pulse">
      {/* Header shimmer */}
      <div className="h-6 w-1/3 rounded-md bg-[var(--color-bgElevated)]" />

      {/* List shimmer items */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3 rounded-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)]"
        >
          {/* Left section */}
          <div className="flex items-center gap-3 w-[70%]">
            <div className="h-4 w-4 rounded bg-[var(--color-bgElevated)]" />
            <div className="h-4 w-2/3 rounded bg-[var(--color-bgElevated)]" />
          </div>

          {/* Right icons */}
          <div className="flex gap-3">
            <div className="h-4 w-4 rounded bg-[var(--color-bgElevated)]" />
            <div className="h-4 w-4 rounded bg-[var(--color-bgElevated)]" />
            <div className="h-4 w-4 rounded bg-[var(--color-bgElevated)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

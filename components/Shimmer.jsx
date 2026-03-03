import React from "react";

export default function Shimmer() {
  return (
    <div className="w-full sm:max-w-7xl mx-auto min-h-[50vh] flex flex-col gap-3 animate-pulse">
      {/* Header shimmer */}
      <div className="h-6 w-1/3 rounded-md bg-bgElevated" />

      {/* List shimmer items */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3 rounded-md bg-bgSecondary border border-borderDefault"
        >
          {/* Left section */}
          <div className="flex items-center gap-3 w-[70%]">
            <div className="h-4 w-4 rounded bg-bgElevated" />
            <div className="h-4 w-2/3 rounded bg-bgElevated" />
          </div>

          {/* Right icons */}
          <div className="flex gap-3">
            <div className="h-4 w-4 rounded bg-bgElevated" />
            <div className="h-4 w-4 rounded bg-bgElevated" />
            <div className="h-4 w-4 rounded bg-bgElevated" />
          </div>
        </div>
      ))}
    </div>
  );
}

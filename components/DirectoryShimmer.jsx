import React from "react";

export default function DrivePageShimmer() {
  return (
    <div className="min-h-screen bg-bgPrimary font-google">
      <div className="flex flex-col gap-3 p-3 sm:p-4">
        {/* NAVBAR */}
        <div className="w-[95%] sm:max-w-7xl mx-auto p-3 rounded-md bg-bgSecondary border border-borderDefault flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-bgElevated rounded" />
            <div className="h-5 w-24 bg-bgElevated rounded" />
          </div>
          <div className="h-6 w-6 bg-bgElevated rounded" />
        </div>

        {/* PATH */}
        <div className="w-[95%] sm:max-w-7xl mx-auto px-3 h-10 flex items-center rounded-md bg-bgSecondary border border-borderDefault">
          <div className="h-4 w-40 bg-bgElevated rounded" />
        </div>

        {/* ACTION BAR */}
        <div className="w-[95%] sm:max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="flex-1 h-10 bg-bgSecondary border border-borderHover rounded-md" />
          <div className="flex-1 h-10 bg-bgSecondary border border-borderHover rounded-md" />
        </div>

        {/* SEARCH + SORT */}
        <div className="w-[95%] sm:max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
          <div className="flex-1 h-10 bg-bgSecondary border border-borderHover rounded-md" />
          <div className="flex-1 h-10 bg-bgSecondary border border-borderHover rounded-md" />
        </div>

        {/* GROUP BAR */}
        <div className="w-[95%] sm:max-w-7xl mx-auto h-12 rounded-md bg-bgSecondary border border-borderDefault flex items-center justify-between px-4">
          <div className="flex gap-4">
            <div className="h-5 w-5 bg-bgElevated rounded" />
            <div className="h-5 w-5 bg-bgElevated rounded" />
          </div>
          <div className="flex gap-4">
            <div className="h-4 w-10 bg-bgElevated rounded" />
            <div className="h-4 w-10 bg-bgElevated rounded" />
          </div>
        </div>

        {/* LIST ITEMS */}
        <div className="w-[95%] sm:max-w-7xl mx-auto flex flex-col gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-borderDefault bg-bgSecondary"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3 flex-1">
                <div className="h-4 w-4 bg-bgElevated rounded" />
                <div className="h-4 w-4 bg-bgElevated rounded" />
                <div className="h-5 w-5 bg-bgElevated rounded" />
                <div className="h-4 w-40 bg-bgElevated rounded" />
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-bgElevated rounded" />
                <div className="h-4 w-4 bg-bgElevated rounded" />
                <div className="h-4 w-4 bg-bgElevated rounded" />
                <div className="h-4 w-4 bg-bgElevated rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

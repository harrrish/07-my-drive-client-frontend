import React from "react";

export default function DirectoryShimmer() {
  return (
    <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto flex flex-col gap-2">
      {[1, 2, 3, 4, 5].map((e, index) => (
        <div
          key={index}
          className="group flex items-center justify-between px-3 py-2.5 rounded-lg border border-borderDefault bg-bgSecondary animate-loading"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="scale-110 w-4 h-4 rounded bg-borderHover"></div>
            <div className="w-4 h-4 rounded bg-borderHover"></div>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-6 h-6 rounded bg-borderHover"></div>
              <div className="w-32 h-4 rounded bg-borderHover"></div>
            </div>
          </div>
          <div className="flex items-center gap-3 opacity-40">
            <div className="w-4 h-4 rounded bg-borderHover"></div>
            <div className="w-4 h-4 rounded bg-borderHover"></div>
            <div className="w-4 h-4 rounded bg-borderHover"></div>
            <div className="w-4 h-4 rounded bg-borderHover"></div>
            <div className="w-4 h-4 rounded bg-borderHover"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

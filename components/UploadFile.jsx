import { calSize } from "../utils/CalculateFileSize";
import { MdCancel } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function UploadFile({ id, name, size, progress }) {
  return (
    <div
      key={id}
      className="w-[95%] max-w-4xl mx-auto flex flex-col gap-3 p-4 rounded-lg bg-bgSecondary border border-borderDefaultshadow-md"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 w-[60%]">
          <FaCloudUploadAlt className="text-xl text-accentFocus shrink-0" />
          <h1 className="truncate text-sm font-medium text-textPrimary">
            {name}
          </h1>
        </div>

        <div className="flex items-center gap-4 text-sm text-textSecondary">
          <span>{calSize(size)}</span>
          <span>{progress}%</span>
          <button
            className="cursor-pointer text-lg text-textSecondary hover:text-error transition-colors"
            title="Cancel upload"
          >
            <MdCancel />
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-2 rounded-full bg-borderDefault overflow-hidden">
        <div
          className="
            h-full
            bg-(--color-accentPrimary)
            transition-all duration-300
          "
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

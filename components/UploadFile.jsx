import { calSize } from "../utils/CalculateFileSize";
import { MdCancel } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function UploadFile({ id, name, size, progress }) {
  return (
    <div
      key={id}
      className="w-[95%] max-w-4xl mx-auto flex flex-col gap-3 p-4 rounded-lg bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)]shadow-md"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 w-[60%]">
          <FaCloudUploadAlt className="text-xl text-[var(--color-accentFocus)] flex-shrink-0" />
          <h1 className="truncate text-sm font-medium text-[var(--color-textPrimary)]">
            {name}
          </h1>
        </div>

        <div className="flex items-center gap-4 text-sm text-[var(--color-textSecondary)]">
          <span>{calSize(size)}</span>
          <span>{progress}%</span>
          <button
            className="cursor-pointer text-lg text-[var(--color-textSecondary)] hover:text-[var(--color-error)] transition-colors"
            title="Cancel upload"
          >
            <MdCancel />
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-2 rounded-full bg-[var(--color-borderDefault)] overflow-hidden">
        <div
          className="
            h-full
            bg-[var(--color-accentPrimary)]
            transition-all duration-300
          "
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

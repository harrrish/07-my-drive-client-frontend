import { IoCloseCircle } from "react-icons/io5";
import { calSize } from "../utils/CalculateFileSize";
import { calDateNTime } from "../utils/CalculateDateTime";
import { IoMdArrowDropright } from "react-icons/io";
import { useContext } from "react";
import { DirectoryContext } from "../utils/Contexts";
import { RiFileInfoFill } from "react-icons/ri";

export default function ModalFileDetails({
  name,
  size,
  extension,
  createdAt,
  updatedAt,
  setFileDetails,
}) {
  const { directoryDetails } = useContext(DirectoryContext);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div
        className="
          w-full max-w-2xl
          rounded-xl
          bg-[var(--color-bgSecondary)]
          border border-[var(--color-borderDefault)]
          shadow-2xl
          font-google
          text-[var(--color-textPrimary)]
        "
      >
        {/* HEADER */}
        <div
          className="
            flex items-center justify-between
            px-4 py-3
            border-b border-[var(--color-borderDefault)]
            bg-[var(--color-bgElevated)]
            rounded-t-xl
          "
        >
          <h1 className="flex items-center gap-2 text-lg font-semibold">
            <RiFileInfoFill className="text-[var(--color-accentFocus)] text-xl" />
            File Details
          </h1>
          <button
            onClick={() => setFileDetails(false)}
            className="
              cursor-pointer text-xl
              text-[var(--color-textSecondary)]
              hover:text-[var(--color-error)]
              transition-colors
            "
          >
            <IoCloseCircle />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-3 text-sm sm:text-base">
          <div className="flex gap-2">
            <span className="text-[var(--color-textSecondary)]">Name:</span>
            <span title={name} className="italic break-all truncate">
              {name}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-[var(--color-textSecondary)]">Size:</span>
            <span className="italic">{calSize(size)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-[var(--color-textSecondary)]">Type:</span>
            <span className="uppercase font-medium">
              {extension.substring(1)}
            </span>
          </div>

          {/* PATH */}
          <div className="flex gap-2 items-start">
            <span className="text-[var(--color-textSecondary)]">Path:</span>

            <div className="flex items-center gap-1 italic text-[var(--color-textPrimary)]">
              {directoryDetails.path.map((p) => (
                <div key={p.id} className="flex items-center gap-1">
                  <button
                    className="max-w-[140px] truncate capitalize cursor-pointer hover:underline text-[var(--color-info)]"
                    title={
                      p.name.includes("root") ? p.name.split("-")[0] : p.name
                    }
                  >
                    {p.name.includes("root") ? p.name.split("-")[0] : p.name}
                  </button>

                  <IoMdArrowDropright className="text-[var(--color-textDisabled)]" />
                </div>
              ))}

              {/* FILE NAME */}
              <span className="max-w-[160px] truncate italic" title={name}>
                {name}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-[var(--color-textSecondary)]">
              Created At:
            </span>
            <span className="italic">{calDateNTime(createdAt)}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-[var(--color-textSecondary)]">
              Updated At:
            </span>
            <span className="italic">{calDateNTime(updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

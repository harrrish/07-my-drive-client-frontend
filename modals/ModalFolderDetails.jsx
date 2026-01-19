import { IoCloseCircle } from "react-icons/io5";
import { calSize } from "../utils/CalculateFileSize";
import { calDateNTime } from "../utils/CalculateDateTime";
import { IoMdArrowDropright } from "react-icons/io";
import { useContext } from "react";
import { DirectoryContext } from "../utils/Contexts";
import { RiFolderInfoFill } from "react-icons/ri";

export default function ModalFolderDetails({
  setFolderDetails,
  name,
  size,
  createdAt,
  updatedAt,
  DirCount,
  fileCount,
}) {
  const { directoryDetails } = useContext(DirectoryContext);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-3">
      <div className="w-full max-w-2xl rounded-xl bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] shadow-2xl text-[var(--color-textPrimary)] font-google">
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
          <h1 className="flex items-center gap-2 text-lg font-medium">
            <RiFolderInfoFill className="text-[var(--color-accentFocus)] text-xl" />
            Folder Details
          </h1>

          <button
            className="
              cursor-pointer
              text-2xl
              text-[var(--color-textSecondary)]
              hover:text-[var(--color-error)]
              transition-colors
            "
            onClick={() => setFolderDetails(false)}
          >
            <IoCloseCircle />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-4 py-4 flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-textSecondary)]">Name:</span>
            <span className=" truncate max-w-[60%]" title={name}>
              {name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[var(--color-textSecondary)]">Size:</span>
            <span className="">{calSize(size)}</span>
          </div>

          {/* PATH */}
          <div className="flex gap-2 items-start">
            <span className="text-[var(--color-textSecondary)]">Path:</span>
            <div className="flex items-center gap-1 ">
              {directoryDetails.path.map((p) => (
                <div key={p.id} className="flex items-center gap-1">
                  <button
                    className="
                      max-w-[140px]
                      truncate
                      capitalize
                      cursor-pointer
                     
                    "
                    title={
                      p.name.includes("root") ? p.name.split("-")[0] : p.name
                    }
                  >
                    {p.name.includes("root") ? p.name.split("-")[0] : p.name}
                  </button>
                  <IoMdArrowDropright className="text-[var(--color-textDisabled)]" />
                </div>
              ))}

              <span className="truncate max-w-[160px] " title={name}>
                {name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[var(--color-textSecondary)]">Files:</span>
            <span className="">{fileCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[var(--color-textSecondary)]">Folders:</span>
            <span className="">{DirCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[var(--color-textSecondary)]">Created:</span>
            <span className="">{calDateNTime(createdAt)}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[var(--color-textSecondary)]">Updated:</span>
            <span className="">{calDateNTime(updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

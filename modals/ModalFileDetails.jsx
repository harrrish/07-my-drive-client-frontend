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
      <div className="w-full max-w-2xl rounded-xl bg-bgSecondary border border-borderDefault shadow-xl font-google text-textPrimary">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-borderDefault bg-bgElevated rounded-t-xl">
          <h1 className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-semibold">
            <RiFileInfoFill className="text-accentFocus size-5 sm:size-6" />
            <span>File Details</span>
          </h1>
          <button
            onClick={() => setFileDetails(false)}
            className="cursor-pointer text-xl text-textSecondary hover:text-error transition-colors"
          >
            <IoCloseCircle />
          </button>
        </div>
        <div className="p-4 sm:p-6 flex flex-col gap-2 text-md">
          <div className="flex items-center">
            <span className="text-textSecondary w-15">Name:</span>
            <span
              title={name}
              className="break-all truncate text-textPrimary font-medium"
            >
              {name}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-textSecondary w-15">Size:</span>
            <span className="text-textPrimary font-medium">
              {calSize(size)}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-textSecondary w-15">Type:</span>
            <span className="uppercase font-medium text-textPrimary">
              {extension.substring(1)}
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-textSecondary w-15 mt-0.5">Path:</span>
            <div className="flex flex-wrap items-center text-textPrimary">
              <div className="flex flex-wrap items-center">
                {directoryDetails.path.map((p) => (
                  <div key={p.id} className="flex items-center">
                    <button
                      className="max-w-28 sm:max-w-36 truncate capitalize cursor-pointer hover:underline hover:text-accentPrimary transition-colors px-1 py-0.5 rounded"
                      title={
                        p.name.includes("root") ? p.name.split("-")[0] : p.name
                      }
                    >
                      {p.name.includes("root") ? p.name.split("-")[0] : p.name}
                    </button>
                    <IoMdArrowDropright className="text-textDisabled size-3" />
                  </div>
                ))}
                <span className="max-w-32 sm:max-w-40 truncate font-medium px-1 py-0.5 bg-bgElevated rounded border border-borderDefault">
                  {name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-textSecondary w-15">Created:</span>
            <span className="text-textPrimary font-medium">
              {calDateNTime(createdAt)}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-textSecondary w-15">Updated:</span>
            <span className="text-textPrimary font-medium">
              {calDateNTime(updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

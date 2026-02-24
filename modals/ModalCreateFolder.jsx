import { useState, useContext } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts.js";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance.js";
import { useNavigate } from "react-router-dom";
import { MdCreateNewFolder, MdClose } from "react-icons/md";
import { FaFolder, FaPlus, FaSpinner } from "react-icons/fa";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function ModalCreateFolder({
  folderID,
  setCreateFolder,
  handleDirectoryDetails,
}) {
  const [folderName, setFolderName] = useState("");
  const [createLoad, setCreateLoad] = useState(false);
  const { setUpdate } = useContext(UpdateContext);
  const { setError } = useContext(ErrorContext);
  const navigate = useNavigate();

  async function handleCreateFolder() {
    setCreateLoad(true);
    if (!folderName.trim()) {
      setError((prev) => [...prev, "Please provide a valid folder name"]);
      setTimeout(() => setError((prev) => prev.slice(1)), 3000);
      setCreateLoad(false);
    } else {
      try {
        const { data, status } = await axiosWithCreds.post(
          `/directory/${folderID || ""}`,
          { folderName },
        );
        if (status === 201) {
          setUpdate((prev) => [...prev, data.message]);
          setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
          setCreateFolder(false);
          handleDirectoryDetails(folderID);
          setCreateLoad(false);
        }
      } catch (error) {
        axiosError(error, navigate, setError, "Something went wrong !");
        setCreateLoad(false);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-xl bg-bgSecondary border border-borderDefault shadow-xl p-4 sm:p-6 font-google text-textPrimary">
        <div className="flex items-center gap-3 mb-4 sm:mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-bgElevated border border-borderDefault">
            <MdCreateNewFolder className="text-accentPrimary size-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              Create New Folder
            </h2>
            <p className="text-md sm:text-md text-textSecondary mt-1">
              Enter a name for your new folder
            </p>
          </div>
        </div>
        <div className="relative mb-4 sm:mb-5">
          <FaFolder className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary size-4" />
          <input
            type="text"
            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-bgElevated border border-borderHover text-textPrimary placeholder:text-textDisabled focus:outline-none focus:ring-2 focus:ring-accentFocus transition-colors tracking-wider"
            placeholder="Enter folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCreateFolder}
            className="cursor-pointer w-1/2 py-2.5 rounded-lg font-medium bg-accentPrimary text-white hover:bg-accentHover transition-colors flex items-center justify-center gap-2"
          >
            {createLoad ? (
              <FaSpinner className="animate-spin size-4" />
            ) : (
              <FaCheck className="size-4" />
            )}
            <span>{createLoad ? "Creating..." : "Create Folder"}</span>
          </button>
          <button
            onClick={() => setCreateFolder(false)}
            className="cursor-pointer w-1/2 py-2.5 rounded-lg font-medium bg-bgElevated border border-borderHover text-textPrimary hover:bg-error hover:text-white hover:border-error transition-colors flex items-center justify-center gap-2"
          >
            <FaTimes className="size-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

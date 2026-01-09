import { useState, useContext } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts.js";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance.js";
import { useNavigate } from "react-router-dom";

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
        axiosError(error, navigate, setError, "Failed to create folder");
        setCreateLoad(false);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-xl bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] shadow-2xl p-6 font-google text-[var(--color-textPrimary)]">
        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create New Folder
        </h2>

        {/* INPUT */}
        <input
          type="text"
          className="w-full px-3 py-2 mb-4 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] text-[var(--color-textPrimary)] placeholder:text-[var(--color-textDisabled)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={handleCreateFolder}
            className="
              cursor-pointer w-1/2 py-2 rounded-md font-medium
              bg-[var(--color-accentPrimary)]
              hover:bg-[var(--color-accentHover)]
              transition-colors
            "
          >
            {createLoad ? "Creating..." : "Create"}
          </button>

          <button
            onClick={() => setCreateFolder(false)}
            className="cursor-pointer w-1/2 py-2 rounded-md font-medium bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-error)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

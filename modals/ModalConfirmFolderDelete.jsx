import { useNavigate } from "react-router-dom";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { useContext } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts";

export default function ModalConfirmFolderDelete({
  deleteFolderID,
  setDeleteFolderID,
  fetchTrashedItems,
}) {
  // console.log(deleteFolderID);
  const { setError } = useContext(ErrorContext);
  const { setUpdate } = useContext(UpdateContext);
  const navigate = useNavigate();

  async function handleFileDelete(id) {
    try {
      const { data, status } = await axiosWithCreds.delete(
        `/directory/delete/${id}`,
      );
      // console.log(data, status);
      console.log(data.message);
      if (status === 201) {
        fetchTrashedItems();
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    } finally {
      setDeleteFolderID(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-[90%] max-w-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-lg p-6 flex flex-col gap-4 shadow-xl">
        <h1 className="text-lg font-semibold text-[var(--color-textPrimary)]">
          Permanently delete folder?
        </h1>

        <p className="text-sm text-[var(--color-textSecondary)] leading-relaxed">
          This action cannot be undone. The folder will be permanently removed
          from{" "}
          <span className="text-[var(--color-textPrimary)] font-medium">
            My-Drive
          </span>
          .
        </p>

        {/* WARNING NOTE */}
        <div className="rounded-md border border-[var(--color-warning)]/40 bg-[var(--color-bgElevated)] px-3 py-2 text-xs text-[var(--color-warning)] leading-relaxed">
          <span className="font-semibold">Note:</span> Deleting this folder will
          also permanently delete{" "}
          <span className="font-medium">all its subfolders and files</span>. If
          any subfolders are currently in the Trash, they will be deleted as
          well.
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => setDeleteFolderID(null)}
            className="
          px-4 py-2 rounded-md
          border border-[var(--color-borderHover)]
          text-sm text-[var(--color-textPrimary)]
          cursor-pointer
          hover:bg-[var(--color-bgElevated)]
          transition-colors
        "
          >
            Cancel
          </button>

          <button
            onClick={() => handleFileDelete(deleteFolderID)}
            className="
          px-4 py-2 rounded-md
          bg-[var(--color-error)]
          text-white text-sm
          cursor-pointer
          hover:opacity-90
          transition-opacity
        "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

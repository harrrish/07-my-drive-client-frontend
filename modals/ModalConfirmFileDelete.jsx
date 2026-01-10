import { useNavigate } from "react-router-dom";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { useContext } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts";

export default function ModalConfirmFileDelete({
  deleteFileID,
  setDeleteFileID,
  fetchTrashedItems,
}) {
  // console.log(deleteFileID);
  const { setError } = useContext(ErrorContext);
  const { setUpdate } = useContext(UpdateContext);
  const navigate = useNavigate();

  async function handleFileDelete(id) {
    try {
      const { data, status } = await axiosWithCreds.delete(
        `/file/delete/${id}`,
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
      setDeleteFileID(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="w-[90%] max-w-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-lg p-6 flex flex-col gap-4 shadow-xl">
        <h1 className="text-lg font-semibold text-[var(--color-textPrimary)]">
          Permanently delete file?
        </h1>

        <p className="text-sm text-[var(--color-textSecondary)]">
          This file will be permanently deleted and cannot be restored.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => setDeleteFileID(null)}
            className="px-4 py-2 rounded-md border border-[var(--color-borderHover)] text-sm cursor-pointer hover:bg-[var(--color-bgElevated)]"
          >
            Cancel
          </button>
          <button
            onClick={() => handleFileDelete(deleteFileID)}
            className="px-4 py-2 rounded-md bg-[var(--color-error)] text-white text-sm cursor-pointer hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

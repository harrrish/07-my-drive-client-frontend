import { useNavigate } from "react-router-dom";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { useContext } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { MdDeleteForever } from "react-icons/md";

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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 font-medium">
      <div className="w-full max-w-md bg-bgSecondary border border-borderDefault rounded-xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10">
            <MdDeleteForever className="text-error size-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-textPrimary">
              Permanently delete file?
            </h1>
            <p className="text-md sm:text-md text-textSecondary">
              This file will be permanently deleted and cannot be restored.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-1">
          <button
            onClick={() => setDeleteFileID(null)}
            className="cursor-pointer px-4 py-2.5 rounded-lg border border-borderHover text-md text-textPrimary hover:bg-bgElevated transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleFileDelete(deleteFileID)}
            className="cursor-pointer px-4 py-2.5 rounded-lg bg-error text-white text-md hover:bg-error/90 transition-colors flex items-center gap-2"
          >
            <MdDeleteForever className="size-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

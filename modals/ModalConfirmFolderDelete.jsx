import { useNavigate } from "react-router-dom";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { useContext } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { MdDeleteForever } from "react-icons/md";

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
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 font-medium">
      <div className="w-full max-w-md bg-bgSecondary border border-borderDefault rounded-xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-14 h-10">
            <MdDeleteForever className="text-error size-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-textPrimary">
              Permanently delete folder?
            </h1>
            <p className="text-md sm:text-md text-textSecondary leading-relaxed">
              This action cannot be undone. The folder will be permanently
              removed from{" "}
              <span className="text-textPrimary font-medium">My-Drive</span>.
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-warning/40 bg-bgElevated px-3 py-2 text-md text-warning leading-relaxed">
          <span className="font-semibold">Note:</span> Deleting this folder will
          also permanently delete{" "}
          <span className="font-medium">all its subfolders and files</span>. If
          any subfolders are currently in the Trash, they will be deleted as
          well.
        </div>
        <div className="flex justify-end gap-3 pt-1">
          <button
            onClick={() => setDeleteFolderID(null)}
            className="cursor-pointer px-4 py-2.5 rounded-lg border border-borderHover text-md text-textPrimary hover:bg-bgElevated transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleFileDelete(deleteFolderID)}
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

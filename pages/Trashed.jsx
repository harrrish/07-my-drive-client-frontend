import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete, MdHome } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import ModalConfirmFolderDelete from "../modals/ModalConfirmFolderDelete";
import ModalConfirmFileDelete from "../modals/ModalConfirmFileDelete";
import ModalsDiv from "../modals/ModalsDiv";
import Shimmer from "../components/Shimmer";
import TrashPageFolderNotFound from "../modals/TrashPageFolderNotFound";
import TrashPageFileParentNotFound from "../modals/TrashPageFileParentNotFound";

export default function Trash() {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { setUpdate } = useContext(UpdateContext);

  const [foldersList, setFoldersList] = useState([]);
  const [foldersCount, setFoldersCount] = useState(0);
  const [filesList, setFilesList] = useState([]);
  const [filesCount, setFilesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [deleteFolderID, setDeleteFolderID] = useState(null);
  const [deleteFileID, setDeleteFileID] = useState(null);

  const [cantRestoreFolder, setCantRestoreFolder] = useState(false);
  const [cantRestoreFile, setCantRestoreFile] = useState(false);

  async function handleTrashFolder(id, isTrashed) {
    try {
      const { data, status } = await axiosWithCreds.patch(
        `/directory/trash/${id}`,
        { isTrashed },
      );

      if (status === 201) {
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
        fetchTrashedItems();
      }
    } catch (error) {
      const errorMessage = error.response.data.error;
      if (errorMessage === "Folder may be deleted or Access denied") {
        setCantRestoreFolder(true);
      } else {
        axiosError(error, navigate, setError, "Something went wrong !");
      }
    }
  }

  async function handleTrashFile(id, isTrashed) {
    try {
      const { data, status } = await axiosWithCreds.patch(`/file/trash/${id}`, {
        isTrashed,
      });

      if (status === 201) {
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
        fetchTrashedItems();
      }
    } catch (error) {
      const errorMessage = error.response.data.error;
      if (errorMessage === "Folder may be deleted or Access denied") {
        setCantRestoreFile(true);
      } else {
        axiosError(error, navigate, setError, "Something went wrong !");
      }
    }
  }

  const fetchTrashedItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosWithCreds.get(`/trashed`);
      setFoldersList(data.folders || []);
      setFilesList(data.files || []);
      setFoldersCount(data.foldersCount || 0);
      setFilesCount(data.filesCount || 0);
    } catch (error) {
      axiosError(
        error,
        navigate,
        setError,
        "Failed to fetch trashed contents !",
      );
    } finally {
      setLoading(false);
    }
  }, [navigate, setError]);

  useEffect(() => {
    fetchTrashedItems();
  }, [fetchTrashedItems]);

  return (
    <>
      <ModalsDiv
        showCreateFolder={false}
        setCreateFolder={() => {}}
        folderID={null}
        handleDirectoryDetails={() => {}}
      />
      {cantRestoreFile && (
        <TrashPageFileParentNotFound setCantRestoreFile={setCantRestoreFile} />
      )}

      {cantRestoreFolder && (
        <TrashPageFolderNotFound setCantRestoreFolder={setCantRestoreFolder} />
      )}
      <div className="min-h-screen bg-[var(--color-bgPrimary)] px-4 py-6 font-google text-[var(--color-textPrimary)]">
        {deleteFolderID && (
          <ModalConfirmFolderDelete
            deleteFolderID={deleteFolderID}
            setDeleteFolderID={setDeleteFolderID}
            fetchTrashedItems={fetchTrashedItems}
          />
        )}

        {deleteFileID && (
          <ModalConfirmFileDelete
            deleteFileID={deleteFileID}
            setDeleteFileID={setDeleteFileID}
            fetchTrashedItems={fetchTrashedItems}
          />
        )}

        <div className="w-full max-w-4xl mx-auto bg-[var(--color-bgSecondary)] rounded-xl border border-[var(--color-borderDefault)] shadow-2xl p-6 sm:p-8 flex flex-col gap-6">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="flex items-center gap-3 text-3xl font-semibold">
              <MdDelete className="text-[var(--color-error)]" />
              Trash
            </h1>

            <div className="flex gap-4 text-sm text-[var(--color-textSecondary)]">
              <span>
                Folders:{" "}
                <span className="text-[var(--color-textPrimary)] font-medium">
                  {foldersCount}
                </span>
              </span>
              <span>
                Files:{" "}
                <span className="text-[var(--color-textPrimary)] font-medium">
                  {filesCount}
                </span>
              </span>
            </div>
          </div>

          {/* INFO CARD */}
          <div className="rounded-lg border border-[var(--color-borderDefault)] bg-[var(--color-bgElevated)] p-4 flex flex-col gap-3">
            <p className="text-sm leading-relaxed text-[var(--color-textSecondary)] text-center">
              Items moved to Trash are stored temporarily. You can restore them
              back to{" "}
              <span className="text-[var(--color-textPrimary)] font-medium">
                My-Drive
              </span>{" "}
              or permanently delete them.
            </p>

            <div className="rounded-md border border-[var(--color-warning)] bg-[var(--color-bgSecondary)] px-3 py-2 text-sm text-[var(--color-warning)] font-medium text-center">
              <span className="font-semibold">Important:</span> Files and
              folders in Trash{" "}
              <span className="font-semibold">
                continue to use your storage space
              </span>
              . Storage is freed only after permanent deletion — automatically
              after <span className="font-bold underline">7 days</span> or when
              you delete them manually.
            </div>
          </div>

          {/* CONTENT */}
          {loading ? (
            <Shimmer />
          ) : (
            <div className="flex flex-col gap-6">
              {/* FOLDERS */}
              {foldersList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-xs uppercase tracking-wide text-[var(--color-textSecondary)]">
                    Folders
                  </h2>

                  {foldersList.map((f) => (
                    <div
                      key={f._id}
                      className="flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderDefault)] hover:border-[var(--color-borderHover)]"
                    >
                      <span className="capitalize truncate w-[85%]">
                        {f.name}
                      </span>

                      <div className="flex items-center gap-4">
                        <FaUndo
                          onClick={() => handleTrashFolder(f._id, f.isTrashed)}
                          className="cursor-pointer text-[var(--color-success)] hover:scale-110 transition"
                        />

                        <MdDelete
                          onClick={() => {
                            setDeleteFolderID(f._id);
                            setDeleteFileID(null);
                          }}
                          className="cursor-pointer text-[var(--color-error)] opacity-70 hover:opacity-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* FILES */}
              {filesList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-xs uppercase tracking-wide text-[var(--color-textSecondary)]">
                    Files
                  </h2>

                  {filesList.map((f) => (
                    <div
                      key={f._id}
                      className="flex items-center justify-between px-3 py-2 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderDefault)] hover:border-[var(--color-borderHover)]"
                    >
                      <span className="capitalize truncate w-[85%]">
                        {f.name}
                      </span>

                      <div className="flex items-center gap-4">
                        <FaUndo
                          onClick={() => handleTrashFile(f._id, f.isTrashed)}
                          className="cursor-pointer text-[var(--color-success)] hover:scale-110 transition"
                        />
                        <MdDelete
                          onClick={() => {
                            setDeleteFolderID(null);
                            setDeleteFileID(f._id);
                          }}
                          className="cursor-pointer text-[var(--color-error)] opacity-70 hover:opacity-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EMPTY */}
              {foldersList.length === 0 && filesList.length === 0 && (
                <div className="text-center text-sm text-[var(--color-textDisabled)] py-12">
                  No trashed files or folders found.
                </div>
              )}
            </div>
          )}

          {/* FOOTER */}
          <NavLink
            to="/directory"
            className="self-center mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[var(--color-bgElevated)] border border-[var(--color-borderHover)] hover:bg-[var(--color-accentPrimary)] hover:border-[var(--color-borderActive)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
          >
            <MdHome />
            Back to Home
          </NavLink>
        </div>
      </div>
    </>
  );
}

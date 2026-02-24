import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete, MdHome } from "react-icons/md";
import { FaFolder, FaUndo } from "react-icons/fa";
import { useCallback, useContext, useEffect, useState } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import ModalConfirmFolderDelete from "../modals/ModalConfirmFolderDelete";
import ModalConfirmFileDelete from "../modals/ModalConfirmFileDelete";
import ModalsDiv from "../modals/ModalsDiv";
import Shimmer from "../components/Shimmer";
import CantRestoreFile from "../modals/CantRestoreFile";
import CantRestoreFolder from "../modals/CantRestoreFolder";
import { MdInfo } from "react-icons/md";

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
    const val = !isTrashed ? "move" : "remove";
    try {
      const { data, status } = await axiosWithCreds.patch(
        `/trash/${val}/folder/${id}`,
      );

      if (status === 201) {
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
        fetchTrashedItems();
      }
    } catch (error) {
      const errorMessage = error.response.data.error;
      if (errorMessage === "Parent folder is not accessible !") {
        setCantRestoreFolder(true);
      } else {
        axiosError(error, navigate, setError, "Something went wrong !");
      }
    }
  }

  async function handleTrashFile(id, isTrashed) {
    const val = !isTrashed ? "move" : "remove";
    try {
      const { data, status } = await axiosWithCreds.patch(
        `/trash/${val}/file/${id}`,
      );
      if (status === 201) {
        console.log(data.message);
        fetchTrashedItems();
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      const errMessage = error.response.data.error;
      console.log(errMessage);
      if (errMessage === "Folder containing file is not accessible !") {
        setCantRestoreFile(true);
      } else {
        axiosError(error, navigate, setError, "Something went wrong !");
      }
    }
  }

  const fetchTrashedItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosWithCreds.get(`/trash/contents`);
      setFoldersList(data.folders || []);
      setFilesList(data.files || []);
      setFoldersCount(data.foldersCount || 0);
      setFilesCount(data.filesCount || 0);
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
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
        <CantRestoreFile setCantRestoreFile={setCantRestoreFile} />
      )}
      {cantRestoreFolder && (
        <CantRestoreFolder setCantRestoreFolder={setCantRestoreFolder} />
      )}

      <div className="min-h-screen bg-bgPrimary px-4 py-6 font-google text-textPrimary">
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

        <div className="w-full max-w-4xl mx-auto bg-bgSecondary rounded-xl border border-borderDefault shadow-xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 font-medium">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <h1 className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-semibold">
              <MdDelete className="text-error size-6 sm:size-7" />
              <span>Trash</span>
            </h1>
            <div className="flex gap-3 sm:gap-4 text-md sm:text-md text-textSecondary">
              <span>
                Folders:{" "}
                <span className="text-textPrimary font-medium">
                  {foldersCount}
                </span>
              </span>
              <span>
                Files:{" "}
                <span className="text-textPrimary font-medium">
                  {filesCount}
                </span>
              </span>
            </div>
          </div>

          {/* INFO CARD */}
          <div className="rounded-lg border border-borderDefault bg-bgElevated p-3 sm:p-4 flex flex-col gap-2 sm:gap-3">
            <div className="flex items-center gap-2 justify-center text-textSecondary">
              <MdInfo className="size-4 sm:size-5" />
              <p className="text-md sm:text-md text-center">
                Items moved to Trash are stored temporarily. You can restore
                them back to{" "}
                <span className="text-textPrimary font-medium">My-Drive</span>{" "}
                or permanently delete them.
              </p>
            </div>
            <div className="rounded-md border border-warning/30 bg-bgSecondary/50 px-3 py-2 text-md sm:text-md text-warning font-medium text-center">
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
            <div className="flex flex-col gap-4 sm:gap-6 min-h-[50vh]">
              {/* FOLDERS */}
              {foldersList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-md uppercase tracking-wide text-textSecondary font-medium">
                    Folders
                  </h2>
                  <div className="flex flex-col gap-2">
                    {foldersList.map((f) => (
                      <div
                        key={f._id}
                        className="flex items-center justify-between px-3 py-2.5 sm:py-3 rounded-lg bg-bgElevated border border-borderDefault hover:border-borderHover transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <FaFolder className="text-warning size-5 shrink-0" />
                          <span className="truncate text-textPrimary text-md sm:text-base">
                            {f.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 ml-2">
                          <FaUndo
                            onClick={() =>
                              handleTrashFolder(f._id, f.isTrashed)
                            }
                            className="cursor-pointer text-success size-4 hover:scale-110 transition-transform"
                            title="Restore folder"
                          />
                          <MdDelete
                            onClick={() => {
                              setDeleteFolderID(f._id);
                              setDeleteFileID(null);
                            }}
                            className="cursor-pointer text-error size-5 hover:opacity-100 opacity-70 transition-opacity"
                            title="Delete permanently"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FILES */}
              {filesList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-md uppercase tracking-wide text-textSecondary font-medium">
                    Files
                  </h2>
                  <div className="flex flex-col gap-2">
                    {filesList.map((f) => (
                      <div
                        key={f._id}
                        className="flex items-center justify-between px-3 py-2.5 sm:py-3 rounded-lg bg-bgElevated border border-borderDefault hover:border-borderHover transition-colors"
                      >
                        <span className="truncate text-textPrimary text-md sm:text-base flex-1">
                          {f.name}
                        </span>
                        <div className="flex items-center gap-3 sm:gap-4 ml-2">
                          <FaUndo
                            onClick={() => handleTrashFile(f._id, f.isTrashed)}
                            className="cursor-pointer text-success size-4 hover:scale-110 transition-transform"
                            title="Restore file"
                          />
                          <MdDelete
                            onClick={() => {
                              setDeleteFolderID(null);
                              setDeleteFileID(f._id);
                            }}
                            className="cursor-pointer text-error size-5 hover:opacity-100 opacity-70 transition-opacity"
                            title="Delete permanently"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EMPTY */}
              {foldersList.length === 0 && filesList.length === 0 && (
                <div className="text-center text-md text-textDisabled py-8 sm:py-12">
                  No trashed files or folders found.
                </div>
              )}
            </div>
          )}

          {/* FOOTER */}
          <NavLink
            to="/directory"
            className="self-center mt-2 sm:mt-4 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-bgElevated border border-borderHover hover:bg-accentPrimary hover:border-borderActive hover:text-white transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accentFocus"
          >
            <MdHome className="size-5" />
            <span className="text-md sm:text-base">Back to Home</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}

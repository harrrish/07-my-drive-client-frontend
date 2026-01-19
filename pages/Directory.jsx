import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DirectoryContext,
  ErrorContext,
  UpdateContext,
  UserSettingViewContext,
  UserStorageContext,
} from "../utils/Contexts.js";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance.js";
import CompNavbar from "../components/NavbarHome.jsx";
import CompFileItem from "../components/FileItem.jsx";
import CompFolderItem from "../components/FolderItem.jsx";
import ModalsDiv from "../modals/ModalsDiv.jsx";
import { TiFolderAdd } from "react-icons/ti";
import { FaFileUpload, FaSearch, FaSortAmountDown } from "react-icons/fa";
import { LuFiles } from "react-icons/lu";
import { IoMdArrowDropright } from "react-icons/io";
import { RiFoldersFill } from "react-icons/ri";
import {
  startSingleUpload,
  uploadSingleFile,
} from "../utils/UploadSingleFile.js";
import { BiFolderOpen } from "react-icons/bi";
import UploadFile from "../components/UploadFile.jsx";
import UserSettings from "../components/UserSettings.jsx";
import { MdDelete, MdOutlineDriveFileMove } from "react-icons/md";
import { MdFolderOff, MdHome } from "react-icons/md";

export default function PageDirectoryView() {
  const { dirID } = useParams();
  const navigate = useNavigate();

  const [showCreateFolder, setCreateFolder] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadFilesList, setUploadFilesList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { setError } = useContext(ErrorContext);
  const { setUpdate } = useContext(UpdateContext);
  const { setUserStorage } = useContext(UserStorageContext);
  const { directoryDetails, setDirectoryDetails } =
    useContext(DirectoryContext);
  const { userView } = useContext(UserSettingViewContext);

  const [folderNotFound, setFolderNotFound] = useState(false);

  /* ================= STORAGE ================= */
  const handleUserStorageDetails = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get("/user/storage-details");
      setUserStorage((prev) => ({
        ...prev,
        size: data?.size || 0,
        maxStorageInBytes: data?.maxStorageInBytes || 0,
      }));
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }, [navigate, setError, setUserStorage]);

  /* ================= DIRECTORY ================= */
  const handleDirectoryDetails = useCallback(
    async (dirID) => {
      try {
        const endpoint = dirID ? `/directory/${dirID}` : `/directory`;
        const { data } = await axiosWithCreds.get(endpoint);
        setDirectoryDetails((prev) => ({
          ...prev,
          ...data,
          path: data?.path || [],
          folders: data?.folders || [],
          files: data?.files || [],
          foldersCount: data?.foldersCount || 0,
          filesCount: data?.filesCount || 0,
        }));
        handleUserStorageDetails();
      } catch (error) {
        const notFound =
          error.response?.data?.error ===
          "Folder may be deleted or Access denied !";
        if (notFound) {
          setFolderNotFound(true);
        } else {
          axiosError(error, navigate, setError, "Something went wrong !");
        }
      } finally {
        setLoading(false);
      }
    },
    [handleUserStorageDetails, navigate, setDirectoryDetails, setError],
  );

  /* ================= FILE UPLOAD ================= */
  async function handleFilesUpload(e) {
    if (isUploading) return;

    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    const list = files.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      id: crypto.randomUUID(),
      progress: 0,
    }));
    setUploadFilesList(list);

    for await (const item of list) {
      const { status, fileID, uploadSignedUrl } = await uploadSingleFile(
        item,
        dirID,
        navigate,
        setError,
      );
      if (status === 200) {
        await startSingleUpload(
          dirID,
          item,
          uploadSignedUrl,
          fileID,
          handleDirectoryDetails,
          navigate,
          setError,
          setUpdate,
          setUploadFilesList,
        );
      }
    }
    setIsUploading(false);
  }

  useEffect(() => {
    handleDirectoryDetails(dirID);
  }, [dirID, handleDirectoryDetails]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bgPrimary)]">
        <div className="w-10 h-10 border-4 border-[var(--color-borderHover)] border-t-[var(--color-accentPrimary)] rounded-full animate-spin" />{" "}
      </div>
    );
  } else if (folderNotFound) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-bgPrimary)] px-4 font-google">
        <div
          className="
          w-full max-w-2xl
          bg-[var(--color-bgSecondary)]
          border border-[var(--color-borderDefault)]
          rounded-xl
          shadow-2xl
          p-6 sm:p-8
          flex flex-col gap-6
          text-[var(--color-textPrimary)]
        "
        >
          {/* HEADER */}
          <div className="flex flex-col items-center gap-3 text-center">
            <MdFolderOff className="text-5xl text-[var(--color-error)]" />

            <h1 className="text-2xl sm:text-3xl font-semibold">
              Folder Not Found
            </h1>

            <p className="text-sm sm:text-base text-[var(--color-textSecondary)] max-w-lg">
              The folder you’re trying to access does not exist or you don’t
              have permission to view it.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-[var(--color-borderDefault)]" />

          {/* POSSIBLE REASONS */}
          <div className="flex flex-col gap-4 text-sm sm:text-base">
            {/* TRASH OPTION */}
            <div
              className="
              flex flex-col sm:flex-row sm:items-center sm:justify-between
              gap-3
              bg-[var(--color-bgElevated)]
              border border-[var(--color-borderDefault)]
              rounded-lg
              p-4
            "
            >
              <div className="flex flex-col gap-1">
                <h2 className="font-medium text-[var(--color-textPrimary)]">
                  Folder may be in Trash
                </h2>
                <p className="text-[var(--color-textSecondary)] text-sm">
                  The folder might have been moved to Trash and can still be
                  restored.
                </p>
              </div>

              <button
                onClick={() => navigate("/trashed", { replace: true })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--color-bgSecondary)] border border-[var--color-borderHover)] text-[var(--color-warning)] hover:bg-[var(--color-bgPrimary)] hover:border-[var(--color-warning)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
              >
                <MdDelete className="text-lg" />
                Visit Trash
              </button>
            </div>

            {/* HOME OPTION */}
            <div
              className="
              flex flex-col sm:flex-row sm:items-center sm:justify-between
              gap-3
              bg-[var(--color-bgElevated)]
              border border-[var(--color-borderDefault)]
              rounded-lg
              p-4
            "
            >
              <div className="flex flex-col gap-1">
                <h2 className="font-medium text-[var(--color-textPrimary)]">
                  Folder permanently deleted or access revoked
                </h2>
                <p className="text-[var(--color-textSecondary)] text-sm">
                  If the folder was deleted permanently or access was removed,
                  you can safely return to Home.
                </p>
              </div>

              <button
                onClick={() => navigate("/directory", { replace: true })}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[160px] px-5 py-2 rounded-md bg-[var(--color-accentPrimary)] text-white hover:bg-[var(--color-accentHover)] transition-all duration-200 cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
              >
                <MdHome className="text-lg" />
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] font-google font-medium">
        <ModalsDiv
          showCreateFolder={showCreateFolder}
          setCreateFolder={setCreateFolder}
          folderID={dirID}
          handleDirectoryDetails={handleDirectoryDetails}
        />

        {/* USER SETTINGS OVERLAY */}
        <div
          className={`fixed inset-0 z-20 bg-black/70 transition-opacity ${
            userView ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <UserSettings />
        </div>

        <div className="flex flex-col gap-3">
          <CompNavbar />

          {/* PATH */}
          <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto px-3 h-10 flex items-center rounded-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] overflow-x-auto">
            {directoryDetails.path.map((p) => (
              <div key={p.id} className="flex items-center">
                <button
                  onClick={() => navigate(`/directory/${p.id}`)}
                  className="truncate max-w-[140px] capitalize hover:underline cursor-pointer"
                  title={p.name}
                >
                  {p.name.includes("root") ? p.name.split("-")[0] : p.name}
                </button>
                <IoMdArrowDropright className="text-[var(--color-textDisabled)]" />
              </div>
            ))}
          </div>

          {/* ACTION BAR */}
          <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto flex gap-2">
            <button
              onClick={() => setCreateFolder(true)}
              className="flex-1 h-10 rounded-md border border-[var(--color-borderHover)] bg-[var(--color-bgSecondary)] hover:bg-[var(--color-bgElevated)] cursor-pointer flex items-center justify-center gap-2"
            >
              <TiFolderAdd className="text-xl text-[var(--color-accentPrimary)]" />
              Create Folder
            </button>

            <label className="flex-1 h-10 rounded-md border border-[var(--color-borderHover)] bg-[var(--color-bgSecondary)] hover:bg-[var(--color-bgElevated)] cursor-pointer flex items-center justify-center gap-2">
              <FaFileUpload className="text-lg text-[var(--color-info)]" />
              Upload Files
              <input
                type="file"
                multiple
                onChange={handleFilesUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* SEARCH + SORT */}
          <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto flex h-10 rounded-md overflow-hidden border border-[var(--color-borderDefault)] bg-[var(--color-bgSecondary)]">
            <div className="flex items-center flex-1 px-2">
              <input
                type="text"
                placeholder="Search files or folders"
                className="w-full bg-transparent outline-none text-sm"
              />
              <FaSearch className="text-[var(--color-textDisabled)] mr-2 hover:text-white cursor-pointer" />
            </div>

            <div className="flex items-center gap-2 px-3 border-l border-[var(--color-borderDefault)]">
              <FaSortAmountDown className="text-[var(--color-textSecondary)]" />

              <select className="bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] border border-[var(--color-borderHover)] rounded-md px-2 py-1 outline-none cursor-pointer text-sm focus:border-[var(--color-borderActive)] focus:ring-2 focus:ring-[var(--color-accentFocus)] text-center font-medium">
                <option className="bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] font-medium">
                  Name (A–Z)
                </option>
                <option className="bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] font-medium">
                  Name (Z–A)
                </option>
                <option className="bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] font-medium">
                  Size
                </option>
                <option className="bg-[var(--color-bgSecondary)] text-[var(--color-textPrimary)] font-medium">
                  Last Modified
                </option>
              </select>
            </div>
          </div>

          <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto flex justify-between items-center py-2 px-3 rounded-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] shadow-sm">
            <div className="flex gap-3 items-center">
              <span
                className="text-2xl text-[var(--color-textSecondary)] hover:text-[var(--color-textPrimary)] cursor-pointer transition-colors"
                title="Move the file to different folders !"
              >
                <MdOutlineDriveFileMove />
              </span>

              <span
                className="text-xl text-[var(--color-textSecondary)] hover:text-[var(--color-error)] cursor-pointer transition-colors"
                title="Delete"
              >
                <MdDelete />
              </span>
            </div>

            <div className="flex gap-4 items-center text-lg text-[var(--color-textSecondary)]">
              <span className="flex items-center gap-1">
                <RiFoldersFill className="text-[var(--color-accentPrimary)]" />
                {directoryDetails.foldersCount}
              </span>
              <span className="flex items-center gap-1">
                <LuFiles className="text-[var(--color-info)]" />
                {directoryDetails.filesCount}
              </span>
            </div>
          </div>

          {/* EMPTY */}
          {directoryDetails.foldersCount === 0 &&
            directoryDetails.filesCount === 0 &&
            !isUploading && (
              <div className="flex flex-col items-center justify-center min-h-[40vh] text-[var(--color-textSecondary)]">
                <BiFolderOpen className="text-4xl mb-2" />
                Empty folder
              </div>
            )}

          {/* LIST */}
          <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto flex flex-col gap-2">
            {directoryDetails.folders.map((f) => (
              <CompFolderItem
                key={f._id}
                {...f}
                parentFID={dirID}
                handleDirectoryDetails={handleDirectoryDetails}
              />
            ))}
            {directoryDetails.files.map((f) => (
              <CompFileItem
                key={f._id}
                {...f}
                parentFID={dirID}
                handleDirectoryDetails={handleDirectoryDetails}
                handleUserStorageDetails={handleUserStorageDetails}
              />
            ))}
          </div>

          {isUploading &&
            uploadFilesList.map((file) => (
              <UploadFile key={file.id} {...file} />
            ))}
        </div>
      </div>
    );
  }
}

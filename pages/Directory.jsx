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
import { FaFileUpload } from "react-icons/fa";
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
      axiosError(error, navigate, setError, "Failed to fetch storage info");
    }
  }, [navigate, setError, setUserStorage]);

  /* ================= DIRECTORY ================= */
  const handleDirectoryDetails = useCallback(
    async (dirID) => {
      try {
        const { data } = await axiosWithCreds.get(`/directory/${dirID || ""}`);
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
        axiosError(error, navigate, setError, "Failed to fetch directory");
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
        <div className="w-10 h-10 border-4 border-[var(--color-borderHover)] border-t-[var(--color-accentPrimary)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] font-google">
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

        {/* 🔴 MISSING SECTION — RESTORED */}
        <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto flex justify-between items-center py-2">
          <div className="flex gap-3 items-center">
            <span className="text-2xl text-[var(--color-textSecondary)] hover:text-[var(--color-textPrimary)] cursor-pointer">
              <MdOutlineDriveFileMove />
            </span>
            <span className="text-xl text-[var(--color-textSecondary)] hover:text-[var(--color-error)] cursor-pointer">
              <MdDelete />
            </span>
          </div>

          <div className="flex gap-4 items-center text-sm">
            <span className="flex items-center gap-1">
              <RiFoldersFill />
              {directoryDetails.foldersCount}
            </span>
            <span className="flex items-center gap-1">
              <LuFiles />
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
              handleDirectoryDetails={handleDirectoryDetails}
            />
          ))}
          {directoryDetails.files.map((f) => (
            <CompFileItem
              key={f._id}
              {...f}
              handleDirectoryDetails={handleDirectoryDetails}
              handleUserStorageDetails={handleUserStorageDetails}
            />
          ))}
        </div>

        {isUploading &&
          uploadFilesList.map((file) => <UploadFile key={file.id} {...file} />)}
      </div>
    </div>
  );
}

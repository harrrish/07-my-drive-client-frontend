import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DirectoryContext,
  ErrorContext,
  UpdateContext,
  UserDetailsContext,
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
import Menu from "../components/UserSettings.jsx";
import { MdDelete, MdOutlineDriveFileMove } from "react-icons/md";
import { MdFolderOff, MdHome } from "react-icons/md";
import { IoArrowForward, IoHome, IoTrashBin } from "react-icons/io5";
import {
  FaFolderPlus,
  FaCloudUploadAlt,
  FaFilter,
  FaFolder,
  FaFile,
} from "react-icons/fa";
import DirectoryShimmer from "../components/DirectoryShimmer.jsx";
import EmptyDirectory from "../components/EmptyDirectory.jsx";

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
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const { openSettings } = useContext(UserSettingViewContext);

  const [folderNotFound, setFolderNotFound] = useState(false);

  //* STORAGE
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

  //* DIRECTORY
  const handleDirectoryDetails = useCallback(
    async (dirID) => {
      try {
        setLoading(true);
        const endpoint = dirID ? `/directory/${dirID}` : `/directory`;
        const { data } = await axiosWithCreds.get(endpoint);
        console.log(data);
        setDirectoryDetails((prev) => ({
          ...prev,
          ...data,
          path: data?.path || [],
          folders: data?.folders || [],
          files: data?.files || [],
          foldersCount: data?.foldersCount || 0,
          filesCount: data?.filesCount || 0,
        }));
        setUserDetails((prev) => ({
          ...prev,
          role: data?.role,
          roleCode: data?.roleCode,
        }));
        handleUserStorageDetails();
      } catch (error) {
        axiosError(error, navigate, setError, null, setFolderNotFound);
      } finally {
        setLoading(false);
      }
    },
    [
      handleUserStorageDetails,
      navigate,
      setDirectoryDetails,
      setError,
      setUserDetails,
    ],
  );

  //* FILE UPLOAD
  async function handleFilesUpload(e) {
    console.log("value", e.target.value);
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
    e.target.value = null;
  }

  useEffect(() => {
    handleDirectoryDetails(dirID);
  }, [dirID, handleDirectoryDetails]);

  if (folderNotFound) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-bgPrimary px-4 font-google">
        <div className="w-full max-w-2xl bg-bgSecondary border border-borderDefault rounded-xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 text-textPrimary">
          {/* HEADER */}
          <div className="flex flex-col items-center gap-3 text-center">
            <MdFolderOff className="text-5xl text-[var(--color-error)]" />

            <h1 className="text-2xl sm:text-3xl font-semibold">
              Folder Not Found
            </h1>

            <p className="text-md sm:text-base text-textSecondary max-w-lg">
              The folder you’re trying to access does not exist or you don’t
              have permission to view it.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-borderDefault" />

          {/* POSSIBLE REASONS */}
          <div className="flex flex-col gap-4 text-md sm:text-base">
            {/* TRASH OPTION */}
            <div
              className="
              flex flex-col sm:flex-row sm:items-center sm:justify-between
              gap-3
              bg-[var(--color-bgElevated)]
              border border-borderDefault
              rounded-lg
              p-4
            "
            >
              <div className="flex flex-col gap-1">
                <h2 className="font-medium text-textPrimary">
                  Folder may be in Trash
                </h2>
                <p className="text-textSecondary text-md">
                  The folder might have been moved to Trash and can still be
                  restored.
                </p>
              </div>

              <button
                onClick={() => navigate("/trashed", { replace: true })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-bgSecondary border border-[var--color-borderHover)] text-[var(--color-warning)] hover:bg-bgPrimary hover:border-[var(--color-warning)] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
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
              border border-borderDefault
              rounded-lg
              p-4
            "
            >
              <div className="flex flex-col gap-1">
                <h2 className="font-medium text-textPrimary">
                  Folder permanently deleted or access revoked
                </h2>
                <p className="text-textSecondary text-md">
                  If the folder was deleted permanently or access was removed,
                  you can safely return to Home.
                </p>
              </div>

              <button
                onClick={() => navigate("/directory", { replace: true })}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[160px] px-5 py-2 rounded-md bg-(--color-accentPrimary) text-white hover:bg-accentHover transition-all duration-200 cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]"
              >
                <MdHome className="text-lg" />
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary font-google font-medium">
      <ModalsDiv
        showCreateFolder={showCreateFolder}
        setCreateFolder={setCreateFolder}
        folderID={dirID}
        handleDirectoryDetails={handleDirectoryDetails}
      />

      {/* USER SETTINGS OVERLAY */}
      <div
        className={`fixed inset-0 z-20 bg-black/70 transition-opacity ${openSettings ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <Menu />
      </div>

      <div className="flex flex-col gap-3 p-3 sm:p-4">
        <CompNavbar />

        {/* PATH */}
        <div className="w-[95%] sm:max-w-7xl mx-auto px-3 h-10 flex items-center rounded-md bg-bgSecondary border border-borderDefault overflow-x-auto custom-scrollbar">
          {directoryDetails.path.map((p) => (
            <div key={p.id} className="flex items-center">
              <button
                onClick={() => navigate(`/directory/${p.id}`)}
                className="truncate max-w-35 capitalize hover:underline cursor-pointer text-md hover:text-accentFocus transition-colors"
                title={p.name}
              >
                {p.name.includes("root") ? p.name.split("-")[0] : p.name}
              </button>
              <IoArrowForward className="text-textDisabled mx-1 text-md" />
            </div>
          ))}
        </div>

        {/* ACTION BAR */}
        <div className="w-[95%] sm:max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setCreateFolder(true)}
            className="flex-1 py-2 px-4 sm:h-10 sm:py-0 rounded-md border border-borderHover bg-bgSecondary hover:bg-bgElevated cursor-pointer flex items-center justify-center gap-2 transition-colors"
          >
            <FaFolderPlus className="text-lg text-accentPrimary" />
            <span className="text-md font-medium">Create Folder</span>
          </button>

          <label className="flex-1 py-2 px-4 sm:h-10 sm:py-0 rounded-md border border-borderHover bg-bgSecondary hover:bg-bgElevated cursor-pointer flex items-center justify-center gap-2 transition-colors">
            <FaCloudUploadAlt className="text-lg text-info" />
            <span className="text-md font-medium">Upload Files</span>
            <input
              type="file"
              multiple
              onChange={handleFilesUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* SEARCH + SORT */}
        <div className="w-[95%] sm:max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* SEARCH */}
          <div className="flex-1 py-2 px-4 sm:h-10 sm:py-0 rounded-md border border-borderHover bg-bgSecondary flex items-center gap-2">
            <FaSearch className="text-textDisabled text-md shrink-0" />
            <input
              type="text"
              placeholder="Search files or folders"
              disabled={
                userDetails.role === "BASIC" && userDetails.roleCode === 1
              }
              className="w-full bg-transparent outline-none text-md placeholder-textDisabled disabled:cursor-not-allowed"
            />
          </div>

          {/* SORT */}
          <div className="flex-1 py-2 px-4 sm:h-10 sm:py-0 rounded-md border border-borderHover bg-bgSecondary flex items-center gap-2">
            <FaFilter className="text-textSecondary text-md shrink-0" />
            <select
              disabled={
                userDetails.role === "BASIC" && userDetails.roleCode === 1
              }
              className="w-full bg-bgSecondary text-textPrimary rounded px-3 sm:px-2 sm:py-1.5 outline-none cursor-pointer text-md focus:border-borderActive focus:ring-1 focus:ring-accentFocus text-center font-medium disabled:cursor-not-allowed disabled:text-textDisabled"
            >
              <option className="bg-bgSecondary text-textPrimary font-medium">
                Name (A–Z)
              </option>
              <option className="bg-bgSecondary text-textPrimary font-medium">
                Name (Z–A)
              </option>
              <option className="bg-bgSecondary text-textPrimary font-medium">
                Size
              </option>
              <option className="bg-bgSecondary text-textPrimary font-medium">
                Last Modified
              </option>
            </select>
          </div>
        </div>

        {/* //* GROUP MOVE && GROUP DELETE */}
        <div className="w-[95%] sm:max-w-7xl mx-auto flex flex-row justify-between items-center py-2 px-4 sm:py-3 rounded-md bg-bgSecondary border border-borderDefault">
          <div className="flex gap-5 sm:gap-3 items-center">
            <button
              disabled={
                userDetails.role === "BASIC" && userDetails.roleCode === 1
              }
              className="text-2xl sm:text-xl text-textSecondary hover:text-accentFocus cursor-pointer transition-colors disabled:cursor-not-allowed disabled:text-textDisabled"
              title="Move the file to different folders !"
            >
              <MdOutlineDriveFileMove />
            </button>
            <button
              disabled={
                userDetails.role === "BASIC" && userDetails.roleCode === 1
              }
              className="text-xl sm:text-lg text-textSecondary hover:text-error cursor-pointer transition-colors disabled:cursor-not-allowed disabled:text-textDisabled"
              title="Delete"
            >
              <IoTrashBin />
            </button>
          </div>

          <div className="flex gap-6 sm:gap-4 items-center text-base text-textSecondary">
            <span className="flex items-center gap-2">
              <FaFolder className="text-accentPrimary text-lg sm:text-md" />
              <span className="font-medium">
                {directoryDetails.foldersCount}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <FaFile className="text-info text-lg sm:text-md" />
              <span className="font-medium">{directoryDetails.filesCount}</span>
            </span>
          </div>
        </div>

        {loading ? (
          <DirectoryShimmer />
        ) : (
          <div>
            {directoryDetails.foldersCount === 0 &&
              directoryDetails.filesCount === 0 &&
              !isUploading && <EmptyDirectory />}

            <div className="w-[95%] sm:max-w-7xl mx-auto flex flex-col gap-2">
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
                  userDetails={userDetails}
                  handleDirectoryDetails={handleDirectoryDetails}
                  handleUserStorageDetails={handleUserStorageDetails}
                />
              ))}
            </div>
          </div>
        )}

        {isUploading &&
          uploadFilesList.map((file) => <UploadFile key={file.id} {...file} />)}
      </div>
    </div>
  );
}

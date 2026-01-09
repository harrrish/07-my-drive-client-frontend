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
import { MdDelete } from "react-icons/md";
import { MdOutlineDriveFileMove } from "react-icons/md";

export default function PageDirectoryView() {
  const { dirID } = useParams();
  const navigate = useNavigate();
  const [showCreateFolder, setCreateFolder] = useState(false);
  const { setError } = useContext(ErrorContext);
  const { setUpdate } = useContext(UpdateContext);
  const { setUserStorage } = useContext(UserStorageContext);
  const { directoryDetails, setDirectoryDetails } =
    useContext(DirectoryContext);
  const { userView } = useContext(UserSettingViewContext);

  const [loading, setLoading] = useState(true);

  //* ==========> FETCHING USER STORAGE DETAILS
  const handleUserStorageDetails = useCallback(async () => {
    try {
      const { data } = await axiosWithCreds.get(`/user/storage-details`, {
        withCredentials: true,
      });
      setUserStorage((prev) => ({
        ...prev, // ✅ proper object spread syntax
        size: data?.size || 0,
        maxStorageInBytes: data?.maxStorageInBytes || 0,
      }));
    } catch (error) {
      const msg = "Failed to fetch storage info";
      axiosError(error, navigate, setError, msg);
    }
  }, [setUserStorage, navigate, setError]);

  //* ==========> FETCHING DIRECTORY DETAILS
  const handleDirectoryDetails = useCallback(
    async (dirID) => {
      try {
        const { data } = await axiosWithCreds.get(`/directory/${dirID || ""}`);
        console.log({ data });
        setDirectoryDetails((prev) => ({
          ...prev,
          ...data,
          path: Array.isArray(data?.path) ? data.path : [],
          folders: Array.isArray(data?.folders) ? data.folders : [],
          files: Array.isArray(data?.files) ? data.files : [],
          filesCount:
            typeof data?.filesCount === "number" ? data.filesCount : 0,
          foldersCount:
            typeof data?.foldersCount === "number" ? data.foldersCount : 0,
        }));

        handleUserStorageDetails();
      } catch (error) {
        const msg = "Failed to fetch folder content";
        axiosError(error, navigate, setError, msg);
      } finally {
        setLoading(false);
      }
    },
    [setDirectoryDetails, setError, handleUserStorageDetails, navigate],
  );

  const [uploadFilesList, setUploadFilesList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFilesUpload(event) {
    if (isUploading) {
      setError((prev) => [...prev, "Upload in progress, Please wait"]);
      setTimeout(() => setError((prev) => prev.slice(1)), 3000);
      event.target.value = "";
    } else {
      const filesList = event.target.files;
      if (filesList < 1) return;
      setIsUploading(true);
      const uploadFilesList = Array.from(filesList).map((file) => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        id: crypto.randomUUID(),
        isUploading: true,
        progress: 0,
      }));
      // console.log({ uploadFilesList });
      setUploadFilesList(uploadFilesList);

      for await (const listItem of uploadFilesList) {
        const { status, fileID, uploadSignedUrl } = await uploadSingleFile(
          listItem,
          dirID,
          navigate,
          setError,
        );
        if (status === 200) {
          await startSingleUpload(
            dirID,
            listItem,
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
      event.target.value = "";
      setIsUploading(false);
    }
  }

  useEffect(() => {
    handleDirectoryDetails(dirID);
  }, [handleDirectoryDetails, dirID]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bgPrimary)]">
        <div className="w-10 h-10 border-4 border-[var(--color-borderHover)] border-t-[var(--color-accentPrimary)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bgPrimary)] text-[var(--color-textPrimary)] font-google relative">
      <ModalsDiv
        showCreateFolder={showCreateFolder}
        setCreateFolder={setCreateFolder}
        folderID={dirID}
        handleDirectoryDetails={handleDirectoryDetails}
      />

      {/* USER SETTINGS OVERLAY */}
      <div
        className={`fixed inset-0 z-20 bg-black/70 transition-all duration-300 ${
          userView ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <UserSettings />
      </div>

      <div className="flex flex-col gap-3">
        <CompNavbar />

        {/* PATH */}
        <div className="w-[95%] sm:max-w-3xl md:max-w-4xl mx-auto h-10 px-3 flex items-center overflow-x-auto rounded-md bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)]">
          {directoryDetails.path.map((p) => (
            <div key={p.id} className="flex items-center">
              <button
                onClick={() => navigate(`/directory/${p.id}`)}
                title={p.name}
                className="truncate max-w-[140px] capitalize text-sm hover:underline cursor-pointer"
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

          <label
            htmlFor="fileUpload"
            className="flex-1 h-10 rounded-md border border-[var(--color-borderHover)] bg-[var(--color-bgSecondary)] hover:bg-[var(--color-bgElevated)] cursor-pointer flex items-center justify-center gap-2"
          >
            <FaFileUpload className="text-lg text-[var(--color-info)]" />
            Upload Files
            <input
              id="fileUpload"
              type="file"
              multiple
              onChange={handleFilesUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* EMPTY STATE */}
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
              handleUserStorageDetails={handleUserStorageDetails}
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

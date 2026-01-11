import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdSave, MdOutlineInfo } from "react-icons/md";
import { FaFolder, FaRegStar } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import ModalFolderDetails from "../modals/ModalFolderDetails";
import { calSize } from "../utils/CalculateFileSize";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { MdOutlineAutoDelete } from "react-icons/md";

import {
  ErrorContext,
  FolderIDContext,
  UpdateContext,
  UserSettingViewContext,
} from "../utils/Contexts";
import { FaStar } from "react-icons/fa6";

export default function CompFolderItem({
  createdAt,
  filesCount,
  foldersCount,
  name,
  parentFID,
  size,
  updatedAt,
  isStarred,
  isTrashed,
  _id,
  handleDirectoryDetails,
}) {
  const navigate = useNavigate();
  const { setFolderID } = useContext(FolderIDContext);
  const { setError } = useContext(ErrorContext);
  const { setUpdate } = useContext(UpdateContext);
  const { setUserView } = useContext(UserSettingViewContext);

  const [rename, setRename] = useState(false);
  const [directoryName, setDirectoryName] = useState(name);
  const [folderDetails, setFolderDetails] = useState(false);

  async function handleRenameFolder() {
    if (!directoryName.trim()) {
      setError((prev) => [...prev, "Please provide a valid folder name"]);
      setTimeout(() => setError((prev) => prev.slice(1)), 3000);
      return;
    }

    try {
      const { data, status } = await axiosWithCreds.patch(
        `/directory/rename/${_id || ""}`,
        { folderName: directoryName },
      );

      if (status === 201) {
        setFolderID(parentFID);
        handleDirectoryDetails(parentFID);
        setRename(false);
      }

      setUpdate((prev) => [...prev, data.message]);
      setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  async function handleStarFolder() {
    const val = !isStarred ? "add" : "remove";
    try {
      const { data, status } = await axiosWithCreds.patch(
        `/star/${val}/folder/${_id}`,
      );
      if (status === 201) {
        console.log(data.message);
        handleDirectoryDetails(parentFID);
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  async function handleTrashFolder() {
    const val = !isTrashed ? "move" : "remove";
    try {
      const { data, status } = await axiosWithCreds.patch(
        `/trash/${val}/folder/${_id}`,
      );
      // console.log(data, status);
      if (status === 201) {
        console.log(data.message);
        handleDirectoryDetails(parentFID);
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  return (
    <>
      {/* FOLDER DETAILS MODAL */}
      {folderDetails && (
        <ModalFolderDetails
          setFolderDetails={setFolderDetails}
          fileCount={filesCount}
          DirCount={foldersCount}
          createdAt={createdAt}
          updatedAt={updatedAt}
          name={name}
          size={size}
        />
      )}

      <div
        title={`Size: ${calSize(size)}`}
        className="
          flex justify-between items-center
          px-3 py-2
          rounded-md
          border border-[var(--color-borderDefault)]
          bg-[var(--color-bgSecondary)]
          hover:bg-[var(--color-bgElevated)]
          transition-all duration-200
        "
      >
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 w-[70%]">
          <input
            type="checkbox"
            className="scale-110 cursor-pointer accent-[var(--color-accentPrimary)]"
            onChange={(e) => {
              if (e.target.checked) {
                console.log(`Checked, Folder ID: ${_id}`);
              } else {
                console.log(`Unchecked, Folder ID: ${_id}`);
              }
            }}
          />

          <button className="cursor-pointer" onClick={handleStarFolder}>
            {isStarred ? (
              <FaStar className="text-[var(--color-success)]" />
            ) : (
              <FaRegStar className="text-[var(--color-textDisabled)]" />
            )}
          </button>

          {rename ? (
            <div className="flex items-center gap-2 w-full">
              <FaFolder className="text-[var(--color-warning)]" />
              <input
                value={directoryName}
                onChange={(e) => setDirectoryName(e.target.value)}
                autoFocus
                className="
                  w-full px-2 py-1 rounded-md
                  bg-[var(--color-bgPrimary)]
                  border border-[var(--color-borderHover)]
                  focus:outline-none
                  focus:ring-2 focus:ring-[var(--color-accentFocus)]
                "
              />
              <button
                onClick={handleRenameFolder}
                className="cursor-pointer text-[var(--color-success)]"
              >
                <MdSave />
              </button>
            </div>
          ) : (
            <Link
              to={`/directory/${_id}`}
              title={name}
              className="
                flex items-center gap-2
                truncate capitalize
                cursor-pointer
                hover:underline
                w-full
              "
            >
              <FaFolder className="text-[var(--color-warning)]" />
              <span className="truncate">{name}</span>
            </Link>
          )}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 w-[30%] justify-end">
          <button
            onClick={() => setFolderDetails(true)}
            className="cursor-pointer hover:text-[var(--color-info)]"
          >
            <MdOutlineInfo />
          </button>

          <button
            onClick={() => {
              setRename((prev) => !prev);
              setUserView(false);
            }}
            className="cursor-pointer hover:text-[var(--color-warning)]"
          >
            {rename ? <GiCancel /> : <MdOutlineDriveFileRenameOutline />}
          </button>

          <button
            onClick={handleTrashFolder}
            className="cursor-pointer hover:text-[var(--color-error)]"
          >
            <MdOutlineAutoDelete />
          </button>
        </div>
      </div>
    </>
  );
}

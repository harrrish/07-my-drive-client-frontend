import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineInfo,
  MdSave,
  MdOutlineDriveFileRenameOutline,
  MdOutlineAutoDelete,
  MdBlock,
} from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { FaDownload } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import CompFileIcon from "./FileIcon";
import ModalFileDetails from "../modals/ModalFileDetails";
import { calSize } from "../utils/CalculateFileSize";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { fileTypes } from "../utils/FileTypes";
import { TbEyeCancel } from "react-icons/tb";
import ShareFile from "../modals/ShareFile";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function CompFileItem({
  _id,
  name,
  extension,
  size,
  createdAt,
  updatedAt,
  parentFID,
  basename,
  isStarred,
  isTrashed,
  sharedWith,
  handleDirectoryDetails,
  handleUserStorageDetails,
}) {
  const navigate = useNavigate();
  const [rename, setRename] = useState(false);
  const [itemName, setItemName] = useState(basename);
  const [fileDetails, setFileDetails] = useState(false);

  const [share, setShare] = useState(false);
  const [sharedLink, setSharedLink] = useState(null);

  const { setUpdate } = useContext(UpdateContext);
  const { setError } = useContext(ErrorContext);

  async function handleFileRename() {
    if (!itemName.trim()) {
      setError((prev) => [...prev, "Please provide a valid file name"]);
      setTimeout(() => setError((prev) => prev.slice(1)), 3000);
      return;
    }

    try {
      const { data, status } = await axiosWithCreds.patch(
        `/file/rename/${_id}`,
        {
          newName: `${itemName}${extension}`,
          basename: itemName,
        },
      );

      if (status === 201) {
        handleDirectoryDetails(parentFID);
        handleUserStorageDetails();
        setRename(false);
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  async function handleFileStar() {
    const val = !isStarred ? "add" : "remove";
    try {
      const { data, status } = await axiosWithCreds.patch(
        `/star/${val}/file/${_id}`,
      );
      if (status === 201) {
        handleDirectoryDetails(parentFID);
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  async function handleFileTrash() {
    const val = !isTrashed ? "move" : "remove";
    try {
      const { data, status } = await axiosWithCreds.patch(
        `/trash/${val}/file/${_id}`,
      );
      if (status === 201) {
        handleDirectoryDetails(parentFID);
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  async function handleShareFile() {
    try {
      const { data, status } = await axiosWithCreds.get(
        `/share/file/url/${_id}`,
      );
      if (status === 200) {
        setShare(true);
        setSharedLink(data.message);
        // setUpdate((prev) => [...prev, data.message]);
        // setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  return (
    <>
      {/* FILE DETAILS MODAL */}
      {fileDetails && (
        <ModalFileDetails
          setFileDetails={setFileDetails}
          name={name}
          size={size}
          extension={extension}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      )}

      {share && (
        <ShareFile
          setShare={setShare}
          sharedLink={sharedLink}
          name={name}
          parentFID={parentFID}
          handleDirectoryDetails={handleDirectoryDetails}
          _id={_id}
        />
      )}

      <div
        title={`Name: ${name}\nSize: ${calSize(size)}\nCreated: ${new Date(
          createdAt,
        ).toLocaleString()}`}
        className="
          group flex items-center justify-between
          px-3 py-2.5
          rounded-lg
          border border-[var(--color-borderDefault)]
          bg-[var(--color-bgSecondary)]
          hover:bg-[var(--color-bgElevated)]
          hover:border-[var(--color-borderHover)]
          transition-all duration-150
        "
      >
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <input
            type="checkbox"
            className="
              scale-110 cursor-pointer
              accent-[var(--color-accentPrimary)]
            "
          />

          <button
            onClick={handleFileStar}
            className="cursor-pointer"
            title={isStarred ? "Unstar" : "Star"}
          >
            {isStarred ? (
              <FaStar className="text-[var(--color-success)]" />
            ) : (
              <FaRegStar className="text-[var(--color-textDisabled)] group-hover:text-[var(--color-textSecondary)]" />
            )}
          </button>

          {rename ? (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <CompFileIcon ext={extension} />

              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                autoFocus
                className="
                  w-full px-2 py-1 text-sm
                  rounded-md
                  bg-[var(--color-bgPrimary)]
                  border border-[var(--color-borderHover)]
                  text-[var(--color-textPrimary)]
                  focus:outline-none
                  focus:ring-2 focus:ring-[var(--color-accentFocus)]
                "
              />

              <button
                onClick={handleFileRename}
                className="cursor-pointer text-[var(--color-success)] hover:scale-110 transition"
                title="Save"
              >
                <MdSave />
              </button>
            </div>
          ) : (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `${baseURL}/file/${_id}?action=view`,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
              title={basename}
              className="
                flex items-center gap-2 min-w-0
                truncate cursor-pointer
                text-sm
                text-[var(--color-textPrimary)]
                hover:underline
              "
            >
              <CompFileIcon ext={extension} />
              <span className="truncate">{basename}</span>
            </Link>
          )}
        </div>

        {/* PREVIEW DISABLED */}
        {!fileTypes.includes(extension) && (
          <span
            className="text-[var(--color-textDisabled)] mx-2"
            title="Preview not available, File format not supported !"
          >
            <TbEyeCancel />
          </span>
        )}

        {/* RIGHT ACTIONS */}
        <div
          className="
            flex items-center gap-3
            text-[var(--color-textSecondary)]
            opacity-40 group-hover:opacity-100
            transition-opacity duration-150
          "
        >
          <button
            onClick={() => setFileDetails(true)}
            className="cursor-pointer hover:text-[var(--color-info)]"
            title="File details"
          >
            <MdOutlineInfo />
          </button>

          <button
            onClick={handleShareFile}
            className="cursor-pointer hover:text-[var(--color-info)]"
            title="Share"
          >
            <IoMdShare />
          </button>

          <a
            href={`${baseURL}/file/${_id}?action=download`}
            className="cursor-pointer hover:text-[var(--color-success)]"
            title="Download"
          >
            <FaDownload />
          </a>

          <button
            onClick={() => setRename((prev) => !prev)}
            className="cursor-pointer hover:text-[var(--color-warning)]"
            title={rename ? "Cancel rename" : "Rename"}
          >
            {rename ? <GiCancel /> : <MdOutlineDriveFileRenameOutline />}
          </button>

          {sharedWith.length > 0 ? (
            <span title="Shared File cannot be Deleted !">
              <MdBlock />
            </span>
          ) : (
            <button
              onClick={handleFileTrash}
              className="cursor-pointer hover:text-[var(--color-error)]"
              title="Move to trash"
            >
              <MdOutlineAutoDelete />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

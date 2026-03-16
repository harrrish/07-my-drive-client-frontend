import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdBlock } from "react-icons/md";

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import CompFileIcon from "./FileIcon";
import ModalFileDetails from "../modals/ModalFileDetails";
import { calSize } from "../utils/CalculateFileSize";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { fileTypes } from "../utils/FileTypes";
import ShareFile from "../modals/ShareFile";
import {
  FaEyeSlash,
  FaTrashAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import {
  IoInformationCircle,
  IoShareSocial,
  IoCloudDownload,
} from "react-icons/io5";

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
  sharedTo,
  handleDirectoryDetails,
  handleUserStorageDetails,
  userDetails,
}) {
  const navigate = useNavigate();
  const [rename, setRename] = useState(false);
  const [itemName, setItemName] = useState(basename);
  const [fileDetails, setFileDetails] = useState(false);

  const [share, setShare] = useState(false);
  const [sharedLink, setSharedLink] = useState(null);

  const { setUpdate } = useContext(UpdateContext);
  const { setError } = useContext(ErrorContext);

  // console.log(userDetails);

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
        title={`Name: ${name}\nSize: ${calSize(size)}\nCreated: ${new Date(createdAt).toLocaleString()}`}
        className="group flex items-center justify-between px-3 py-2.5 rounded-lg border border-borderDefault bg-bgSecondary hover:bg-bgElevated hover:border-borderHover transition-colors duration-150"
      >
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <input
            type="checkbox"
            className="scale-110 cursor-pointer accent-accentPrimary"
          />

          <button
            onClick={handleFileStar}
            className="cursor-pointer"
            title={isStarred ? "Unstar" : "Star"}
          >
            {isStarred ? (
              <FaStar className="text-success" />
            ) : (
              <FaRegStar className="text-textDisabled group-hover:text-textSecondary" />
            )}
          </button>

          {rename ? (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <CompFileIcon ext={extension} />
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                autoFocus
                className="w-full px-2 py-1.5 text-md rounded-md bg-bgPrimary border border-borderHover text-textPrimary focus:outline-none focus:border-accentFocus focus:ring-1 focus:ring-accentFocus/30"
              />
              <button
                onClick={handleFileRename}
                className="cursor-pointer text-success hover:text-accentFocus transition-colors"
                title="Save"
              >
                <FaSave />
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
              className="flex items-center gap-2 min-w-0 truncate cursor-pointer text-md text-textPrimary hover:text-accentFocus hover:underline transition-colors"
            >
              <CompFileIcon ext={extension} />
              <span className="truncate">{basename}</span>
            </Link>
          )}
        </div>

        {/* PREVIEW DISABLED */}
        {!fileTypes.includes(extension) && (
          <span
            className="text-textDisabled mx-2"
            title="Preview not available, File format not supported !"
          >
            <FaEyeSlash />
          </span>
        )}

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 text-textSecondary opacity-40 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => setFileDetails(true)}
            className="cursor-pointer hover:text-info transition-colors"
            title="File details"
          >
            <IoInformationCircle />
          </button>

          <button
            disabled={Number(userDetails.roleCode) < 2}
            onClick={handleShareFile}
            className="cursor-pointer hover:text-info transition-colors disabled:text-textDisabled disabled:cursor-not-allowed"
            title="Share"
          >
            <IoShareSocial />
          </button>

          <a
            href={`${baseURL}/file/${_id}?action=download`}
            className="cursor-pointer hover:text-success transition-colors"
            title="Download"
          >
            <IoCloudDownload />
          </a>

          <button
            onClick={() => setRename((prev) => !prev)}
            className="cursor-pointer hover:text-warning transition-colors"
            title={rename ? "Cancel rename" : "Rename"}
          >
            {rename ? <FaTimes /> : <FaEdit />}
          </button>

          {sharedTo.length > 0 ? (
            <span
              className="cursor-not-allowed text-textDisabled"
              title="Shared File cannot be Deleted !"
            >
              <MdBlock />
            </span>
          ) : (
            <button
              onClick={handleFileTrash}
              className="cursor-pointer hover:text-error transition-colors"
              title="Move to trash"
            >
              <FaTrashAlt />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

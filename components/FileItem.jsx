import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineInfo,
  MdSave,
  MdDelete,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { FaDownload } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";

import CompFileIcon from "./FileIcon";
import ModalFileDetails from "../modals/ModalFileDetails";
import { calSize } from "../utils/CalculateFileSize";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";

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
  handleDirectoryDetails,
  handleUserStorageDetails,
}) {
  const navigate = useNavigate();
  const [rename, setRename] = useState(false);
  const [itemName, setItemName] = useState(basename);
  const [fileDetails, setFileDetails] = useState(false);

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
        `/file/${_id || ""}`,
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
      axiosError(error, navigate, setError, "Failed to rename file");
    }
  }

  async function handleFileDelete() {
    try {
      const { data, status } = await axiosWithCreds.delete(
        `/file/${_id || ""}`,
      );

      if (status === 201) {
        handleDirectoryDetails(parentFID);
        setRename(false);
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Failed to delete file");
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

      <div
        title={`Name: ${name}\nSize: ${calSize(size)}\nCreated: ${new Date(
          createdAt,
        ).toLocaleString()}`}
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
          />

          <FaRegStar className="text-[var(--color-textDisabled)]" />

          {rename ? (
            <div className="flex items-center gap-2 w-full">
              <CompFileIcon ext={extension} />
              <input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
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
                onClick={handleFileRename}
                className="cursor-pointer text-[var(--color-success)]"
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
                flex items-center gap-2
                truncate cursor-pointer
                hover:underline
                w-full
              "
            >
              <CompFileIcon ext={extension} />
              <span className="truncate">{basename}</span>
            </Link>
          )}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 w-[30%] justify-end">
          <button
            onClick={() => setFileDetails(true)}
            className="cursor-pointer hover:text-[var(--color-info)]"
            title="File details"
          >
            <MdOutlineInfo />
          </button>

          <button
            onClick={() => console.log(`Share: ${_id} | ${name}`)}
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

          <button
            onClick={handleFileDelete}
            className="cursor-pointer hover:text-[var(--color-error)]"
            title="Delete"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </>
  );
}

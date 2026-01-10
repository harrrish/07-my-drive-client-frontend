import { NavLink, useNavigate } from "react-router-dom";
import { MdStar, MdHome } from "react-icons/md";
import { useCallback, useContext, useEffect, useState } from "react";
import { axiosError, axiosWithCreds } from "../utils/AxiosInstance";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import { FaRegStar, FaStar } from "react-icons/fa6";
import Shimmer from "../components/Shimmer";

export default function Starred() {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { setUpdate } = useContext(UpdateContext);

  const [foldersList, setFoldersList] = useState([]);
  const [foldersCount, setFoldersCount] = useState(0);
  const [filesList, setFilesList] = useState([]);
  const [filesCount, setFilesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchStarredItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axiosWithCreds.get(`/starred`);
      setFoldersList(data.folders || []);
      setFilesList(data.files || []);
      setFoldersCount(data.foldersCount || 0);
      setFilesCount(data.filesCount || 0);
    } catch (error) {
      axiosError(
        error,
        navigate,
        setError,
        "Failed to fetch starred contents !",
      );
    } finally {
      setLoading(false);
    }
  }, [navigate, setError]);

  async function handleStarFolder(_id, isStarred) {
    try {
      const { data, status } = await axiosWithCreds.patch(
        `/directory/star/${_id}`,
        { isStarred },
      );
      if (status === 201) {
        fetchStarredItems();
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  async function handleFileStar(_id, isStarred) {
    try {
      const { data, status } = await axiosWithCreds.patch(`/file/star/${_id}`, {
        isStarred,
      });
      if (status === 201) {
        fetchStarredItems();
        setUpdate((prev) => [...prev, data.message]);
        setTimeout(() => setUpdate((prev) => prev.slice(1)), 3000);
      }
    } catch (error) {
      axiosError(error, navigate, setError, "Something went wrong !");
    }
  }

  useEffect(() => {
    fetchStarredItems();
  }, [fetchStarredItems]);

  return (
    <div className="min-h-screen bg-[var(--color-bgPrimary)] px-4 py-6 font-google text-[var(--color-textPrimary)]">
      <div className="w-full max-w-4xl mx-auto bg-[var(--color-bgSecondary)] border border-[var(--color-borderDefault)] rounded-xl shadow-xl p-5 sm:p-8 flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold">
            <MdStar className="text-[var(--color-warning)] text-3xl" />
            Starred
          </h1>

          <div className="flex gap-6 text-sm text-[var(--color-textSecondary)]">
            <span>
              Folders{" "}
              <strong className="text-[var(--color-textPrimary)]">
                {foldersCount}
              </strong>
            </span>
            <span>
              Files{" "}
              <strong className="text-[var(--color-textPrimary)]">
                {filesCount}
              </strong>
            </span>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-sm sm:text-base text-[var(--color-textSecondary)] max-w-2xl">
          Your starred files and folders for quick access in{" "}
          <span className="text-[var(--color-textPrimary)] font-medium">
            My-Drive
          </span>
          .
        </p>

        {/* CONTENT */}
        {loading ? (
          <Shimmer />
        ) : (
          <div className="flex flex-col gap-6">
            {/* FOLDERS */}
            {foldersList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm uppercase tracking-wide text-[var(--color-textSecondary)]">
                  Starred Folders
                </h2>

                {foldersList.map((f) => (
                  <div
                    key={f._id}
                    className="
                      flex items-center justify-between
                      px-4 py-2 rounded-md
                      bg-[var(--color-bgElevated)]
                      border border-[var(--color-borderDefault)]
                      hover:border-[var(--color-borderActive)]
                      transition
                    "
                  >
                    <span className="truncate w-[85%]">{f.name}</span>

                    <button
                      className="cursor-pointer text-lg"
                      onClick={() => handleStarFolder(f._id, f.isStarred)}
                      title="Un-star folder"
                    >
                      {f.isStarred ? (
                        <FaStar className="text-[var(--color-success)]" />
                      ) : (
                        <FaRegStar className="text-[var(--color-textDisabled)]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* FILES */}
            {filesList.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm uppercase tracking-wide text-[var(--color-textSecondary)]">
                  Starred Files
                </h2>

                {filesList.map((f) => (
                  <div
                    key={f._id}
                    className="flex items-center justify-between px-4 py-2 rounded-md bg-[var(--color-bgElevated)] border border-[var(--color-borderDefault)] hover:border-[var(--color-borderActive)] transition"
                  >
                    <span className="truncate w-[85%]">{f.name}</span>

                    <button
                      className="cursor-pointer text-lg"
                      onClick={() => handleFileStar(f._id, f.isStarred)}
                      title="Un-star file"
                    >
                      {f.isStarred ? (
                        <FaStar className="text-[var(--color-success)]" />
                      ) : (
                        <FaRegStar className="text-[var(--color-textDisabled)]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* EMPTY STATE */}
            {foldersList.length === 0 && filesList.length === 0 && (
              <div className="text-center py-12 text-sm text-[var(--color-textDisabled)]">
                No starred files or folders found.
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="pt-4 border-t border-[var(--color-borderDefault)] flex justify-end">
          <NavLink
            to="/directory"
            className="
              inline-flex items-center gap-2
              px-5 py-2 rounded-md
              bg-[var(--color-bgElevated)]
              border border-[var(--color-borderHover)]
              hover:bg-[var(--color-accentPrimary)]
              hover:border-[var(--color-borderActive)]
              transition
              cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accentFocus)]
            "
          >
            <MdHome className="text-lg" />
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

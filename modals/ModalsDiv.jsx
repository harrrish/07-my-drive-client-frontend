import { useContext } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import ModalCreateFolder from "./ModalCreateFolder";

export default function ModalsDiv({
  showCreateFolder,
  setCreateFolder,
  folderID,
  fetchDirectoryData,
  handleDirectoryDetails,
}) {
  const { error } = useContext(ErrorContext);
  const { update } = useContext(UpdateContext);

  return (
    <div className="relative z-40 font-google">
      {/* SUCCESS TOASTS */}
      {Array.isArray(update) &&
        update.map((u, index) => (
          <div
            key={index}
            style={{ bottom: `${index * 3 + 2}rem` }}
            className="fixed right-2 max-w-lg px-4 py-2 rounded-md shadow-lg border border-[var(--color-borderActive)] bg-[var(--color-bgElevated)]
              text-[var(--color-success)] text-sm animate-slide truncate font-medium"
          >
            {u}
          </div>
        ))}

      {/* ERROR TOASTS */}
      {Array.isArray(error) &&
        error.map((e, index) => (
          <div
            key={index}
            style={{ top: `${index * 3 + 4}rem` }}
            className="fixed right-2 max-w-lg px-4 py-2 rounded-md shadow-lg border border-[var(--color-error)] bg-[var(--color-bgElevated)] text-[var(--color-error)] text-sm animate-slide truncate font-medium"
          >
            {e}
          </div>
        ))}

      {/* CREATE FOLDER MODAL */}
      {showCreateFolder && (
        <ModalCreateFolder
          setCreateFolder={setCreateFolder}
          folderID={folderID}
          fetchDirectoryData={fetchDirectoryData}
          handleDirectoryDetails={handleDirectoryDetails}
        />
      )}
    </div>
  );
}

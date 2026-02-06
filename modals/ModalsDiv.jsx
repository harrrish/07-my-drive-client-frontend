import { useContext } from "react";
import { ErrorContext, UpdateContext } from "../utils/Contexts";
import ModalCreateFolder from "./ModalCreateFolder";
import { IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";

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
            className="fixed right-2 max-w-lg px-4 py-2.5 rounded-lg shadow-lg border border-success bg-linear-to-r from-success/10 to-bgElevated text-success text-sm animate-slide truncate font-medium flex items-center gap-2 backdrop-blur-sm z-50 mt-1"
          >
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-success/20">
                <IoCheckmarkCircle className="text-xl text-success" />
              </div>
              <span className="truncate font-semibold">{u}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-success to-accentFocus rounded-b-lg" />
          </div>
        ))}

      {/* ERROR TOASTS */}
      {Array.isArray(error) &&
        error.map((e, index) => (
          <div
            key={index}
            style={{ bottom: `${index * 3 + 2}rem` }}
            className="fixed left-2 max-w-lg px-4 py-2.5 rounded-lg shadow-lg border border-error bg-linear-to-r from-error/10 to-bgElevated text-error text-sm animate-slideFromLeft truncate font-medium flex items-center gap-2 backdrop-blur-sm z-50"
          >
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-error/20">
                <IoCloseCircle className="text-xl text-error" />
              </div>
              <span className="truncate font-semibold">{e}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-error to-warning rounded-b-lg" />
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

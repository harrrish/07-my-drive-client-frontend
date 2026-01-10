import { useState } from "react";
import { FolderNotFound } from "../utils/Contexts";

export function ErrorProvider({ children }) {
  const [folderNotFound, setFolderNotFound] = useState(false);

  return (
    <FolderNotFound.Provider value={{ folderNotFound, setFolderNotFound }}>
      {children}
    </FolderNotFound.Provider>
  );
}

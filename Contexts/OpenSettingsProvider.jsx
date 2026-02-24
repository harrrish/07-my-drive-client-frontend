import { useState } from "react";
import { UserSettingViewContext } from "../utils/Contexts";

export function OpenSettingsProvider({ children }) {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <UserSettingViewContext.Provider value={{ openSettings, setOpenSettings }}>
      {children}
    </UserSettingViewContext.Provider>
  );
}

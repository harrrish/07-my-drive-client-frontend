import { useState } from "react";
import { UserDetailsContext } from "../utils/Contexts";

export function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    email: "",
    maxStorageInBytes: 0,
    name: "",
    picture: "",
    role: "",
    size: 0,
  });

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

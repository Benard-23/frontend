import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider
export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

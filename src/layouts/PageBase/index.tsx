import React, { createContext, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

import "./styles.css";
import { UserType } from "../../types/User";
import { MockUserType } from "../../mocks/MockUser";

export interface ContextType { 
  userContext: [UserType | null, React.Dispatch<React.SetStateAction<UserType | null>>];
  accessTokenContext: [string, React.Dispatch<React.SetStateAction<string>>];
  isAuthContext: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  refreshTokenContext: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const UserContext = createContext<ContextType>({
  userContext: [null, () => {}],
  accessTokenContext: ["", () => {}],
  isAuthContext: [false, () => {}],
  refreshTokenContext: ["", () => {}],
});

const PageBase = () => {
  const [user, setUser] = useState<UserType | null>(MockUserType)
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const contextValue: ContextType = {
    userContext: [user, setUser],
    accessTokenContext: [accessToken, setAccessToken],
    isAuthContext: [isAuth, setIsAuth],
    refreshTokenContext: [refreshToken, setRefreshToken],
  };

  return (
    <UserContext.Provider value={contextValue}>
      <div className="page-base">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default PageBase;

export function useUser() {
  const ctx = useOutletContext<ContextType>()
  return ctx;
}

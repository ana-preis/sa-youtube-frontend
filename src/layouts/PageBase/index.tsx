import React, { createContext, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

import "./styles.css";
import { UserType } from "../../types/User";
import { MockUserType } from "../../mocks/MockUser";

export interface ContextType { 
  userContext: [UserType | null, React.Dispatch<React.SetStateAction<UserType | null>>];
  isAuthContext: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const UserContext = createContext<ContextType>({
  userContext: [null, () => {}],
  isAuthContext: [false, () => {}],
});

const PageBase = () => {
  const [user, setUser] = useState<UserType | null>(MockUserType)
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const contextValue: ContextType = {
    userContext: [user, setUser],
    isAuthContext: [isAuth, setIsAuth],
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

import React, { createContext, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

import "./styles.css";
import { UserType } from "../../types/User";

export interface ContextType { 
  userContext: [UserType | null, React.Dispatch<React.SetStateAction<UserType | null>>];
}

export const UserContext = createContext<ContextType>({
  userContext: [null, () => {}],
});

const PageBase = () => {
  const [user, setUser] = useState<UserType | null>(null)

  const contextValue: ContextType = {
    userContext: [user, setUser],
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

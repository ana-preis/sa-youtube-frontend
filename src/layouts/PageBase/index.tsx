import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

import "./styles.css";
import { UserType } from "../../types/User";

interface ContextType { 
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
}

const PageBase = () => {
  const [user, setUser] = useState<UserType | null>(null)
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <div className="page-base">
      <Header />
        <Outlet context = {{ user, setUser, accessToken, setAccessToken, isAuth, setIsAuth, refreshToken, setRefreshToken }}/>
      <Footer />
    </div>
  );
};

export default PageBase;

export function useUser() {
  return useOutletContext<ContextType>();
}

import React, { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

import "./styles.css";
import { UserType } from "../../types/User";
import { MockUserType } from "../../mocks/MockUser";

interface ContextType { 
  user: UserType | null;
}

const PageBase = () => {
  const [user, setUser] = useState<UserType | null>(MockUserType)

  return (
    <div className="page-base">
      <Header />
        <Outlet context = {{ user }}/>
      <Footer />
    </div>
  );
};

export default PageBase;

export function useUser() {
  return useOutletContext<ContextType>();
}

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

import "./styles.css";


const PageBase = () => {
  return (
    <div className="page-base">
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
};

export default PageBase;

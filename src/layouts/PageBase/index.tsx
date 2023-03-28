import React from "react";
import Footer from "../Footer";
import Header from "../Header";

import "./styles.css";

export interface PageBaseProps {
  children: React.ReactNode;
}

const PageBase = ({ children }: PageBaseProps) => {
  return (
    <div className="page-base">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageBase;

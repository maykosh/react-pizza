import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
   return (
      <div className="wrapper">
         <Header />
         <div className="content">{<Outlet />}</div>
      </div>
   );
};

export default AppLayout;

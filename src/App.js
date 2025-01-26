import React from "react";
import Header from "./components/header/Header";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
   // https://6769335fcbf3d7cefd39f0b3.mockapi.io/pizza/v1/pizza

   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <>
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="*" element={<NotFoundPage />} />
               </Routes>
            </>
         </div>
      </div>
   );
};

export default App;

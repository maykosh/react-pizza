import React from "react";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/layout/AppLayout";

const App: React.FC = () => {
   // https://6769335fcbf3d7cefd39f0b3.mockapi.io/pizza/v1/pizza

   return (
      <Routes>
         <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
         </Route>
      </Routes>
   );
};

export default App;

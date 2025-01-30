import React from "react";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./components/layout/AppLayout";
import { whitSuspense } from "./utils/whitSuspense";

const CartPageLazy = React.lazy(() => import(/* webpackChunkName: "CartPage" */ "./pages/CartPage"));
const NotFoundPageLazy = React.lazy(() => import(/* webpackChunkName: "NotFoundPage"  */ "./pages/NotFoundPage"));

const SuspensedCartPage = whitSuspense(CartPageLazy);
const SuspensedNotFoundPage = whitSuspense(NotFoundPageLazy);

const App: React.FC = () => {
   // https://6769335fcbf3d7cefd39f0b3.mockapi.io/pizza/v1/pizza

   return (
      <Routes>
         <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<SuspensedCartPage />} />
            <Route path="*" element={<SuspensedNotFoundPage />} />
         </Route>
      </Routes>
   );
};

export default App;

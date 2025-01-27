import React from "react";
import Cart from "../cart/Cart";
import CartSceleton from "../cart/CartSceleton";
import NotFound from "../notFound/NotFound";
import {  useSelector } from "react-redux";

const Main = () => {
   const { pizza, status } = useSelector((state) => state.pizza);

   const sceleton = Array.from({ length: 5 }, (_, i) => i);

   return (
      <>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {status === "loading" &&
               sceleton.map((i) => <CartSceleton key={i} />)}
            {status === "success" &&
               Array.isArray(pizza) &&
               pizza?.map((pizza) => <Cart pizza={pizza} key={pizza.id} />)}
            {pizza === "error" && <NotFound />}
         </div>
      </>
   );
};

export default Main;

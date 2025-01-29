import React from "react";
import Cart from "../cart/Cart";
import CartSceleton from "../cart/CartSceleton";
import NotFound from "../notFound/NotFound";
import { pizzaSelector } from "../../store/selectors/pizzaSelector";
import { useAppSelector } from "../../hooks/useAppSelector";

const Main = () => {
   const { pizza, status } = useAppSelector(pizzaSelector);

   const sceleton = Array.from({ length: 5 }, (_, i) => i);

   return (
      <>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {status === "loading" &&
               sceleton.map((i) => <CartSceleton key={i} />)}
            {status === "success" &&
               Array.isArray(pizza) &&
               pizza?.map((item) => <Cart item={item} key={item.id} />)}
            {status === "error" && <NotFound />}
         </div>
      </>
   );
};

export default Main;

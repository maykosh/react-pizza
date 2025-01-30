import React from "react";
import Cart from "../cart/Cart";
import CartSceleton from "../cart/CartSceleton";
import NotFound from "../notFound/NotFound";
import { IPizza } from "../../store/type";
import { Status } from "../../store/pizzaSlice/pizza-slice";
interface IProps {
   pizza: IPizza[];
   status: Status;
}

const Main: React.FC<IProps> = React.memo(({ pizza, status }) => {
   const sceleton = Array.from({ length: 5 }, (_, i) => i);

   return (
      <>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {status === Status.LOADING &&
               sceleton.map((i) => <CartSceleton key={i} />)}
            {status === Status.SUCCESS &&
               Array.isArray(pizza) &&
               pizza?.map((item) => <Cart item={item} key={item.id} />)}
            {status === Status.ERROR && <NotFound />}
         </div>
      </>
   );
});

export default Main;

import React from "react";
import Cart from "../cart/Cart";
import CartSceleton from "../cart/CartSceleton";
import NotFound from "../notFound/NotFound";
// import pizzas from "../../assets/db.json";
const Main = (props) => {
   const sceleton = Array.from({ length: 5 }, (_, i) => i);
   // debugger
   return (
      <>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {/* {!props.isLoading
               ? props.state?.map((pizza) => (
                    <Cart pizza={pizza} key={pizza.id} />
                 ))  
               : sceleton.map((i) => <CartSceleton key={i} />)} */}
            {props.isLoading && sceleton.map((i) => <CartSceleton key={i} />)}
            {!props.isLoading &&
               Array.isArray(props.state) &&
               props.state?.map((pizza) => (
                  <Cart pizza={pizza} key={pizza.id} />
               ))}
            {props.state === "Not found" && <NotFound />}
         </div>
      </>
   );
};

export default Main;

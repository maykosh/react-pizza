import { configureStore } from "@reduxjs/toolkit";
import { sortReducer } from "./slice/filter-slice";
import { pizzaReducer } from "./slice/pizza-slice";
import { cartReducer } from "./slice/cart-slice";

export const store = configureStore({
   reducer: {
      filter: sortReducer,
      pizza: pizzaReducer,
      cart: cartReducer,
   },
});

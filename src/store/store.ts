import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sortReducer } from "./slice/filter-slice";
import { pizzaReducer } from "./slice/pizza-slice";
import { cartReducer } from "./slice/cart-slice";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const combineReducer = combineReducers({
   filter: sortReducer,
   pizza: pizzaReducer,
   cart: cartReducer,
});

const cartItemPersistConfig: PersistConfig<RootState> = {
   key: "root",
   storage,
   whitelist: ["cart"] as (keyof RootState)[],
};
const persistedReducer = persistReducer(cartItemPersistConfig, combineReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof combineReducer>;
export type AppDispatch = typeof store.dispatch;

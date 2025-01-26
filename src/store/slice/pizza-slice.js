import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   pizza: [],
};

const pizzaSlice = createSlice({
   name: "pizza",
   initialState,
   reducers: {
      setPizza: (state, action) => void (state.pizza = action.payload),
   },
});
export const pizzaActions = pizzaSlice.actions;
export const pizzaReducer = pizzaSlice.reducer;

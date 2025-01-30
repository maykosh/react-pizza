import { createSlice } from "@reduxjs/toolkit";
import { IPizza } from "../type";
import { getPizzaThunk } from "../asyncActions/getPizzaThunk";

export enum Status {
   SUCCESS = "success",
   LOADING = "loading",
   ERROR = "error",
}

interface IPizzaSlice {
   pizza: IPizza[];
   status: Status;
}

const initialState: IPizzaSlice = {
   pizza: [],
   status: Status.LOADING,
};

const pizzaSlice = createSlice({
   name: "pizza",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getPizzaThunk.pending, (state) => {
            state.status = Status.LOADING;
            state.pizza = [];
         })
         .addCase(getPizzaThunk.fulfilled, (state, action) => {
            state.pizza = action.payload;
            state.status = Status.SUCCESS;
         })
         .addCase(getPizzaThunk.rejected, (state) => {
            state.status = Status.ERROR;
            state.pizza = [];
         });
   },
});
export const pizzaActions = pizzaSlice.actions;
export const pizzaReducer = pizzaSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPizzas } from "../../api/api";
import { IPizza } from "../type";

interface IAsyncThunkArg {
   category: number | string;
   sortBy: string;
   order: string;
   page: number;
   limit: number;
   search: string;
}

export enum Status {
   SUCCESS = "success",
   LOADING = "loading",
   ERROR = "error",
}

interface IPizzaSlice {
   pizza: IPizza[];
   status: Status;
}

// Типизация createAsyncThunk createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>()
export const fetchPizza = createAsyncThunk<IPizza[], IAsyncThunkArg>(
   "fetchPizza/pizza",
   async (params, ThunkApi) => {
      try {
         const data = await getPizzas(params);
         if (data.status !== 200) {
            throw new Error("network error");
         }
         return data.data;
      } catch (error) {
         return ThunkApi.rejectWithValue(
            error instanceof Error ? error.message : "Unknown error"
         );
      }
   }
);

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
         .addCase(fetchPizza.pending, (state) => {
            state.status = Status.LOADING;
            state.pizza = [];
         })
         .addCase(fetchPizza.fulfilled, (state, action) => {
            state.pizza = action.payload;
            state.status = Status.SUCCESS;
         })
         .addCase(fetchPizza.rejected, (state) => {
            state.status = Status.ERROR;
            state.pizza = [];
         });
   },
});
export const pizzaActions = pizzaSlice.actions;
export const pizzaReducer = pizzaSlice.reducer;

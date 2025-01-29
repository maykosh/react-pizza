import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPizzas } from "../../api/api";
import { IPizza } from "../type";

interface IAsyncThunkArg {
   category: number | string;
   sortProperty: string;
   type: string;
   page: number;
   limit: number;
   search: string;
}

type StatusType = "success" | "loading" | "error";

interface IPizzaSlice {
   pizza: IPizza[];
   status: StatusType;
}

// Типизация createAsyncThunk createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>()
export const fetchPizza = createAsyncThunk<IPizza[], IAsyncThunkArg>(
   "fetchPizza/pizza",
   async (params, ThunkApi) => {
      const { category, sortProperty, type, page, limit, search } = params;
      try {
         const data = await getPizzas(
            category,
            sortProperty,
            type,
            page,
            limit,
            search
         );
         if (data.status !== 200) {
            throw new Error("network error");
         }
         return data.data;
      } catch (error) {
         if (error instanceof Error) {
            return ThunkApi.rejectWithValue(error.message);
         }
      }
   }
);

const initialState: IPizzaSlice = {
   pizza: [],
   status: "loading",
};

const pizzaSlice = createSlice({
   name: "pizza",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizza.pending, (state) => {
            state.status = "loading";
            state.pizza = [];
         })
         .addCase(fetchPizza.fulfilled, (state, action) => {
            state.pizza = action.payload;
            state.status = "success";
         })
         .addCase(fetchPizza.rejected, (state) => {
            state.status = "error";
            state.pizza = [];
         });
   },
});
export const pizzaActions = pizzaSlice.actions;
export const pizzaReducer = pizzaSlice.reducer;

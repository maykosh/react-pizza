import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPizzas } from "../../api/api";

export const fetchPizza = createAsyncThunk(
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
         return ThunkApi.rejectWithValue(error.message);
      }
   }
);

const initialState = {
   pizza: [],
   status: "",
};

const pizzaSlice = createSlice({
   name: "pizza",
   initialState,
   reducers: {
      setPizza: (state, action) => void (state.pizza = action.payload),
   },
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

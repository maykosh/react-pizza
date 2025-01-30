import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPizza } from "../type";
import { getPizzas } from "../../api/api";

interface IAsyncThunkArg {
   category: number | string;
   sortBy: string;
   order: string;
   page: number;
   limit: number;
   search: string;
}

// Типизация createAsyncThunk createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>()
export const getPizzaThunk = createAsyncThunk<IPizza[], IAsyncThunkArg>(
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

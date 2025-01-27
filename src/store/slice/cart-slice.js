import { createSlice } from "@reduxjs/toolkit";
import { calculatePriceAndCount } from "../../utils/calculator";

const initialState = {
   totalPrice: 0,
   items: [],
   totalCount: 0
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addItem: (state, action) => {
        const findItem = state.items.find(obj => obj.id === action.payload.id);
        if(findItem){
            findItem.count++;
        }else{
            state.items.push({
                ...action.payload,
                count: 1
            });
        }
        state.totalPrice = calculatePriceAndCount(state.items).totalPrice
        state.totalCount = calculatePriceAndCount(state.items).totalCount
      },
      removeItem: (state, action) => {
         state.items = state.items.filter((obj) => obj.id !== action.payload);
         state.totalPrice = calculatePriceAndCount(state.items).totalPrice
         state.totalCount = calculatePriceAndCount(state.items).totalCount
      },
      clearItems: (state) => {
         state.items = [];
         state.totalCount = 0;
         state.totalPrice = 0
      },
      incItem: () => {
            
      }
   },
});
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

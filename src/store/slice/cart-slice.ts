import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatePriceAndCound } from "../../utils/calculator";
import { ICartItem, IItem } from "../type";
const initialState: IItem = {
   totalPrice: 0,
   items: [],
   totalCount: 0,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addItem: (state, action: PayloadAction<ICartItem>) => {
         const currentId = action.payload.selectTypes.selectId;
         const findItem = state.items.find(
            (obj) => obj.selectTypes.selectId === currentId
         );
         if (findItem) {
            findItem.count++;
            findItem.incDecPrice += findItem.price;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }
         updatePriceAndCound(state);
      },
      removeItem: (state, action: PayloadAction<ICartItem>) => {
         state.items = state.items.filter(
            (obj) =>
               obj.selectTypes.selectId !== action.payload.selectTypes.selectId
         );
         updatePriceAndCound(state);
      },
      clearItems: (state) => {
         state.items = [];
         state.totalCount = 0;
         state.totalPrice = 0;
      },
      decItem: (state, action: PayloadAction<ICartItem>) => {
         const currentId = action.payload.selectTypes.selectId;
         const findItem = state.items.find(
            (obj) => obj.selectTypes.selectId === currentId
         );
         if (findItem) {
            if (findItem.count === 1) {
               state.items = state.items.filter(
                  (obj) => obj.selectTypes.selectId !== currentId
               );
            } else {
               findItem.count--;
               findItem.incDecPrice -= findItem.price;
            }
         }
         updatePriceAndCound(state);
      },
   },
});
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

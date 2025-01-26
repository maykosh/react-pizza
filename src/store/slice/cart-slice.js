import { createSlice } from "@reduxjs/toolkit";

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
         state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price*obj.count, 0);
         state.totalCount = state.items.reduce((sum, obj) => obj.count+sum, 0);
      },
      removeItem: (state, action) => {
         state.items = state.items.filter((obj) => obj.id !== action.payload);
         state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price*obj.count, 0);
         state.totalCount = state.items.reduce((sum, obj) => obj.count+sum, 0);
      },
      clearItems: (state) => {
         state.items = [];
         state.totalCount = 0;
         state.totalPrice = 0
      },
   },
});
export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

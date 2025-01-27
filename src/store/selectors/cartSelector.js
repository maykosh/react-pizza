import { createSelector } from "@reduxjs/toolkit";

const getCart = (state) => state;
export const cartSelector = createSelector(getCart, (state) => state.cart);

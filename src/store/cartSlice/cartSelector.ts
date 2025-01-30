import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getCart = (state: RootState) => state;
export const cartSelector = createSelector(getCart, (state) => state.cart);

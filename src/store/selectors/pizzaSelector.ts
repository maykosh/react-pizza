import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getPizza = (state: RootState) => state;
export const pizzaSelector = createSelector(getPizza, (state) => state.pizza);

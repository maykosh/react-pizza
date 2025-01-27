import { createSelector } from "@reduxjs/toolkit";

const getPizza = (state) => state;
export const pizzaSelector = createSelector(getPizza, (state) => state.pizza);

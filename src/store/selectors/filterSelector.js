import { createSelector } from "@reduxjs/toolkit";

const getFilter = (state) => state;
export const filterSelector = createSelector(
   getFilter,
   (state) => state.filter
);

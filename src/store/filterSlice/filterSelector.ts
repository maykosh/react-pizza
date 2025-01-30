import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getFilter = (state: RootState) => state;
export const filterSelector = createSelector(
   getFilter,
   (state) => state.filter
);

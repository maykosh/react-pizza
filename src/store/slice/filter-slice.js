import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   sort: {
      name: "популярности",
      sortProperty: "rating",
   },
   ascDesc: {
      name: "по возрастанию",
      type: "asc",
   },
   categoryId: 0,
   currentPage: 1,
   searchValue: "",
};

const sortSlice = createSlice({
   name: "sort",
   initialState,
   reducers: {
      setCategoryId: (state, action) =>
         void (state.categoryId = action.payload),
      setSort: (state, action) => void (state.sort = action.payload),
      setAscDesc: (state, action) => void (state.ascDesc = action.payload),
      setSearchValue: (state, action) =>
         void (state.searchValue = action.payload),
      setFilters: (state, action) => {
         state.categoryId = Number(action.payload.categoryId);
         state.currentPage = Number(action.payload.currentPage);
         state.sort = action.payload.sort;
         state.ascDesc = action.payload.ascDesc;
      },
   },
});
export const filterActions = sortSlice.actions;
export const sortReducer = sortSlice.reducer;

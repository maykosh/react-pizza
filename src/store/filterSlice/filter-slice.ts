import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AscDescListType, ListType } from "../type";
interface ISort {
   sort: ListType;
   ascDesc: AscDescListType;
   categoryId: number | string;
   page: number;
   searchValue: string;
}
type setFilter = Omit<ISort, "categoryId"> & {
   category: number | string;
};
const initialState: ISort = {
   sort: {
      name: "популярности",
      sortProperty: "rating",
   },
   ascDesc: {
      name: "по возрастанию",
      type: "asc",
   },
   categoryId: 0,
   page: 1,
   searchValue: "",
};

const sortSlice = createSlice({
   name: "sort",
   initialState,
   reducers: {
      setCategoryId: (state, action: PayloadAction<string | number>) => {
         state.categoryId = action.payload;
      },
      setSort: (state, action: PayloadAction<ISort["sort"]>) => {
         state.sort = action.payload;
      },
      setAscDesc: (state, action: PayloadAction<ISort["ascDesc"]>) => {
         state.ascDesc = action.payload;
      },
      setSearchValue: (state, action: PayloadAction<ISort["searchValue"]>) => {
         state.searchValue = action.payload;
      },
      setFilters: (state, action: PayloadAction<setFilter>) => {
         if (Object.values(action.payload).length) {
            state.categoryId = Number(action.payload.category);
            state.page = Number(action.payload.page);
            state.sort = action.payload.sort;
            state.ascDesc = action.payload.ascDesc;
         } else {
            state.ascDesc = {
               name: "по возрастанию",
               type: "asc",
            };
            state.sort = {
               name: "популярности",
               sortProperty: "rating",
            };
            state.categoryId = 0;
            state.page = 1;
            state.searchValue = "";
         }
      },
      setPage: (state, action: PayloadAction<ISort["page"]>) => {
         state.page = action.payload;
      },
   },
});
export const filterActions = sortSlice.actions;
export const sortReducer = sortSlice.reducer;

import { CiCircleRemove } from "react-icons/ci";
import React, { useEffect } from "react";
import scss from "./search.module.scss";
import { filterActions } from "../../store/filterSlice/filter-slice";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Search = React.memo(() => {
   const filterAction = filterActions;
   const dispatch = useAppDispatch();

   const [search, setSearch] = React.useState("");

   const inputRef = React.useRef<HTMLInputElement>(null);

   const debounced = useDebounce<string, number>(search, 1000);

   const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
   };

   const onClickClear = () => {
      setSearch("");
      inputRef.current?.focus();
   };

   useEffect(() => {
      dispatch(filterAction.setSearchValue(debounced));
   }, [debounced]);

   return (
      <div className={scss.searchContainer}>
         <input
            ref={inputRef}
            className={scss.input}
            type="text"
            placeholder="Поиск пиццы..."
            value={search}
            onChange={(e) => onChangeSearch(e)}
         />

         <CiCircleRemove
            onClick={onClickClear}
            className={`${scss.removeIcon} ${!search ? scss.isVisibility : ""}`}
         />
      </div>
   );
});

export default Search;

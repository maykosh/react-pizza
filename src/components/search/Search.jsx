import { CiCircleRemove } from "react-icons/ci";
import React, { useEffect } from "react";
import scss from "./search.module.scss";
import { filterActions } from "../../store/slice/filter-slice";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const Search = () => {
   const filterAction = filterActions;
   const dispatch = useDispatch();

   const [search, setSearch] = React.useState("");

   const inputRef = React.useRef();

   const debounced = useDebounce(search, 1000);

   const onChangeSearch = (e) => {
      setSearch(e.target.value);
   };

   const onClickClear = () => {
      setSearch("");
      inputRef.current.focus();
   };

   useEffect(() => {
      dispatch(filterAction.setSearchValue(debounced));
   }, [dispatch, filterAction, debounced]);

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
};

export default Search;

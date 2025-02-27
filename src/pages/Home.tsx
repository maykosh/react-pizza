import React from "react";
import Categories from "../components/categories/Categories";
import Sort, { ascDescList, lists } from "../components/sort/Sort";
import Main from "../components/main/Main";
import Paginator from "../components/Paginator/Paginator";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { filterActions } from "../store/filterSlice/filter-slice";
import { filterSelector } from "../store/filterSlice/filterSelector";
import { useAppSelector } from "../hooks/useAppSelector";
import { AscDescListType, ListType } from "../store/type";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { pizzaSelector } from "../store/pizzaSlice/pizzaSelector";
import { getPizzaThunk } from "../store/asyncActions/getPizzaThunk";

const Home = () => {
   const isFilter = React.useRef(false);
   const isMounted = React.useRef(false);

   const { pizza, status } = useAppSelector(pizzaSelector);
   const { categoryId, sort, ascDesc, searchValue, page } =
      useAppSelector(filterSelector);
   const dispatch = useAppDispatch();
   const filterAction = filterActions;

   const navigate = useNavigate();

   const onClickCategory = React.useCallback((index: number) => {
      dispatch(filterAction.setCategoryId(index));
   }, []);

   const getPizza = () => {
      dispatch(
         getPizzaThunk({
            category:
               (typeof categoryId === "string" ? 0 : categoryId) > 0
                  ? categoryId
                  : "",
            sortBy: sort.sortProperty,
            order: ascDesc.type,
            page: page,
            limit: 4,
            search: searchValue,
         })
      );
   };

   React.useEffect(() => {
      if (isMounted.current) {
         const queryStr = qs.stringify({
            sortBy: sort.sortProperty,
            category:
               (typeof categoryId === "string" ? 0 : categoryId) > 0
                  ? categoryId
                  : "",
            page: page,
            order: ascDesc.type,
            limit: 4,
         });
         navigate(`?${queryStr}`);
      }
      isMounted.current = true;
   }, [ascDesc.type, categoryId, page, navigate, sort.sortProperty]);

   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));
         const sort = lists.find(
            (list) => list.sortProperty === params.sortBy
         ) as ListType;
         const ascDesc = ascDescList.find(
            (list) => list.type === params.order
         ) as AscDescListType;
         dispatch(
            filterAction.setFilters({
               page: 0,
               searchValue: "",
               category: "",
               ...params,
               sort,
               ascDesc,
            })
         );
         isFilter.current = true;
      }
   }, []);

   React.useEffect(() => {
      window.scrollTo(0, 0);
      if (!isFilter.current) {
         getPizza();
      }
      isFilter.current = false;
   }, [categoryId, sort, ascDesc, searchValue, page]);

   return (
      <div className="container">
         <div className="content__top">
            <Categories
               onClickCategory={onClickCategory}
               categoryId={categoryId}
            />
            <Sort sort={sort} ascDesc={ascDesc} />
         </div>
         <Main pizza={pizza} status={status} />
         <Paginator />
      </div>
   );
};

export default Home;

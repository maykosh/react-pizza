import React from "react";
import Categories from "../components/categories/Categories";
import Sort, { ascDescList, lists } from "../components/sort/Sort";
import Main from "../components/main/Main";
import Paginator from "../components/Paginator/Paginator";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizza } from "../store/slice/pizza-slice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { filterActions } from "../store/slice/filter-slice";
import { filterSelector } from "../store/selectors/filterSelector";

const Home = () => {
   const isFilter = React.useRef(false);
   const isMounted = React.useRef(false);

   const { categoryId, sort, ascDesc, searchValue, page } =
      useSelector(filterSelector);
   const dispatch = useDispatch();
   const filterAction = filterActions;

   const navigate = useNavigate();

   function getPizza() {
      dispatch(
         fetchPizza({
            category: categoryId > 0 ? categoryId : "",
            sortProperty: sort.sortProperty,
            type: ascDesc.type,
            page: page,
            limit: 4,
            search: searchValue,
         })
      );
   }

   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));
         const sort = lists.find((list) => list.sortProperty === params.sortBy);
         const ascDesc = ascDescList.find((list) => list.type === params.order);
         dispatch(
            filterAction.setFilters({
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

   React.useEffect(() => {
      if (isMounted.current) {
         const queryStr = qs.stringify({
            sortBy: sort.sortProperty,
            categoryId,
            page: page,
            order: ascDesc.type,
            limit: 4,
         });
         navigate(`?${queryStr}`);
      }
      isMounted.current = true;
   }, [ascDesc.type, categoryId, page, navigate, sort.sortProperty]);

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <Main />
         <Paginator />
      </div>
   );
};

export default Home;

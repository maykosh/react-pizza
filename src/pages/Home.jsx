import React from "react";
import Categories from "../components/categories/Categories";
import Sort, { ascDescList, lists } from "../components/sort/Sort";
import Main from "../components/main/Main";
import Paginator from "../components/Paginator/Paginator";
import { useDispatch, useSelector } from "react-redux";
import { getPizzas } from "../api/api";
import { pizzaActions } from "../store/slice/pizza-slice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { filterActions } from "../store/slice/filter-slice";

const Home = () => {
   const isFilter = React.useRef(false);
   const isMounted = React.useRef(false);

   const { categoryId, sort, ascDesc, searchValue } = useSelector(
      (state) => state.filter
   );
   const { pizza } = useSelector((state) => state.pizza);
   const dispatch = useDispatch();
   const pizzaAction = pizzaActions;
   const filterAction = filterActions;

   const [isLoading, setIsLoading] = React.useState(false);
   const [currentPage, setCurrentPage] = React.useState(1);

   const navigate = useNavigate();
   
   async function fetchPizzas() {
      setIsLoading(true);
      const data = await getPizzas(
         categoryId > 0 ? categoryId : "",
         sort.sortProperty,
         ascDesc.type,
         currentPage,
         4,
         searchValue
      );
      if (data.statusText === "OK") {
         dispatch(pizzaAction.setPizza(data.data));
         setIsLoading(false);
      }
   }

   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));
         const sort = lists.find(
            (list) => list.sortProperty === params.sortProperty
         );
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
         fetchPizzas();
      }
      isFilter.current = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [categoryId, sort, ascDesc, searchValue, currentPage]);

   React.useEffect(() => {
      if (isMounted.current) {
         const queryStr = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
            order: ascDesc.type,
         });
         navigate(`?${queryStr}`);
      }
      isMounted.current = true;
   }, [ascDesc.type, categoryId, currentPage, navigate, sort.sortProperty]);

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <Main state={pizza} isLoading={isLoading} />
         <Paginator
            onPageChange={setCurrentPage}
            itemsCount={pizza.length}
            currentPage={currentPage}
         />
      </div>
   );
};

export default Home;

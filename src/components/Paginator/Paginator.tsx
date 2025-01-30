import React, { useMemo, useState } from "react";
import scss from "./paginator.module.scss";
import { filterActions } from "../../store/filterSlice/filter-slice";
import { filterSelector } from "../../store/filterSlice/filterSelector";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Paginator = () => {
   const { page: currentPage } = useAppSelector(filterSelector);
   const filterAction = filterActions;
   const dispatch = useAppDispatch();

   const onPageChange = (page: number) => {
      dispatch(filterAction.setPage(page));
   };

   const [currentPortion, setCurrentPortion] = useState(1);
   let totalPages = 3;
   let portionSize = 3;

   const page = useMemo(
      () => Array.from({ length: totalPages }, (_, i) => i + 1),
      [totalPages]
   );

   const portionCount = Math.ceil(totalPages / portionSize);
   const portionLeftBorder = (currentPortion - 1) * portionSize + 1;
   const portionRightBorder = currentPortion * portionSize;

   const filterPage = useMemo(
      () =>
         page.filter((i) => i >= portionLeftBorder && i <= portionRightBorder),
      [page, portionLeftBorder, portionRightBorder]
   );
   const handlePrevious = () => {
      if (currentPortion > 1) {
         setCurrentPortion(currentPortion - 1);
         onPageChange(portionLeftBorder - portionSize);
      }
   };

   const handleNext = () => {
      if (currentPortion < portionCount) {
         setCurrentPortion(currentPortion + 1);
         onPageChange(portionRightBorder + 1);
      }
   };

   return (
      <div className={scss.paginator}>
         <button
            onClick={handlePrevious}
            disabled={currentPortion === 1}
            className={scss.arrow}
         >
            {"<"}
         </button>
         {filterPage.map((i) => (
            <span
               key={i}
               onClick={() => onPageChange(i)}
               className={`${scss["page-number"]} ${
                  i === currentPage ? scss.active : ""
               }`}
            >
               {i}
            </span>
         ))}
         <button
            onClick={handleNext}
            disabled={currentPortion === portionCount}
            className={scss.arrow}
         >
            {">"}
         </button>
      </div>
   );
};

export default Paginator;

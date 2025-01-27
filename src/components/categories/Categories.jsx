import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../store/slice/filter-slice";
import { filterSelector } from "../../store/selectors/filterSelector";

const Categories = () => {
   const { categoryId } = useSelector(filterSelector);
   const action = filterActions;
   const dispatch = useDispatch();

   const categoryData = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
   ];

   const onClickCategory = (index) => {
      dispatch(action.setCategoryId(index));
   };

   return (
      <>
         <div className="categories">
            <ul>
               {categoryData.map((categoryName, index) => (
                  <li
                     key={categoryName}
                     onClick={() => onClickCategory(index)}
                     className={categoryId === index ? "active" : ""}
                  >
                     {categoryName}
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
};

export default Categories;

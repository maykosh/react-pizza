import React from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../../store/slice/filter-slice";
import { filterSelector } from "../../store/selectors/filterSelector";
import { useAppSelector } from "../../hooks/useAppSelector";

const Categories: React.FC = () => {
   const { categoryId } = useAppSelector(filterSelector);
   const action = filterActions;
   const dispatch = useDispatch();

   const categoryData: string[] = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
   ];

   const onClickCategory = (index: number) => {
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

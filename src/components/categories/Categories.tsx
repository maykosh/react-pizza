import React from "react";

interface IProps {
   onClickCategory: (index: number) => void;
   categoryId: number | string;
}

const Categories: React.FC<IProps> = React.memo(({categoryId,onClickCategory}) => {
 

   const categoryData: string[] = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
   ];

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
});

export default Categories;

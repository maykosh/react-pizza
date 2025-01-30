import React from "react";
import { filterActions } from "../../store/filterSlice/filter-slice";
import { AscDescListType, ListType } from "../../store/type";
import { useAppDispatch } from "../../hooks/useAppDispatch";

interface IProps {
   sort: ListType;
   ascDesc: AscDescListType;
}

export const lists: ListType[] = [
   {
      name: "популярности",
      sortProperty: "rating",
   },
   {
      name: "цене",
      sortProperty: "price",
   },
   {
      name: "алфавиту",
      sortProperty: "title",
   },
];

export const ascDescList: AscDescListType[] = [
   {
      name: "по убыванию",
      type: "desc",
   },
   {
      name: "по возрастанию",
      type: "asc",
   },
];
const Sort: React.FC<IProps> = React.memo(({ ascDesc, sort }) => {
   const [open, setOpen] = React.useState(false);
   const sortRef = React.useRef<HTMLDivElement>(null);

   const dispatch = useAppDispatch();
   const action = filterActions;

   const onClickSelectList = (list: ListType) => {
      dispatch(action.setSort(list));
      setOpen(false);
   };
   const onClickAscDescList = (list: AscDescListType) => {
      dispatch(action.setAscDesc(list));
      setOpen(false);
   };

   React.useEffect(() => {
      const handleClick = (event: MouseEvent) => {
         if (!event.composedPath().includes(sortRef.current as Node)) {
            setOpen(false);
         }
      };
      document.body.addEventListener("click", handleClick);
      return () => {
         document.body.removeEventListener("click", handleClick);
      };
   }, []);

   return (
      <>
         <div ref={sortRef} className="sort">
            <div className="sort__label">
               <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M10 5C10 5.16927 9.93815 5.31576 9.81445
                      5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.4557
                      29 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 
                      5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055
                       0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061
                       849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                     fill="#2C2C2C"
                  />
               </svg>
               <b>Сортировка по:</b>
               <span onClick={() => setOpen((value) => !value)}>
                  {sort.name}
               </span>
            </div>
            {open && (
               <div className="sort__popup">
                  <ul>
                     {lists.map((list, index) => (
                        <li
                           key={index}
                           onClick={() => onClickSelectList(list)}
                           className={
                              list.sortProperty === sort.sortProperty
                                 ? "active"
                                 : ""
                           }
                        >
                           {list.name}
                        </li>
                     ))}
                     {ascDescList.map((list, index) => (
                        <li
                           key={index}
                           onClick={() => {
                              onClickAscDescList(list);
                           }}
                           className={
                              ascDesc.type === list.type ? "active" : ""
                           }
                        >
                           {list.name}
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
      </>
   );
});

export default Sort;

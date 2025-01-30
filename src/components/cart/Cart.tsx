import React from "react";
import { cartActions } from "../../store/slice/cart-slice";
import { cartSelector } from "../../store/selectors/cartSelector";
import { IPizza } from "../../store/type";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
const PizzaCoverImage =
   "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg";

interface Iprops {
   item: IPizza;
}

const Cart: React.FC<Iprops> = React.memo(({ item }) => {
   const [activeType, setActiveType] = React.useState(0);
   const [activeSize, setActiveSize] = React.useState(0);

   // const isMounted = React.useRef<boolean>(false);

   const onClickType = (index: number) => setActiveType(index);
   const onClickSize = (index: number) => setActiveSize(index);

   const typeName = ["тонкое", "традиционное"];

   const selectId = item.title + item.sizes[activeSize] + typeName[activeType];

   const { items } = useAppSelector(cartSelector);
   const currentItemCount = items.find(
      (item) => item.selectTypes.selectId === selectId
   )?.count;

   const dispatch = useAppDispatch();
   const cartAction = cartActions;

   const onClickAdd = () => {
      const obj = {
         title: item.title,
         price: item.price,
         imageUrl: PizzaCoverImage,
         selectTypes: {
            selectId: selectId,
            type: typeName[activeType],
            size: item.sizes[activeSize],
         },
         count: 0,
         incDecPrice: item.price,
      };
      dispatch(cartAction.addItem(obj));
   };
   // React.useEffect(() => {
   //    if (isMounted) localStorage.setItem("cartItems", JSON.stringify(items));
   //    isMounted.current = true;
   // }, [items]);
   return (
      <>
         <div className="pizza-block" key={item.id}>
            <img
               className="pizza-block__image"
               src={PizzaCoverImage}
               alt="Pizza"
            />
            <h4 className="pizza-block__title">{item.title}</h4>
            <div className="pizza-block__selector">
               <ul>
                  {item.types.map((idx, index) => (
                     <li
                        onClick={() => onClickType(index)}
                        key={idx}
                        className={activeType === index ? "active" : ""}
                     >
                        {typeName[idx]}
                     </li>
                  ))}
               </ul>
               <ul>
                  {item.sizes.map((size, index) => (
                     <li
                        onClick={() => onClickSize(index)}
                        key={size}
                        className={activeSize === index ? "active" : ""}
                     >
                        {size} см
                     </li>
                  ))}
               </ul>
            </div>
            <div className="pizza-block__bottom">
               <div className="pizza-block__price">от {item.price} ₽</div>
               <button
                  onClick={onClickAdd}
                  className="button button--outline button--add"
               >
                  <svg
                     width="12"
                     height="12"
                     viewBox="0 0 12 12"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                     />
                  </svg>
                  <span>Добавить</span>
                  {currentItemCount && <i>{currentItemCount}</i>}
               </button>
            </div>
         </div>
      </>
   );
});

export default Cart;

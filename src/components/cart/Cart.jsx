import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slice/cart-slice";
const pizzaCoverImage =
   "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg";
const Cart = ({ pizza }) => {
   const [activeType, setActiveType] = React.useState(0);
   const [activeSize, setActiveSize] = React.useState(0);

   const onClickType = (index) => setActiveType(index);
   const onClickSize = (index) => setActiveSize(index);

   const typeName = ["тонкое", "традиционное"];

   const { items } = useSelector((state) => state.cart);
   const currentItemCount = items.find((item) => item.id === pizza.id)?.count;
   const dispatch = useDispatch();
   const cartAction = cartActions;

   const onClickAdd = () => {
      const item = {
         id: pizza.id,
         title: pizza.title,
         price: pizza.price,
         imageUrl: pizzaCoverImage,
         type: typeName[activeType],
         size: pizza.sizes[activeSize],
      };
      dispatch(cartAction.addItem(item));
   };

   return (
      <>
         <div className="pizza-block" key={pizza.id}>
            <img
               className="pizza-block__image"
               src={
                  "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
               }
               alt="Pizza"
            />
            <h4 className="pizza-block__title">{pizza.title}</h4>
            <div className="pizza-block__selector">
               <ul>
                  {pizza.types.map((idx, index) => (
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
                  {pizza.sizes.map((size, index) => (
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
               <div className="pizza-block__price">от {pizza.price} ₽</div>
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
};

export default Cart;

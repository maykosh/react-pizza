import { ICartItem, IItem } from "../store/type";

export const calculatePriceAndCount = (items: ICartItem[]) => {
   const totalPrice = items?.reduce(
      (sum, obj) => sum + obj.price * obj.count,
      0
   );
   const totalCount = items?.reduce((sum, obj) => obj.count + sum, 0);
   return {
      totalPrice,
      totalCount,
   };
};

export const updatePriceAndCound = (state: IItem) => {
   const { totalCount, totalPrice } = calculatePriceAndCount(state.items);
   state.totalCount = totalCount;
   state.totalPrice = totalPrice;
};

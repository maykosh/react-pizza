export interface IPizza {
   id: number;
   imageUrl: string;
   title: string;
   types: number[];
   sizes: number[];
   price: number;
   category: number;
   rating: number;
}

export interface ICartItem {
   imageUrl: string;
   title: string;
   price: number;
   selectTypes: {
      selectId: string;
      type: string;
      size: number;
   };
   count: number;
   incDecPrice: number;
}

export interface IItem {
   totalPrice: number;
   items: ICartItem[];
   totalCount: number;
}

export type AscDescListType = {
   type: "asc" | "desc";
   name: string;
};
export type ListType = {
   sortProperty: "rating" | "price" | "title";
   name: string;
};

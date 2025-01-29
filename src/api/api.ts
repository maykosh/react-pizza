import axios from "axios";
// `?category=${category}&sortBy=${sortProperty}&order=${type}&page=${page}&limit=${limit}&search=${search}`

interface IParams {
   category: number | string;
   sortBy: string;
   order: string;
   page: number;
   limit: number;
   search: string;
}

const instance = axios.create({
   baseURL: "https://677d2a5d4496848554c95179.mockapi.io/pizza/v1/pizza",
   headers: { "content-type": "application/json" },
});

export const getPizzas = async (params: IParams) => {
   const  data  = await instance.get("", { params });
   return data;
};

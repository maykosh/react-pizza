import axios from "axios";

const instance = axios.create({
   baseURL: "https://677d2a5d4496848554c95179.mockapi.io/pizza/v1/pizza",
   headers: { "content-type": "application/json" },
});

export const getPizzas = async (
   category,
   sortProperty,
   type,
   page,
   limit,
   search
) => {
   const data = await instance.get(
      `?category=${category}&sortBy=${sortProperty}&order=${type}&page=${page}&limit=${limit}&search=${search}`
   );
   return data;
};

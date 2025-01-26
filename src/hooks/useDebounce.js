import React, { useEffect } from "react";

export const useDebounce = (value, delay) => {
   const [debouncedValue, setDebouncedValue] = React.useState(value);
   useEffect(() => {
      const handle = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);
      return () => {
         clearTimeout(handle);
      };
   }, [value, delay]);
   return debouncedValue;
};

import React, { useEffect } from "react";

export const useDebounce = <V, D extends number>(value: V, delay: D) => {
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

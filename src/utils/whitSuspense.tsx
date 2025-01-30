import React from "react";

export const whitSuspense = (Component: React.FC) => {
   const SuspensedComponent = (props: any) => (
      <React.Suspense fallback={<div>загрузка...</div>}>
         <Component {...props} />
      </React.Suspense>
   );
   return SuspensedComponent;
};

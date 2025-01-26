import React from "react";
import ContentLoader from "react-content-loader";

const CartSceleton = (props) => (
   <ContentLoader
      speed={1}
      width={300}
      height={500}
      viewBox="0 0 300 500"
      backgroundColor="#ededed"
      foregroundColor="#cfcfcf"
      {...props}
   >
      <circle cx="144" cy="121" r="114" />
      <rect x="55" y="283" rx="0" ry="0" width="188" height="31" />
      <rect x="31" y="336" rx="13" ry="13" width="244" height="76" />
      <rect x="28" y="436" rx="0" ry="0" width="88" height="33" />
      <rect x="148" y="433" rx="22" ry="22" width="133" height="46" />
   </ContentLoader>
);

export default CartSceleton;

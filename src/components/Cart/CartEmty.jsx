import React from "react";

CartEmty.propTypes = {};

function CartEmty(props) {
  return (
    <div className="rounded-md border border-solid border-gray-300  bg-red-50 p-4">
      <img
        src="https://d16py1fyt83ijv.cloudfront.net/vedobi/assets/img/empty-cart.webp"
        alt=""
        className="rounded-md w-[400px]"
      />
    </div>
  );
}

export default CartEmty;

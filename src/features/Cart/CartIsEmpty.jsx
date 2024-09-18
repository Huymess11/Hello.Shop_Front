import React from "react";
import PropTypes from "prop-types";

CartIsEmpty.propTypes = {};

function CartIsEmpty(props) {
  return (
    <div>
      <img
        className="w-full"
        src="https://www.seensil.com/assets/images/cart-empty.jpg"
        alt=""
      />
    </div>
  );
}

export default CartIsEmpty;

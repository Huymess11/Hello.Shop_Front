import React from "react";
import PropTypes from "prop-types";

CartItem.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  totalPrice: PropTypes.number,
  totalCount: PropTypes.number,
};

function CartItem({ name, img, totalCount, totalPrice }) {
  return (
    <>
      <td>
        <div className="p-2">
          <img className="w-14 h-14" src={img} alt="" />
        </div>
      </td>
      <td className="p-2">
        <div>
          <span className="text-sm">{name}</span>
        </div>
      </td>
      <td align="center">
        <span>{totalCount}</span>
      </td>
      <td>
        {Number(totalPrice).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </td>
    </>
  );
}

export default CartItem;

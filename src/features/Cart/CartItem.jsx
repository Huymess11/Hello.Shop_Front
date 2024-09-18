import React, { useState } from "react";
import PropTypes from "prop-types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import {
  changeQuanity,
  decreaseQuanity,
  increaseQuanity,
  removeItemInCart,
} from "../Auth/userSlice";

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function CartItem({ item }) {
  const dispatch = useDispatch();
  const [quanity, setQuanity] = useState(item.count);

  const hanleChangeQuanity = (e) => {
    const newQuanity = parseInt(e.target.value, 10);

    setQuanity(newQuanity);
    dispatch(
      changeQuanity({
        productId: item.id,
        newQuanity,
      })
    );
  };

  const handleIncreaseQuanity = () => {
    setQuanity((prevQuanity) => prevQuanity + 1);
    dispatch(
      increaseQuanity({
        productId: item.id,
      })
    );
  };
  const handleDecreaseQuanity = () => {
    if (quanity > 1) {
      setQuanity((prevQuanity) => prevQuanity - 1);
      dispatch(
        decreaseQuanity({
          productId: item.id,
        })
      );
    }
  };
  const handleRemoveItem = () => {
    dispatch(removeItemInCart({ productId: item.id }));
  };

  return (
    <div className="flex justify-between p-4 mb-6 rounded bg-white flex-1 border-2 border-black">
      <div className="flex">
        <img
          className="w-24 bg-white h-24 rounded-md mr-4"
          src={item.imgURL}
          alt=""
        />
        <div className="flex flex-col">
          <span>{item.name}</span>
          <span>
            Đơn giá:{" "}
            {item.unitPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-2 max-w-28">
          <AddCircleOutlineIcon
            onClick={handleIncreaseQuanity}
            className="rounded-l cursor-pointer bg-white"
          />
          <input
            className="w-12 pl-1 border-l border-r outline-none border-solid border-gray-500"
            type="number"
            min={1}
            onChange={hanleChangeQuanity}
            value={quanity}
          />
          <RemoveCircleOutlineIcon
            onClick={handleDecreaseQuanity}
            className="rounded-r cursor-pointer bg-white"
          />
        </div>
        <span>
          {item.totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <button
          onClick={handleRemoveItem}
          className="w-full px-2 py-1 flex justify-center items-center rounded bg-red-500 text-white mt-4"
        >
          <span>Xóa</span>
        </button>
      </div>
    </div>
  );
}

export default CartItem;

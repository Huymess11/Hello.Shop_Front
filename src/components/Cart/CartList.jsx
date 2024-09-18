import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

CartList.propTypes = {};

function CartList(props) {
  const { cart } = useSelector((state) => state.user);

  return (
    <div className="border border-solid border-gray-300 w-[400px] h-[500px] overflow-y-auto p-4 bg-red-50 rounded-md">
      <h4 className="bg-red-600 rounded-t-md fixed top-0 left-0 right-0 text-center text-white uppercase text-xl font-bold py-2 mb-3">
        CART
      </h4>
      <table className="w-full my-12 border border-solid border-black ">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Count</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((product) => {
            return (
              <tr
                key={product.id}
                className="padding-2 border-t border-solid border-black"
              >
                <CartItem
                  id={product.id}
                  img={product.imgURL}
                  name={product.name}
                  totalCount={product.count}
                  totalPrice={product.totalPrice}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bg-red-600 rounded-b-md text-white fixed text-xl left-0 bottom-0 right-0">
        <div className="px-4 py-1">
          <span className="font-bold">Total:</span>{" "}
          {Number(cart.totalCost).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>
    </div>
  );
}

export default CartList;

import React, { useState } from "react";
import PropTypes from "prop-types";

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

function FilterByPrice({ onChange }) {
  const [salePrices, setSalePrices] = useState({
    price_gte: 0,
    price_lte: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalePrices((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) {
      console.log("Filter by price:", salePrices);
      onChange(salePrices);
    }
    setSalePrices({
      price_gte: 0,
      price_lte: 0,
    });
  };

  return (
    <div className="border-t-2 border-solid gray-300 pt-2 pb-4">
      <span className="text-xl font-bold">GIÁ</span>
      <div className="mt-2 flex items-center justify-between">
        <input
          name="price_gte"
          value={salePrices.price_gte}
          onChange={handleChange}
          type="number"
          placeholder="0$"
          className="flex-1 max-w-36 p-2 rounded outline-none border border-solid border-black"
        />
        to
        <input
          name="price_lte"
          value={salePrices.price_lte}
          onChange={handleChange}
          type="number"
          placeholder="9999$"
          className="flex-1 max-w-36 p-2 rounded outline-none border border-solid border-black"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="outline-none mt-2 w-full text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        ÁP DỤNG
      </button>
    </div>
  );
}

export default FilterByPrice;

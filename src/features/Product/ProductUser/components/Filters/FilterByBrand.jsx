import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

FilterByBrand.propTypes = {
  onChange: PropTypes.func,
};

function FilterByBrand({ onChange }) {
  const { brand_list } = useSelector((state) => state.products);

  const handleBrandClick = (brand) => {
    if (onChange) {
      console.log(brand);
      onChange(brand);
    }
  };

  return (
    <div className="border-t-2 solid white-300 pt-2 ">
      <span className="text-xl font-bold">LOẠI SẢN PHẨM</span>
      <ul className="pl-4">
        {brand_list.map((brand, index) => {
          return (
            <li
              onClick={() => handleBrandClick(brand)}
              key={index}
              className="my-2 cursor-pointer  hover:text-black-600"
            >
              {brand}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FilterByBrand;

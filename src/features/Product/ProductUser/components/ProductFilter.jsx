import React from "react";
import PropTypes from "prop-types";
import FilterByKeyword from "./Filters/FilterByKeyword";
import FilterByPrice from "./Filters/FilterByPrice";
import FilterByBrand from "./Filters/FilterByBrand";

ProductFilter.propTypes = {
  onChange: PropTypes.func,
};

function ProductFilter({ onChange }) {
  const handleBrandChange = (newBrand) => {
    if (!onChange) return;
    const categoryFilter = {
      brand: newBrand,
    };
    onChange(categoryFilter);
  };

  const handlePriceChange = (newRangePriceFilters) => {
    if (onChange) {
      onChange(newRangePriceFilters);
    }
  };

  const handleSearchChange = (keyword) => {
    if (onChange) {
      onChange({
        search: keyword,
      });
    }
  };

  return (
    <div className="bg-white border-2 border-black rounded pl-4 pr-2 py-2">
      <FilterByKeyword onChange={handleSearchChange} />
      <FilterByBrand onChange={handleBrandChange} />
      <FilterByPrice onChange={handlePriceChange} />
    </div>
  );
}

export default ProductFilter;

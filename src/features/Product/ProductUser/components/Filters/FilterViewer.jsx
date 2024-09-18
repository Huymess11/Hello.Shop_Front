import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Chip } from "@mui/material";
import { useSelector } from "react-redux";

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => `Key search: ${filters["search"]}`,
    isActive: (filters) => {
      return true
    },
    isVisible: (filters) => {
      return (Object.keys(filters).includes('search') && filters['search'] !== '') 
    },
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters["search"];
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 2,
    getLabel: (filters) => {
      const gte_price = Number(filters.price_gte).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      const lte_price = Number(filters.price_lte).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      return `Từ ${gte_price} đến ${lte_price}`;
    },
    isActive: () => true,
    isVisible: (filters) => {
       return ( Object.keys(filters).includes("price_lte") &&
       Object.keys(filters).includes("price_gte"))
    },
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters["price_gte"];
      delete newFilters["price_lte"];
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters, brand_list) => {
      const brand = brand_list.find((x) => x === filters["brand"]);
      if (brand) {
        return `Brand: ${brand}`;
      } else {
        return "All brand";
      }
    },
    isActive: () => true,
    isVisible: (filters) => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters["brand"];
      return newFilters;
    },
    onToggle: (filters) => {},
  },
];

function FilterViewer({ filters, onChange }) {
  const visibleFilters = useMemo(
    () => FILTER_LIST.filter((x) => x.isVisible(filters)),
    [filters]
  );
  const { brand_list } = useSelector((state) => state.products);
  return (
    <Box component="ul" className="flex flex-nowrap items-center">
      {visibleFilters.map((x) => (
        <li className="mr-4" key={x.id}>
          {/* <Chip
            size="small"
            label={x.getLabel(filters, brand_list)}
            color={x.isActive(filters) ? "primary" : "default"}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          /> */}
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;

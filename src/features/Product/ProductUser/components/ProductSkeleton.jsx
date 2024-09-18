import { Box, Skeleton } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

ProductSkeleton.propTypes = {
  length: PropTypes.number.isRequired,
};

function ProductSkeleton({ length }) {
  return (
    <>
      {Array.from(new Array(length)).map((item, index) => {
        return (
          <Box className="rounded-lg " key={index} padding={1}>
            <Skeleton variant="rectangular" width="100%" height={195} />
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        );
      })}
    </>
  );
}

export default ProductSkeleton;

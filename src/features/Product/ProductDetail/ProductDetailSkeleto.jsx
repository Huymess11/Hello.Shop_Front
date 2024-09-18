import React from "react";
import PropTypes from "prop-types";
import { Box, Button, LinearProgress, Skeleton } from "@mui/material";

ProductDetailSkeleto.propTypes = {};

function ProductDetailSkeleto(props) {
  return (
    <div className="flex pb-44">
      <Box
        className="z-[999] "
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        <LinearProgress />
      </Box>
      <Skeleton
        variant="rectangular"
        className="rounded-xl"
        width={384}
        height={384}
      />
      <div className="ml-12 flex-1 flex flex-col justify-between">
        <div className="">
          <h2 className="mb-2 font-bold text-4xl">
            <Skeleton variant="h1" width="100%" />
          </h2>
          <span className="max-h-36 text-xs">
            <Skeleton width={500} />
            <Skeleton width={500} />
            <Skeleton width={500} />
            <Skeleton width={500} />
            <Skeleton width={500} />
            <Skeleton width={500} />
          </span>
          <h2 className="mb-2 mt-3 font-bold text-3xl">
            <Skeleton variant="h1" width="50%" />
          </h2>
        </div>
        <div className="w-64">
          <input
            type="number"
            className="w-full outline-none border border-solid border-black p-2 mb-2 rounded"
          />
          <div className="flex justify-between">
            <Button className="mr-2" disabled variant="outlined">
              Add to cart
            </Button>
            <Button variant="outlined" disabled>
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleto;

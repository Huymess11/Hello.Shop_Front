
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ProductRelated({relatedProduct}) {
    const navigate = useNavigate()
    const handleOnClickRelatedProduct = () => {
        navigate(`/product-detail/${relatedProduct.id}`)
    }
  return (
    
        <div onClick={handleOnClickRelatedProduct} className="cursor-pointer flex flex-col justify-center border border-solid border-black rounded p-2 w-48">
            <img className="mx-auto h-32 w-32" src={relatedProduct.pictureURL} alt="" />
            <h2 className="text-sm mt-2 truncate">{relatedProduct.name}</h2>
            <div className="flex justify-between items-center w-full">
                <span className="font-medium">Giá bán: ${relatedProduct.price}</span>
                <span className="text-xs font-thin text-slate-500">
                    Đã bán: 999
                </span>
            </div>
        </div>
    
  );
}

export default ProductRelated;

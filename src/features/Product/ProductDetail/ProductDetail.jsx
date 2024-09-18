import { Button, Divider, Paper, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useProductDetail from "../hooks/useProductHookDetail";
import ProductDetailSkeleto from "./ProductDetailSkeleto";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../Auth/userSlice";
import productApi from "../../../apis/productApi";
import ProductRelated from "./ProductRelated";

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // phần này để lấy sp và trạng thái
  const { product,relatedProductList, loading } = useProductDetail(id);
  const [quanity, setQuanity] = useState(0);
  const infoUser = useSelector((state) => state.user.current);
  const isAuthenication = !!infoUser.id;
  const navigate = useNavigate()

  const handleChangeQuanity = (e) => {
    const currentQuanity = parseInt(e.target.value);
    if (currentQuanity < 0) setQuanity(0);
    else {
      setQuanity(currentQuanity);
    }
  };

  const handleAddToCart = () => {
    if (quanity > 0) {
      if (isAuthenication) {
        dispatch(
          addProductToCart({
            product: product,
            count: quanity,
          })
        );
        toast.success("Thêm sản phẩm vào giỏ hàng thành công 🥳🤩🤩🤩", {
          autoClose: 3000,
        });
      } else {
        toast.error("Làm ơn đăng nhập để thêm sản phẩm vào giỏ hàng 👌", {
          autoClose: 3000,
        });
      }
    } else {
      toast.warn(
        "Số lượng sản phẩm muốn thêm phải lớn hơn 0 👌"
      );
    }
  };

  const handleBuyProduct = () => {
    if (quanity > 0) {
      if (isAuthenication) {
        dispatch(
          addProductToCart({
            product: product,
            count: quanity,
          })
        );
        toast.success("Thêm sản phẩm vào giỏ hàng thành công 🥳🤩🤩🤩", {
          autoClose: 3000,
        });
        navigate('/cart')
      } else {
        toast.error("Làm ơn đăng nhập để mua sản phẩm 👌", {
          autoClose: 3000,
        });
      }
    } else {
      toast.warn(
        "Số lượng sản phẩm muốn mua phải lớn hơn 0 👌"
      );
    }
  };

  return (
    <div className="mt-[var(--height-header)] flex items-center h-[calc(120vh-var(--height-header))]">
      <Paper className=" p-4 w-3/4 mx-auto h-[90%] bg-slate-100">
        {loading && <ProductDetailSkeleto />}
        {!loading && (
          <>
            <div className="flex pb-4">
              <div className="rounded-xl">
                <img
                  className="h-[25rem]  rounded-xl border border-solid border-slate-500"
                  src={product.pictureURL}
                  alt=""
                />
              </div>
              <div className="ml-12 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="mb-2 font-bold text-4xl">{product.name}</h2>
                  <div className="flex items-center">
                    Đánh giá:
                    <Rating name="read-only" value={5} readOnly />
                  </div>
                  <span className="mb-4 block">Đã bán: 9999+</span>
                  <p className=" line-clamp-6">{product.description}</p>
                  <h2 className="text-3xl font-medium mt-6">
                    Giá: ${product.price}
                  </h2>
                </div>
                <div className="w-72">
                  <input
                    value={quanity}
                    onChange={handleChangeQuanity}
                    type="number"
                    className="w-full outline-none border border-solid border-black p-2 mb-2 rounded"
                  />
                  <div className="flex justify-between">
                    <Button
                      onClick={handleAddToCart}
                      className="mr-2"
                      variant="outlined"
                    >
                      Thêm sản phẩm
                    </Button>
                    <Button onClick={handleBuyProduct} variant="outlined">
                     Mua ngay
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <h2 className="text-center uppercase text-lg my-2">
                Danh sách sản phẩm liên quan
              </h2>
              <div className="flex justify-evenly">
                  {relatedProductList.map(product => {
                    return <ProductRelated key={product.id}  relatedProduct={product}/>
                  })}
              </div>
            </div>
          </>
        )}
      </Paper>
    </div>
  );
}

export default ProductDetail;

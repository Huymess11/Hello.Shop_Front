import { useEffect, useState } from "react";
import productApi from "../../../apis/productApi";

export default function useProductDetail(id) {
  const [product, setProduct] = useState({});
  const [relatedProductList, setRelatedProductList] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fetchProductResult = await productApi.get(id);
        const fetchRelatedProductResult = await productApi.getRelatedProduct(id)
        console.log({
          fetchProductResult,
          fetchRelatedProductResult
        });
        setProduct(fetchProductResult);
        setRelatedProductList(fetchRelatedProductResult);
      } catch (error) {
        console.log("Failed to fetch product", error);
      }
      setLoading(false);
    })();
  }, [id]);

  return { product, relatedProductList, loading};
}

import React from "react";

const ArrivalList = [
  {
    id: 1,
    name: "Laptop Lenovo Gaming Legion 5 Pro",
    price: "51.990.000đ",
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_509_70_.png",
  },
  {
    id: 2,
    name: " Màn hình Samsung Gaming Odyssey G5",
    price: "7.590.000đ",
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-samsung-gaming-odyssey-g5-lc34g55twwexxv-34-inch.png",
  },
  {
    id: 3,
    name: "iPhone 15 Plus 128GB",
    price: "22.590.000đ",
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1_.png",
  },
  {
    id: 4,
    name: "Chuột không dây Logitech MX Master 2S",
    price: "1.390.000đ",
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/h/chuot-khong-day-logitech-mx-master-2s_3_.png",
  },
  {
    id: 5,
    name: "Bàn phím cơ E-DRA",
    price: "499.000đ",
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/e/d/edra_red.png",
  },
];

function OutstandingProducts() {
  return (
    <div className="pt-14 pb-16 flex flex-col items-center">
      <div>
        <h2 className="uppercase text-center mb-8 text-3xl font-bold">
          SẢN PHẨM NÔI BẬT
        </h2>
        <div className="flex flex-row gap-2">
          {ArrivalList.map((watch) => {
            return (
              <div className="flex flex-col items-center" key={watch.id}>
                <img className="w-[300px] rounded" src={watch.src} alt="" />
                <h4 className="text-lg font-medium mt-2">{watch.name}</h4>
                <span className="text-sm">{watch.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OutstandingProducts;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MdArrowBackIos } from "react-icons/md";
import { GrNext } from "react-icons/gr";

Banner.propTypes = {
  sliderList: PropTypes.array,
};

const BannerList = [
  {
    id: 1,
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/roi-iphone16-sliding.jpg",
  },
  {
    id: 2,
    src: "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/fold-6-km-moi-home-30-8.png",
  },
  {
    id: 3,
    src: "https://cdn.hoanghamobile.com/i/home/Uploads/2024/08/15/bts-1200x375.jpg",
  },
];

function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Chuyển ảnh sang phải (tăng index) và quay về index 0 nếu đang ở cuối danh sách
      setCurrentImageIndex((prevIndex) =>
        prevIndex === BannerList.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // Chạy một lần khi component được mount

  const handleBackBanner = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? BannerList.length - 1 : prevIndex - 1
    );
  };

  const handleNextBanner = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === BannerList.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <div
        onClick={handleBackBanner}
        className="absolute top-1/2 left-4 cursor-pointer hover:text-gray-200 text-4xl font-bold text-gray-500"
      >
        <MdArrowBackIos />
      </div>
      <div
        onClick={handleNextBanner}
        className="absolute top-1/2 right-4 cursor-pointer hover:text-gray-200 text-4xl font-bold text-gray-500"
      >
        <GrNext />
      </div>
      <img
        alt="slider"
        src={BannerList[currentImageIndex].src}
        className="w-full h-[var(--height-banner)] transition ease-out duration-1000"
      />
    </div>
  );
}

export default Banner;

import React from "react";
import Banner from "./components/Banner";
import OutstandingProducts from "./components/OutstandingProducts";
import Decore from "./components/Decor";

function Home() {
  return (
    <div className="pt-[var(--height-header)]">
      <Banner />
      <OutstandingProducts />
      <Decore/>
    </div>
  );
}

export default Home;

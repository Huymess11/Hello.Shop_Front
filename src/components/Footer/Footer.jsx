import React from "react";

function Footer() {
  return (
    <footer className="bg-white h-auto dark:bg-red-600">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                HELLO.SHOP<br/>
                A42178 - PHẠM QUANG HUY<br/>
                A43082 - NGUYỄN XUÂN TRUNG
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold ext-gray-900 uppercase dark:text-white ">
                Contact Us
              </h2>
              <ul className="text-gray-500 dark:text-white font-medium">
                <li className="mb-4">
                  <a href="tel:0988862237" className="hover:underline">
                    Phone: 0988 862 237
                  </a>
                </li>
                <li>
                  <a href="mailto:info@helloshop.com" className="hover:underline">
                    Email: info@helloshop.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Visit Us
              </h2>
              <ul className="text-gray-500 dark:text-white font-medium">
                <li className="mb-4">
                  <span className="hover:underline">Address: Long Biên, Hà Nội</span>
                </li>
                <li>
                  <a
                    href="https://goo.gl/maps/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Get Directions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Quick Links
              </h2>
              <ul className="text-gray-500 dark:text-white font-medium">
                <li className="mb-4">
                  <a href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="/about-us" className="hover:underline">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 text-gray-500 dark:text-white text-center">
          © 2024 HelloShop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

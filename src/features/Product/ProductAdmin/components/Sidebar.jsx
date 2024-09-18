import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";

const SIDE_BAR = [
  {
    id: 1,
    name: "Danh sách sản phẩm",
    url: "/admin/product-list",
    icon: <FaRegListAlt />,
  },
  {
    id: 2,
    name: "Tạo mới sản phẩm",
    url: "/admin/create",
    icon: <IoIosCreate />,
  },
];

function Sidebar(props) {
  return (
    <div className="pt-2 bg-white col-span-1 md:col-span-2">
      {SIDE_BAR.map((nav) => {
        return (
          <NavLink
            key={nav.id}
            to={nav.url}
            className={({ isActive }) =>
              `uppercase flex items-center lg:justify-start justify-center text-black my-1 py-2 md:px-12 cursor-pointer ${
                isActive ? "bg-red-500 text-white " : ""
              }`
            }
          >
            <div className="md:mr-2 font-medium text-lg ">{nav.icon}</div>
            <span className="hidden md:block text-sm">{nav.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default Sidebar;

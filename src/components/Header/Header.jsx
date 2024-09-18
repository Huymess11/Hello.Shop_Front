import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import HeadlessTippy from "@tippyjs/react/headless";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo2 from "../../assets/images/MC_logo_2022.svg";
import StorageKeys from "../../constants/storage-key";
import { logout } from "../../features/Auth/userSlice";
import CartEmty from "../Cart/CartEmty";
import CartList from "../Cart/CartList";

Header.propTypes = {
  openForm: PropTypes.func,
};

const NAVIGATIONS = [
  { id: 1, name: "Trang chủ", url: "/" },
  { id: 2, name: "Thông tin", url: "/about" },
  { id: 3, name: "Sản phẩm", url: "/products" },
  { id: 4, name: "Giỏ hàng", url: "/cart" },
];

function Header({ openForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isOpenedMenu, setOpenedMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { totalItem } = useSelector((state) => state.user.cart);
  const infoUser = useSelector((state) => state.user.current);
  const isAuthenication = !!infoUser.id;

  let isAdmin
  if(Object.keys(infoUser).length > 0) {
    isAdmin = infoUser?.role === "ADMIN" ;
  }

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenedMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleToggleShowCart = () => {
    setShowCart((prev) => !prev);
  };

  const handleClickLogin = () => {
    openForm();
  };

  const toggleOpenMenu = () => {
    setOpenedMenu((prevState) => !prevState);
  };

  const handleLogoutAccount = () => {
    const action = logout();
    dispatch(action);
    navigate('/')
  };

  return (
    <div className="flex fixed top-0 left-0 right-0 z-50 justify-between bg-red-600  items-center px-12 h-[var(--height-header)]">
      <div className="flex items-center">
        <Link to="/" className="block font-extrabold text-2xl mr-12">
          <img src={Logo2} alt="" className=" lg:hidden w-16 h-16" />
          <span className="hidden lg:block leading-[var(--height-hea  der)] text-white">
            HELLO.SHOP
          </span>
        </Link>
        <ul className="flex justify-start items-center text-white">
          {NAVIGATIONS.map((nav) => (
            <NavLink
              key={nav.id}
              className={({ isActive }) =>
                `uppercase font-medium px-6 py-2 hover:bg-purple-700 hover:text-white hover:bg-red-800 rounded-md mx-[2px] ${
                  isActive ? "bg-red-800 text-white" : ""
                }`
              }
              to={nav.url}
            >
              {nav.name}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="flex items-center">
        {isAuthenication && (
          <div>
            <HeadlessTippy
              render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                  {totalItem === 0 ? <CartEmty /> : <CartList />}
                </div>
              )}
              placement="bottom-end"
              onClickOutside={handleToggleShowCart}
              visible={showCart}
              interactive
            >
              <Badge
                onClick={handleToggleShowCart}
                className="mr-2 cursor-pointer"
                badgeContent={totalItem}
                color="primary"
              >
                <ShoppingCartIcon fontSize="medium" color="action" />
              </Badge>
            </HeadlessTippy>
          </div>
        )}

        {!isAuthenication && (
          <div
            className="flex items-center text-lg cursor-pointer px-6 py-[6px] ml-[2px] text-white hover:bg-white hover:text-red-500 rounded-md"
            onClick={handleClickLogin}
          >
            <FaRegUser />
            <span className="ml-2">Đăng nhập</span>
          </div>
        )}

        {isAuthenication && (
          <div
            ref={menuRef}
            onClick={toggleOpenMenu}
            className="relative flex items-center px-6 py-[6px] text-lg cursor-pointer"
          >
            <img
              src={
                localStorage.getItem(StorageKeys.AVATAR)
                  ? localStorage.getItem(StorageKeys.AVATAR)
                  : "https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg"
              }
              alt="avatar"
              className="w-11 h-11 rounded-full"
            />
            <span className="ml-2 truncate">{infoUser.fullName}</span>
            {isOpenedMenu && (
              <div className="absolute rounded top-[3rem] w-40 right-4 bg-white z-50 text-base list-nonedivide-y divide-gray-100  shadow dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {infoUser.fullName}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {infoUser.email}
                  </span>
                </div>
                <ul className="py-2 border-t border-solid">
                  { isAdmin && (<li>
                    <Link
                      to="/admin/product-list"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Quản lý sản phẩm
                    </Link>
                  </li>)}
                  <li>
                    <Link
                      to="/user/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Tài khoản
                    </Link>
                  </li>
                  <li>
                    <span
                      onClick={handleLogoutAccount}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Đăng xuất
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

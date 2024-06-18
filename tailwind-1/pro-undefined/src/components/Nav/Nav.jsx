import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../../assets/image/home-icon.png";
import faceIcon from "../../assets/image/face-icon.png";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Nav({ isOpen }) {
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );
  return (
    <div className="flex items-center">
      <NavLink
        to={"/"}
        className={`
       
         hidden md:flex items-center h-10 p-2 rounded-lg  hover:bg-gray-200 `}
      >
        <img src={homeIcon} alt="" className="w-6 mr-2" />{" "}
        <span className="text-gray-js">Trang chủ</span>
      </NavLink>
      <NavLink
        to={"/account"}
        className={
          "hidden md:flex items-center h-10 p-2 rounded-lg  hover:bg-gray-200 "
        }
      >
        <img src={faceIcon} alt="" className="w-6 mr-2" />{" "}
        <span className="text-gray-js">Tài khoản</span>
      </NavLink>

      <NavLink
        to={"/v1/cart"}
        className=" relative hover:bg-gray-200  h-10 p-2 rounded-lg   "
      >
        <div className="text-sm absolute inline-flex items-center justify-center w-4 h-4  text-white bg-red-500 rounded-full -top-1 -end-0 ">
          {cartTotalQuantity}
        </div>

        <FiShoppingCart className="text-center text-3xl w-6  text-white md:text-blue-js  "></FiShoppingCart>
      </NavLink>
    </div>
  );
}

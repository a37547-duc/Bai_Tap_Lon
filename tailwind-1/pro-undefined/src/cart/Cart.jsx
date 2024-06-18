import React, { useEffect, useState } from "react";
import { getTotals } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../features/cartSlice";
import axios from "axios";
import Spinner from "../components/spinner/Spinner";

import useAsyncRequest from "../hooks/useAsyncRequest";

export default function Cart() {
  const data = useSelector((state) => state.cart.cartTotalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (cartItems) => {
    dispatch(addToCart(cartItems));
  };
  const handleDecreaseCart = (cartItems) => {
    dispatch(decreaseCart(cartItems));
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems]);

  console.log(cartItems);
  console.log(data);

  // const handleClick = async () => {
  //   setLoading(true);

  //   const url = "http://localhost:3000/v1/payment";

  //   try {
  //     const response = await axios.post(url, {
  //       name: "123dgfgfgf",
  //     });
  //     // Xử lý phản hồi từ máy chủ
  //     console.log("Response:", response.data);

  //     window.location.href = `${response.data.payUrl}`;
  //   } catch (error) {
  //     // Xử lý lỗi
  //     console.error("There was an error!", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const { loading, fetchData } = useAsyncRequest(
    "http://localhost:3000/v1/payment"
  );
  const handleClick = async () => {
    await fetchData({
      // Thông tin yêu cầu POST
      name: "123456789",
    });
  };
  return (
    <div>
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((book, index) => (
                      <tr key={index}>
                        <td className="py-4  w-3/5">
                          <div className="flex items-center ">
                            {book.images &&
                              book.images
                                .map((book, index) => (
                                  <img
                                    key={index}
                                    className="w-20 h-20 object-contain border-2 rounded-lg"
                                    src={book.base_url}
                                  />
                                ))
                                .slice(0, 1)}
                            <span className="font-semibold w-2/3">
                              {book.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          {" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(book.list_price)}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border rounded-md py-2 px-4 mr-2"
                              onClick={() => handleDecreaseCart(book)}
                            >
                              -
                            </button>
                            <span className="text-center w-8">
                              {book.cartQuantity}
                            </span>
                            <button
                              className="border rounded-md py-2 px-4 ml-2"
                              onClick={() => handleAddToCart(book)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(book.list_price * book.cartQuantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>

                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(data)}
                  </span>
                </div>

                {!loading && (
                  <button
                    onClick={handleClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  >
                    Checkout
                  </button>
                )}
                {loading && (
                  <div className="flex justify-center">
                    <Spinner></Spinner>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

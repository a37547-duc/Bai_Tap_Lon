import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { FaStarHalf } from "react-icons/fa6";

import axios from "axios";
import { Link } from "react-router-dom";

import { useGetAllProductsQuery } from "../../features/apiSlice";

import { useSelector } from "react-redux";
// import Paginate from "./Paginate";

export default function Product() {
  const query = useSelector((state) => state.category.query);
  // const [skip, setSkip] = useState(true);

  // Sử dụng useEffect để cập nhật giá trị skip khi query thay đổi
  // useEffect(() => {
  //   if (!query) {
  //     setSkip(false);
  //   }
  // }, [query]);

  const { data: allProducts } = useGetAllProductsQuery(query);

  // useEffect(() => {
  //   if (allProducts) {
  //     console.log("Products:", allProducts);
  //   }
  // }, [allProducts]);
  console.log("Products:", allProducts);

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto p-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
          {allProducts &&
            allProducts.map((book, index) => {
              return (
                <div
                  key={index}
                  className=" rounded overflow-hidden shadow-lg flex flex-col  "
                >
                  <div className="relative   w-full h-48 flex justify-center  ">
                    <Link to={`/v1/book/${book._id}`}>
                      {book.images &&
                        book.images
                          .map((author, index) => (
                            <img
                              className="w-full h-full object-cover"
                              src={author.base_url}
                              alt=""
                              key={index}
                            />
                          ))
                          .slice(0, 1)}
                      <div className="hover:bg-gray-js hover:opacity-30 transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-js opacity-10"></div>
                    </Link>
                  </div>
                  <div className="px-6 mt-5">
                    <Link
                      to={`/v1/book/${book._id}`}
                      className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                    >
                      {book.name}
                    </Link>
                    <p className="text-gray-500 text-sm ">
                      {book.short_description.slice(0, 50)}
                    </p>
                  </div>

                  {/* /////////////////Review Component/////////////// */}
                  <div className=" px-6 py-1 flex items-center space-x-1">
                    {/* Hiển thị phần nguyên của rating_average */}
                    <div className="flex items-center">
                      {Array.from({
                        length: Math.floor(book.rating_average),
                      }).map((_, index) => (
                        <IoMdStar key={index} className="text-yellow-300" />
                      ))}
                      {/* Hiển thị phần thập phân của rating_average */}
                      {/* {decimalPart > 0 && <IoMdStar className="text-yellow-300" />} */}
                      {parseFloat(
                        book.rating_average.toString().split(".")[1]
                      ) > 0 ? (
                        <FaStarHalf
                          key={index}
                          className="text-yellow-300 text-xs "
                        ></FaStarHalf>
                      ) : (
                        ""
                      )}
                    </div>
                    <span className="before:content-['|'] before:mr-1 before:text-slate-200 text-xs text-gray-js text-center">
                      {book.quantity_sold && book.quantity_sold.text}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="px-6 py-4 flex items-center space-x-4">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                      .format(book.current_seller.price)
                      .replace("₫", "")}
                    <sup className="underline">đ</sup>
                    {/* <sup className="underline">đ</sup> */}
                    <div className="text-sm rounded-full bg-slate-200">
                      {book.current_seller.price < book.list_price
                        ? `${-(
                            ((book.list_price - book.current_seller.price) /
                              book.list_price) *
                            100
                          ).toFixed(0)}%`
                        : ""}
                    </div>
                  </div>

                  {/* //////////////////////////////////////////////////////// */}
                  <div className="mx-3  text-gray-js p-3 mt-auto flex justify-center border-t-2">
                    <p> Giao hàng nhanh</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

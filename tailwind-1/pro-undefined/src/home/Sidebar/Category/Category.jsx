import React from "react";
import { IoMdStar } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setQuery } from "../../../features/categorySlice";
import { Link } from "react-router-dom";

export default function Category() {
  const dispatch = useDispatch();

  const handleCategorySelect = (category) => {
    dispatch(setQuery(category)); // Gửi chuỗi query lên Redux store
  };

  const handleChange = (vendor) => {
    dispatch(setQuery(vendor));
  };

  return (
    <div className="border w-52 h-auto ">
      <div className="border-b-2 mt-3">
        <div className="product-catalog flex flex-col ml-4 ">
          <h4 className="text-base leading-8 font-medium">Danh Mục Sản Phẩm</h4>
          <a href="" className="text-sm leading-8 font-medium">
            English Books
          </a>
          <a href="" className="text-sm leading-8 font-medium">
            Sách tiếng Việt
          </a>
          <a href="" className="text-sm leading-8 font-medium">
            Văn phòng phẩm
          </a>
          <a href="" className="text-sm leading-8 font-medium">
            Qùa lưu niệm
          </a>
        </div>
      </div>

      {/* CHECKBOX */}
      <div className="border-b-2 mt-3">
        <div className="vendor  ml-4">
          <h4 className="text-base leading-8 font-medium">Nhà cung cấp</h4>
          <div className="flex items-center space-x-2 ">
            <input
              type="checkbox"
              id="fahasa"
              name="fahasa"
              className="w-4 h-4"
              onChange={() => handleChange("?current_seller=Nhà sách Fahasa")}
            ></input>
            <label htmlFor="fahasa" className="leading-8 text-sm font-medium">
              Nhà sách Fahasa
            </label>
          </div>
          <div className="flex items-center space-x-2 ">
            <input
              type="checkbox"
              id="bamboo"
              name="bamboo"
              className="w-4 h-4"
              onChange={() => handleChange("?current_seller=Bamboo Books")}
            ></input>
            <label htmlFor="bamboo" className="leading-8 text-sm font-medium ">
              Bamboo Books
            </label>
          </div>
          <div className="flex items-center space-x-2 ">
            <input
              type="checkbox"
              id="times"
              name="times"
              className="w-4 h-4"
              onChange={() => handleChange("?current_seller=Tiki Trading")}
            ></input>
            <label htmlFor="times" className="leading-8 text-sm font-medium">
              Tiki Trading
            </label>
          </div>
          <div className="flex items-center space-x-2 ">
            <input
              type="checkbox"
              id="online"
              name="online"
              className="w-4 h-4"
              onChange={() => handleChange("?current_seller=AHABOOKS")}
            ></input>
            <label htmlFor="online" className="leading-8 text-sm font-medium">
              AHABOOKS
            </label>
          </div>
          <div className="flex items-center space-x-2 ">
            <input
              type="checkbox"
              id="vbooks"
              name="vbooks"
              className="w-4 h-4"
              onChange={() => handleChange("?current_seller=BÌNH BÁN BOOK")}
            ></input>
            <label htmlFor="vbooks" className="leading-8 text-sm font-medium">
              BÌNH BÁN BOOK
            </label>
          </div>
        </div>
      </div>

      {/* REVIEW */}
      {/* onClick={() => handleCategorySelect("category1")} */}
      <div className="review mt-3 ml-4">
        <h4 className="text-base leading-8 font-medium">Đánh giá</h4>
        <div className="flex items-center space-x-2 ">
          <div className="flex items-center">
            <Link
              className="flex items-center"
              onClick={() => handleCategorySelect("?rating_average=5")}
            >
              <IoMdStar className="text-yellow-300 "></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <span>từ 5 sao</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center ">
            <Link
              className="flex items-center"
              onClick={() => handleCategorySelect("?rating_average=4")}
            >
              <IoMdStar className="text-yellow-300 "></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <IoMdStar className="text-slate-400"></IoMdStar>
              <span>từ 4 sao</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            className="flex items-center"
            onClick={() => handleCategorySelect("?rating_average=3")}
          >
            <div className="flex items-center ">
              <IoMdStar className="text-yellow-300 "></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <IoMdStar className="text-yellow-300"></IoMdStar>
              <IoMdStar className="text-slate-400"></IoMdStar>
              <IoMdStar className="text-slate-400"></IoMdStar>
            </div>
            <span>từ 3 sao</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

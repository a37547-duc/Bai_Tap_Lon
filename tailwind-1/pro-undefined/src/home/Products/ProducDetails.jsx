import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { FaStarHalf } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, getTotals } from "../../features/cartSlice";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const data1 = useLoaderData();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (data1.images && data1.images.length > 0) {
      setImage(data1.images[0].base_url);
    }
    dispatch(getTotals());
  }, [data1, cartItems]);

  const handleClick = (value) => {
    setImage(value);
  };

  const handleAddToCart = (data1) => {
    dispatch(addToCart(data1));
  };
  const handleDecreaseCart = (data1) => {
    dispatch(decreaseCart(data1));
  };

  const filteredItems = cartItems.filter((item) => item._id === data1._id);

  console.log(cartItems);
  console.log("Dữ liệu chi tiết", data1);
  console.log(filteredItems);

  return (
    <div className="container mx-auto flex space-x-6 ">
      <div className="ml-2 w-1/4 h-fit flex flex-col border-2 rounded-lg  space-y-1">
        <div className=" w-80 h-80 flex ">
          <img className=" object-contain w-full h-full" src={image} alt="" />
        </div>
        <div className="  flex items-end space-y-1 space-x-2 flex-wrap">
          {data1.images &&
            data1.images.map((author, index) => (
              <img
                onClick={() => handleClick(author.base_url)}
                className={`w-20 h-20 object-contain border-2 rounded-lg  ${
                  image === author.base_url
                    ? "border-blue-600 border-2 rounded-lg"
                    : ""
                }`}
                src={author.base_url}
                alt=""
                key={index}
              />
            ))}
        </div>
        <div>
          <p className="text-base font-semibold">Đặc điểm nổi bật</p>
          <div className=" flex space-x-2 ">
            <IoIosCheckmarkCircleOutline className="text-3xl text-blue-500 " />
            <span className="flex items-center">
              Kích thước lớn và bìa cứng, tạo cảm giác sang trọng và bền bỉ
              trọng và bền bỉ
            </span>
          </div>
          <div className="flex space-x-2">
            <IoIosCheckmarkCircleOutline className="text-3xl text-blue-500 " />
            <span>
              Hình vẽ ngộ nghĩnh và màu sắc sống động thu hút sự chú ý của trẻ
              em
            </span>
          </div>
          <div className="flex  space-x-2">
            <IoIosCheckmarkCircleOutline className="text-3xl text-blue-500 " />
            <span>
              Cung cấp thông tin tổng quát về diện tích dân số và ngôn ngữ của
              các quốc gia
            </span>
          </div>
        </div>
      </div>

      {/* THÔNG TIN CHI TIẾT */}

      <div className=" w-2/4 ">
        <div className="space-x-4 space-y-2 h-fit border rounded-xl pt-2 pb-5 ">
          <div className="ml-2 flex space-x-2 items-center ">
            <div className="p-1 flex  space-x-2 items-center rounded-full  bg-sky-50">
              <IoIosCheckmarkCircleOutline className="text-2xl text-blue-500 " />
              <span className="text-sm text-blue-800 font-semibold">
                CHÍNH HÃNG
              </span>
            </div>
            {data1.authors &&
              data1.authors.map((product, index) => (
                <div key={index}>
                  <p className="text-sm">
                    Tác giả:
                    <span className=" text-sm text-blue-700 cursor-pointer hover:underline ml-1">
                      {product.name}
                    </span>
                  </p>
                </div>
              ))}
          </div>
          {/* Review */}
          <div className="space-y-2">
            <div>
              <h3 className="text-xl font-medium">{data1.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span>{data1.rating_average}</span>
              <div>
                <div className="flex items-center ">
                  {Array.from({
                    length: Math.floor(data1.rating_average),
                  }).map((_, index) => (
                    <IoMdStar key={index} className="text-yellow-300" />
                  ))}
                  {/* Hiển thị phần thập phân của rating_average */}
                  {/* {decimalPart > 0 && <IoMdStar className="text-yellow-300" />} */}
                  {parseFloat(data1.rating_average.toString().split(".")[1]) >
                  0 ? (
                    <FaStarHalf className="text-yellow-300 text-xs "></FaStarHalf>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <span className="before:content-['|'] before:mr-1 before:text-slate-200 text-xs text-gray-js text-center">
                {data1.quantity_sold && data1.quantity_sold.text}
              </span>
            </div>
            {/* PRICE */}
            <div className="flex items-center space-x-4 text-3xl font-semibold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              })
                .format(data1.current_seller.price)
                .replace("₫", "")}
              <sup className="underline">đ</sup>
              {/* <sup className="underline">đ</sup> */}
              <div className="text-sm rounded-full bg-slate-200 font-normal">
                {data1.current_seller.price < data1.list_price
                  ? `${-(
                      ((data1.list_price - data1.current_seller.price) /
                        data1.list_price) *
                      100
                    ).toFixed(0)}%`
                  : ""}
              </div>
            </div>
          </div>
        </div>

        {/* INFOMATION */}
        <div className="space-x-4 space-y-2 h-fit border rounded-xl pt-4 pb-4">
          <div className="ml-4">
            <h3 className="font-semibold">Thông tin chi tiết</h3>
          </div>
          <div>
            {data1.specifications &&
              data1.specifications.map((product, index) => (
                <div key={index}>
                  {product.attributes.map((product, index) => (
                    <div
                      className="grid grid-cols-2 border-b-2 py-2 last:border-none"
                      key={index}
                    >
                      <div className="">
                        <span className="text-sm text-neutral-500">
                          {" "}
                          {product.name}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span>{product.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>

        {/* MÔ TẢ SẢN PHẨM */}

        <div className="mt-6 justify-center  flex flex-col space-y-2 h-fit border rounded-xl pt-4 pb-4">
          <h3 className=" ml-4 font-semibold">Mô tả sản phẩm</h3>
          <div className="flex justify-center items-center px-4">
            {data1.images &&
              data1.images
                .map((author, index) => (
                  <img
                    className="w-auto h-auto mx-auto"
                    src={author.base_url}
                    alt=""
                    key={index}
                  />
                ))
                .slice(0, 1)}
          </div>
          <div
            className="mx-4"
            dangerouslySetInnerHTML={{ __html: data1.description }}
          />
        </div>
      </div>
      {/* //////////////////////// */}
      <div className="border w-80">
        <div className="flex flex-col mx-4 my-3 space-y-4">
          <h3>Số lượng</h3>
          <div className="flex space-x-1">
            <button
              onClick={() => handleDecreaseCart(data1)}
              className={`border-slate-300 border-2 font-bold py-2 px-4 rounded text-slate-500 hover:bg-slate-100 
              ${
                filteredItems.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }
             `}
              disabled={filteredItems.length === 0}
            >
              -
            </button>

            {filteredItems.map((data, index) => (
              <span
                key={index}
                className="border-slate-300 border-2 font-bold py-2 px-4 rounded flex justify-center items-center"
              >
                {data.cartQuantity}
              </span>
            ))}
            <button
              onClick={() => handleAddToCart(data1)}
              className="border-slate-300 border-2 font-bold py-2 px-4 rounded text-slate-500 hover:bg-slate-100"
            >
              +
            </button>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold ">Tạm tính</p>
            {filteredItems.map((data, index) => (
              <span
                key={index}
                className="border-slate-300 text-2xl  font-semibold     items-center"
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
                  .format(data.cartQuantity * data.list_price)
                  .replace("₫", "")}
                <sup className="underline">đ</sup>
              </span>
            ))}
          </div>
          <div className="flex flex-col space-y-1">
            <Link className="w-full" to={"/v1/cart"}>
              <button className="w-full rounded-md border p-2 text-white bg-red-500">
                Mua ngay
              </button>
            </Link>
            <button className="border-blue-500 rounded-md border p-2 text-blue-500 bg-white">
              Thêm vào giỏ
            </button>
            <button className="border-blue-500  rounded-md border p-2 text-blue-500 bg-white">
              Mua trước trả sau
            </button>
          </div>
        </div>
      </div>
    </div>

    // Thông tin chi tiết
  );
}

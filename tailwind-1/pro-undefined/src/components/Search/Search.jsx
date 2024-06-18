// import React from "react";
// import { IoSearchOutline } from "react-icons/io5";
// import {
//   useGetAllProductsQuery,
//   useGetProductQuery,
// } from "../../features/apiSlice";

// export default function Search() {
//   const { data: allProductsData } = useGetAllProductsQuery();

//   const { data: singleProductData } = useGetProductQuery("đời ngắn");
//   console.log(singleProductData);

//   return (
//     <div className=" w-2/3  flex items-center justify-center flex-col flex-wrap relative">
//       <div className="bg-white border md:w-3/6 lg:w-full h-10 flex items-center rounded-lg ">
//         <IoSearchOutline className="text-xl mr-2 ml-1 text-gray-js" />
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Freeship đến 30k"
//           className="outline-none grow md:border-r"
//         />
//         <button className="mr-auto hidden sm:block border-none outline-none text-blue-js hover:bg-blue-200 h-10 px-2">
//           Tìm kiếm
//         </button>
//       </div>
//       <div className="absolute top-full left-0  bg-white border rounded-md ">
//         <p className="p-2 hover:bg-gray-200 cursor-pointer"></p>
//         {singleProductData}
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";

// import {
//   useGetAllProductsQuery,
//   useGetProductQuery,
// } from "../../features/apiSlice";
// import { Link } from "react-router-dom";
// import { useRef } from "react";

// export default function Search() {
//   const inputRef = useRef(null);
//   const [input, setInput] = useState();
//   const { data: singleProductData } = useGetProductQuery(input);

//   const handleChange = (value) => {
//     setInput(value);
//     if (value === "") {
//       setInput(null);
//     }
//   };

//   const handleClick = (e) => {
//     setInput("");
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//     setInput(null);
//   };
//   return (
//     <div className="w-2/3 flex items-center justify-center flex-col flex-wrap relative">
//       <div className="bg-white border md:w-3/6 lg:w-full h-10 flex items-center rounded-lg">
//         <input
//           ref={inputRef}
//           onChange={(e) => handleChange(e.target.value)}
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Freeship đến 30k"
//           className="outline-none grow md:border-r"
//         />
//         <button className="mr-auto hidden sm:block border-none outline-none text-blue-js hover:bg-blue-200 h-10 px-2">
//           Tìm kiếm
//         </button>
//       </div>

//       <div className="absolute top-full left-0 border">
//         {singleProductData && singleProductData.length > 0
//           ? singleProductData.map((product, index) => (
//               <div
//                 key={index}
//                 className={` top-full left-0 bg-white  border-b-2 py-4  w-full md:w-3/6 lg:w-full flex flex-col `}
//               >
//                 <div
//                   key={index}
//                   className="p-2 hover:bg-gray-200 cursor-pointer"
//                 >
//                   <Link
//                     onClick={handleClick}
//                     className=" w-full flex items-center space-x-2"
//                     to={`/v1/book/${product._id}`}
//                   >
//                     {product.images &&
//                       product.images
//                         .map((author, index) => (
//                           <img
//                             className="w-28 object-cover"
//                             src={author.base_url}
//                             alt=""
//                             key={index}
//                           />
//                         ))
//                         .slice(0, 1)}
//                     <div className="w-4/6 ">
//                       <h2 className="font-semibold">{product.name}</h2>

//                       {product.authors &&
//                         product.authors.map((author, index) => (
//                           <p key={index} className="font-bold underline">
//                             Author:{" "}
//                             <span className="font-normal italic">
//                               {author.name}
//                             </span>
//                           </p>
//                         ))}
//                     </div>
//                     <div className="text-sm font-medium">
//                       {product.short_description}
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             ))
//           : ""}
//       </div>
//     </div>
//   );
// }

import {
  useGetAllProductsQuery,
  useGetProductQuery,
} from "../../features/apiSlice";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useGetProductQuery } from "your-api-hooks"; // Thay đổi với hook thực tế bạn đang dùng

export default function Search() {
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const [resultsVisible, setResultsVisible] = useState(false);
  const { data: singleProductData } = useGetProductQuery(input);

  const handleChange = (value) => {
    setInput(value);
    setResultsVisible(true);
    if (value === "") {
      setResultsVisible(false);
    }
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setResultsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClick = (e) => {
    setResultsVisible(false);
    setInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleFocus = () => {
    if (input) {
      setResultsVisible(true);
    }
  };

  return (
    <div className="w-2/3 flex items-center justify-center flex-col flex-wrap relative">
      <div className="bg-white border md:w-3/6 lg:w-full h-10 flex items-center rounded-lg">
        <input
          ref={inputRef}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          type="text"
          name="search"
          id="search"
          placeholder="Freeship đến 30k"
          className="outline-none grow md:border-r"
        />
        <button className="mr-auto hidden sm:block border-none outline-none text-blue-js hover:bg-blue-200 h-10 px-2">
          Tìm kiếm
        </button>
      </div>

      {resultsVisible && singleProductData && singleProductData.length > 0 && (
        <div className="absolute top-full left-0 border bg-white md:w-3/6 lg:w-full">
          {singleProductData.map((product, index) => (
            <div
              key={index}
              className="border-b-2 py-4 hover:bg-gray-200 cursor-pointer"
            >
              <Link
                onClick={handleClick}
                className="w-full flex items-center space-x-2"
                to={`/v1/book/${product._id}`}
              >
                {product.images &&
                  product.images
                    .slice(0, 1)
                    .map((image, idx) => (
                      <img
                        className="w-28 object-cover"
                        src={image.base_url}
                        alt=""
                        key={idx}
                      />
                    ))}
                <div className="w-4/6">
                  <h2 className="font-semibold">{product.name}</h2>
                  {product.authors &&
                    product.authors.map((author, idx) => (
                      <p key={idx} className="font-bold underline">
                        Author:{" "}
                        <span className="font-normal italic">
                          {author.name}
                        </span>
                      </p>
                    ))}
                </div>
                <div className="text-sm font-medium">
                  {product.short_description}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

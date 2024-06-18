import React from "react";
import Category from "./Sidebar/Category/Category";
import Product from "./Products/Product";

export default function Home() {
  return (
    <div className="flex space-x-4 ">
      <Category></Category>
      <Product></Product>
    </div>
  );
}

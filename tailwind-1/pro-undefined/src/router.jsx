import * as React from "react";

import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./home/Home";
import ProducDetails from "./home/Products/ProducDetails";
import Cart from "./cart/Cart";
import Error from "./components/Err/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/v1/book/:id",
        element: <ProducDetails></ProducDetails>,
        loader: async ({ params }) => {
          return fetch(`http://localhost:3000/v1/book/${params.id}`);
        },
      },
      {
        path: "/v1/cart",
        element: <Cart></Cart>,
      },
    ],
  },
]);
export default router;

import logoIcon from "./assets/image/logo-icon.png";
import homeIcon from "./assets/image/home-icon.png";
import faceIcon from "./assets/image/face-icon.png";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Outlet } from "react-router-dom";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApi } from "./features/apiSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";
export default function App() {
  return (
    <Provider store={store}>
      <div>
        <ToastContainer></ToastContainer>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </Provider>
  );
}

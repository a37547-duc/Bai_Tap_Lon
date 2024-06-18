import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info("Thêm sản phẩm thành công", {
          position: "top-right",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success("Đã thêm sản phẩm vào giỏ hàng", {
          position: "top-right",
        });
      }
    },

    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItems) => cartItems._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Đã giảm số lượng sản phẩm", {
          position: "top-right",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItems) => cartItems._id !== action.payload._id
        );
        state.cartItems = nextCartItems;
      }
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (carTotal, cartItems) => {
          const { list_price, cartQuantity } = cartItems;
          const itemTotal = list_price * cartQuantity;

          carTotal.total += itemTotal;
          carTotal.quantity += cartQuantity;
          return carTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../features/apiSlice";
import productsReducer, { productsFetch } from "../features/productsSlice";
import cartSlice, { getTotals } from "../features/cartSlice";

import categoryReducer from "../features/categorySlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    products: productsReducer,
    cart: cartSlice,
    category: categoryReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);

// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "", // Chuỗi query được gửi từ Category sang Product
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = categorySlice.actions;

export default categorySlice.reducer;

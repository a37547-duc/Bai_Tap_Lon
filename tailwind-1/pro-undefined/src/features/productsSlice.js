import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",

  async () => {
    const response = await axios.get("http://localhost:3000/v1/book");
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.items.push(action.payload);
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});
// dispatch(productsFetch());

export default productsSlice.reducer;

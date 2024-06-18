import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/v1/" }),
  endpoints: (builder) => ({
    tagTypes: ["Gets"],
    getAllProducts: builder.query({
      query: (query) => `book/${query}`,
      providesTags: ["Gets"],
    }),

    getProduct: builder.query({
      query: (product) => `book/search?q=${product}`,
    }),
  }),
  refetchOnMountOrArgChange: 60, // Refetch nếu đã 60 giây kể từ lần cuối cùng
  refetchOnReconnect: true, // Refetch khi reconnect với mạng
  keepUnusedDataFor: 60 * 60 * 1000, // Giữ dữ liệu trong cache trong 1 giờ nếu không được sử dụng
});

export const { useGetAllProductsQuery, useGetProductQuery } = productsApi;

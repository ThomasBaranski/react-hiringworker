import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const ordersApi = createApi({
  reducerPath: "orders",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (page) => {
        return {
          url: `/orders/get_all_orders/?page_size=10&page=${page?.page}&search=${page?.search}&status=${page?.status}&quote_type=${page?.quote_type}`,
          method: "GET",
        };
      },
    }),

    // New endpoint to fetch a single order by ID
    getOrderById: builder.query({
      query: (orderId) => {
        return {
          url: `/orders/get_single_orders/${orderId}/`, // Adjust the URL pattern according to your API
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetOrderByIdQuery } = ordersApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const earningApi = createApi({
  reducerPath: "earningApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllEarning: builder.query({
      query: ({ page, startdate, enddate, search }) => {
        let URL;
        if (startdate && enddate) {
          URL = `orders/get_all_orders_earning/?page_size=10&page=${page}&start_date=${startdate}&end_date=${enddate}&search=${search}`;
        } else {
          URL = `orders/get_all_orders_earning/?page_size=10&page=${page}&search=${search}`;
        }
        return {
          url: URL,
          method: "GET",
        };
      },
      invalidatesTags: ["earning"],
    }),
    getTotalEarning: builder.query({
      query: () => {
        return {
          url: "/orders/get_all_admin_earning",
          method: "GET",
        };
      },
      invalidatesTags: ["earning"],
    }),
  }),
});
//
export const { useGetAllEarningQuery, useGetTotalEarningQuery } = earningApi;

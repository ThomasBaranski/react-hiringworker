import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const reportedUserApi = createApi({
  reducerPath: "reported",
  // tagTypes: ["reported"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    findAllReport: builder.query({
      query: (data) => {
        return {
          url: `user/report_user/?page_size=10&page=${data?.page}&search=${data?.search}&account_status=${data?.account_status}`,
          method: "GET",
        };
      },
      providesTags: ["reported"],
    }),

    blockReportedUser: builder.mutation({
      query: (body) => ({
        url: "/user/block_user/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["reported"],
    }),
    getSingleReportedUser: builder.query({
      query: (id) => ({
        url: `user/report_user/${id}/`, // Replace with your API endpoint for fetching a single user by id
        method: "GET",
      }),
    }),
  }),
});
export const {
  useFindAllReportQuery,
  // useLazyFindAllReportQuery,
  useGetSingleReportedUserQuery,
  useBlockReportedUserMutation,
} = reportedUserApi;

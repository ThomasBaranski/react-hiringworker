import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const disputeApi = createApi({
  reducerPath: "disputeApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllDispute: builder.query({
      query: ({ page, status, search }) => {
        return {
          url: `/disputes/get_all_disputes/?page_size=10&page=${page}&status=${status}&search=${search}`,
          method: "GET",
        };
      },
      invalidatesTags: ["dispute"],
    }),
    getDisputeById: builder.query({
      query: (orderId) => {
        return {
          url: `/disputes/get_single_dispute/${orderId}/`,
          method: "GET",
        };
      },
      invalidatesTags: ["dispute"],
    }),

    updateDisputeStatus: builder.mutation({
      query: (body) => {
        return {
          url: `/disputes/update_dispute_status/${body.id}/`,
          method: "PATCH",
          body: { status: body.data },
        };
      },
      invalidatesTags: ["dispute"],
    }),
  }),
});
//
export const {
  useGetAllDisputeQuery,
  useGetDisputeByIdQuery,
  useUpdateDisputeStatusMutation,
} = disputeApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const topUpApi = createApi({
  reducerPath: "topup",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    findAllTopUp: builder.query({
      query: (code) => {
        return {
          url: "/topups/topup_search/",
          method: "GET",
          params: {
            code: code,
          },
        };
      },
      providesTags: ["topup"],
    }),
    createNewTopUp: builder.mutation({
      query: (code) => ({
        url: "topups/topup_search/",
        method: "POST",
        params: {
          code: code?.code,
        },
      }),
      invalidatesTags: ["topup"],
    }),
    editTopUp: builder.mutation({
      query: (body) => ({
        url: `/topups/topup_code/${body.id}/`,
        method: "PATCH",
        body: body.dataFinal,
      }),
      invalidatesTags: ["topup"],
    }),
    rejectTopupCode: builder.mutation({
      query: (topup_code) => ({
        url: "/topups/topup/",
        method: "POST",
      }),
      invalidatesTags: ["topup"],
    }),
    acceptTopUpCode: builder.mutation({
      query: (status) => ({
        url: "/topups/topup/",
        method: "POST",
        body: status,
      }),
      invalidatesTags: ["topup"],
    }),
  }),
});

export const {
  useFindAllTopUpQuery,
  useCreateNewTopUpMutation,
  useRejectTopupCodeMutation,
  useAcceptTopUpCodeMutation,
  useEditTopUpMutation,
} = topUpApi;

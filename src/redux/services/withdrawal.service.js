import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const withdrawalApi = createApi({
  reducerPath: "withdrawal",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    FindWithdrawalByCode: builder.query({
      query: (code) => {
        return {
          url: "/withdrawals/withdrawal_search/",
          method: "GET",
          params: {
            code: code,
          },
        };
      },
      providesTags: ["withdrawal"],
    }),

    CreateNewWithdrawal: builder.mutation({
      query: (code) => {
        return {
          url: "withdrawals/withdrawal/",
          method: "POST",
          body: {
            withdrawal_code: code.code,
            status: code.status,
          },
        };
      },
      invalidatesTags: ["withdrawal"],
    }),
  }),
});

export const {
  useLazyFindWithdrawalByCodeQuery,
  useCreateNewWithdrawalMutation,
} = withdrawalApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const withdrawalAuditApi = createApi({
  reducerPath: "withdrawalAudit",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    FindWithdrawalByType: builder.query({
      query: ({ page, usertype, search2 }) => {
        return {
          url: `/withdrawals/withdrawal/?search=${usertype}&page_size=10&page=${page}&search2=${search2}`,
          method: "GET",
        };
      },
      providesTags: ["withdrawalAudit"],
    }),
  }),
});

export const { useFindWithdrawalByTypeQuery } = withdrawalAuditApi;

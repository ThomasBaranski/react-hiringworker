import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const auditApi = createApi({
  reducerPath: "audit",
  tagTypes: ["audit"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    findAllStaffAudit: builder.query({
      query: (code) => {
        return {
          url: "/topups/topup",
          method: "GET",
          params: {
            search: code.search,
            page: code.page,
            page_size: code.page_size,
            search2: code.search2,
          },
        };
      },
      providesTags: ["audit"],
    }),
    findAllCustomerAudit: builder.query({
      query: (code) => {
        // {
        //   console.log("api code", code);
        // }
        return {
          url: "/topups/topup",
          method: "GET",
          params: {
            search: code.search,
            page: code.page,
            page_size: code.page_size,
            search2: code.search2,
          },
        };
      },
      providesTags: ["audit"],
    }),
  }),
});

export const {
  useFindAllStaffAuditQuery,
  useFindAllCustomerAuditQuery,
  useLazyFindAllStaffAuditQuery,
  useLazyFindAllCustomerAuditQuery,
} = auditApi;

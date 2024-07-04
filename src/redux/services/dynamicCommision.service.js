import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const dynamicCommisionApi = createApi({
  reducerPath: "dynamicCommisionApi",
  tagTypes: ["DynamicCommision"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDynamicCommision: builder.query({
      query: () => {
        return {
          url: "terms_privacy/dynamic_commission/",
          method: "GET",
        };
      },
      providesTags: ["DynamicCommision"],
    }),
    updateCommision: builder.mutation({
      query: (body) => (
        console.log("in body", body),
        {
          url: `terms_privacy/dynamic_commission/${body.id}/`,
          method: "PATCH",
          body: body,
        }
      ),
      invalidatesTags: ["DynamicCommision"],
    }),
  }),
});

export const { useGetDynamicCommisionQuery, useUpdateCommisionMutation } =
  dynamicCommisionApi;

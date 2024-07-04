import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const termPolicyApi = createApi({
  reducerPath: "terms",
  tagTypes: ["privacy"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    privacy: builder.query({
      providesTags: ["privacy"],
      query: () => {
        return {
          url: "terms_privacy/terms_and_condition/",
          method: "GET",
        };
      },
    }),
    addTerm: builder.mutation({
      invalidatesTags: ["privacy"],
      query: (body) => ({
        url: "terms_privacy/terms_and_condition/",
        method: "POST",
        body: body,
      }),
    }),
    editTerm: builder.mutation({
      invalidatesTags: ["privacy"],
      query: ([id, body]) => ({
        url: `terms_privacy/terms_and_condition/${id}/`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteTerm: builder.mutation({
      invalidatesTags: ["privacy"],
      query: (id) => ({
        url: `terms_privacy/terms_and_condition/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  usePrivacyQuery,
  useAddTermMutation,
  useDeleteTermMutation,
  useEditTermMutation,
} = termPolicyApi;

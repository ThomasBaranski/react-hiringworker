import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";
export const privacyPolicyApi = createApi({
  reducerPath: "policy",
  tagTypes: ["policy"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    policy: builder.query({
      query: () => {
        return {
          url: "terms_privacy/privacy_and_policy/",
          method: "GET",
        };
      },
      providesTags: ["policy"],
    }),
    addPolicy: builder.mutation({
      query: (body) => ({
        url: "terms_privacy/privacy_and_policy/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["policy"],
    }),
    editPolicy: builder.mutation({
      query: ([id, body]) => ({
        url: `terms_privacy/privacy_and_policy/${id}/`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["policy"],
    }),
    deletePolicy: builder.mutation({
      query: (id) => ({
        url: `terms_privacy/privacy_and_policy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["policy"],
    }),
  }),
});

export const {
  usePolicyQuery,
  useAddPolicyMutation,
  useEditPolicyMutation,
  useDeletePolicyMutation,
} = privacyPolicyApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const skillWokerApi = createApi({
  reducerPath: "skilled",
  tagTypes: ["skillworker", "customer"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    findAll: builder.query({
      query: (page_size) => {
        return {
          url: "/customers/admin-skilled-workers/",
          method: "GET",
          params: {
            ...page_size,
          },
        };
      },
      providesTags: ["skillworker"],
    }),
    getSingleSkillWorkerDetailById: builder.query({
      query: (id) => {
        console.log("id in ss", id);
        return {
          url: `/customers/admin-skilled-worker-detail/${id}/`,

          method: "GET",
        };
      },
      providesTags: ["skillworker"],
    }),
    findById: builder.query({
      query: (id) => {
        return {
          // url: `/skilled-workers/${id}/`,
          url: `/customers/admin-skilled-worker-detail/${id}/`,
          method: "GET",
        };
      },
      providesTags: ["skillworker"],
    }),
    getOccupationList: builder.query({
      query: (body) => ({
        url: `/occupations/`,
        method: "GET",
        // body: body,
      }),
      providesTags: ["customer"],
    }),
    updateSkilledWorkerReq: builder.mutation({
      query: (body) => ({
        url: `/user/update_skilled_worker/${body.id}/`,
        method: "PATCH",
        body: body.data,
      }),
      invalidatesTags: ["skillworker"],
    }),
    createSkilledWorkerReq: builder.mutation({
      query: (body) => ({
        url: `/user/create_skilled_worker/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["skillworker"],
    }),
    deleteSkilledWorkerReq: builder.mutation({
      query: (body) => ({
        url: `/user/delete_skilled_worker/${body.id}/`,
        method: "DELETE",
        // body: body,
      }),
      invalidatesTags: ["skillworker"],
    }),
  }),
});

export const {
  useFindAllQuery,
  useFindByIdQuery,
  useLazyFindAllQuery,
  useGetSingleSkillWorkerDetailByIdQuery,
  useCreateSkilledWorkerReqMutation,
  useGetOccupationListQuery,
  useDeleteSkilledWorkerReqMutation,
  useUpdateSkilledWorkerReqMutation,
} = skillWokerApi;

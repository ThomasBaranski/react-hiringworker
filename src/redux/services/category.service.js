import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const categoryApi = createApi({
  reducerPath: "category",
  tagTypes: ["category"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    category: builder.query({
      query: ({ page, search }) => {
        return {
          url: `occupations/admin/category/?page=${page}&search=${search}`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    categoryNames: builder.query({
      query: () => {
        return {
          url: "occupations/occupationnamelist/",
          method: "GET",
        };
      },
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: "occupations/admin/category/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: (body) =>
        // console.log("body path", body),
        ({
          url: `occupations/admin/category/${body[1]}/`,
          method: "PATCH",
          body: body[0],
        }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (body) =>
        // console.log("body", body),
        ({
          url: `occupations/admin/category/${body.id}`,
          method: "DELETE",
          // body: body,
        }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCategoryNamesQuery,
} = categoryApi;

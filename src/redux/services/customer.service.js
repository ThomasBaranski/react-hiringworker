import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const customerApi = createApi({
  reducerPath: "customer",
  tagTypes: ["customer"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    customerList: builder.query({
      query: (query) => {
        return {
          url: "/customers/customer_list/",
          method: "GET",
          params: {
            ...query,
          },
        };
      },
      providesTags: ["customer"],
    }),
    customerListLazy: builder.query({
      query: (page_size) => {
        return {
          url: "/customers/customer_list/",
          method: "GET",
        };
      },
      providesTags: ["customer"],
    }),
    singleCustomerById: builder.query({
      query: (id) => {
        return {
          url: `/customers/customer_profile/${id}/`,
          method: "GET",
        };
      },
      providesTags: ["customer"],
    }),
    updateCustomerReq: builder.mutation({
      query: (body) => {
        return {
          url: `/customers/admin_customer_update/${body.id}/`,
          method: "PATCH",
          body: body.data,
        };
      },
      invalidatesTags: ["customer"],
    }),
    createNewCustomer: builder.mutation({
      query: (body) => ({
        url: "/user/create_customer/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["customer"],
    }),
    deleteCreatedCustomer: builder.mutation({
      query: (body) => ({
        url: `customers/admin_customer_delete/${body.id}`,
        method: "DELETE",
        // body: body,
      }),
      invalidatesTags: ["customer"],
    }),
  }),
});

export const {
  useCustomerListQuery,
  useLazyCustomerListQuery,
  useSingleCustomerByIdQuery,
  useLazyCustomerListLazyQuery,
  useCreateNewCustomerMutation,
  useDeleteCreatedCustomerMutation,
  useUpdateCustomerReqMutation,
} = customerApi;

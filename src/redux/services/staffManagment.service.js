import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const StaffManagmentApi = createApi({
  reducerPath: "staff",
  tagTypes: ["staff-list"],
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    staffList: builder.query({
      query: (query) => {
        return {
          url: "/staff_management/admin_staff_list/",
          method: "GET",
          params: {
            ...query,
          },
        };
      },
      providesTags: ["staff-list"],
    }),

    createStaffMember: builder.mutation({
      query: (body) => ({
        url: "staff_management/registration/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["staff-list"],
    }),
    singleStaffMember: builder.query({
      query: (id) => ({
        url: `staff_management/admin_staff_detail/${id}/`,
        method: "GET",
      }),
      providesTags: ["staff-list"],
    }),
    updateStaffMember: builder.mutation({
      query: ({ id, body }) => ({
        url: `staff_management/admin_staff_detail/${id}/`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["staff-list"],
    }),
    deleteStaffMember: builder.mutation({
      query: (id) => ({
        url: `staff_management/admin_staff_detail/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff-list"],
    }),
  }),
});

export const {
  useStaffListQuery,
  useLazyStaffListQuery,
  // useLazyStaffListLazyQuery,
  useCreateStaffMemberMutation,
  useSingleStaffMemberQuery,
  useUpdateStaffMemberMutation,
  useDeleteStaffMemberMutation,
} = StaffManagmentApi;

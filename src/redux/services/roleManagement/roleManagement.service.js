import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../util";

export const userPermissionsApi = createApi({
  reducerPath: "permissions",
  tagTypes: ["permissions", "assign", "list"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllPermissions: builder.query({
      query: () => {
        return {
          url: "user/all_permission/",
          method: "GET",
        };
      },
      providesTags: ["permissions", "assign", "list"],
    }),

    roleList: builder.query({
      query: ({ page, search }) => {
        return {
          url: `user/create_role/?page_size=10&page=${page}&search=${search}`,
          method: "GET",
        };
      },
      providesTags: ["permissions"],
    }),
    createPermissions: builder.mutation({
      query: (body) => {
        return {
          url: "user/create_role/",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["permissions"],
    }),
    getCreatedPermissions: builder.query({
      query: (body) => {
        return {
          url: "user/create_role/",
          method: "GET",
        };
      },
      providesTags: ["permissions"],
    }),
    deleteCreatedPermissions: builder.mutation({
      query: (body) => {
        return {
          url: `user/assign_role/${body}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["assign"],
    }),
    roleCreatePermissions: builder.mutation({
      query: (id) => {
        return {
          url: `user/assign_role/${id}/`,
          method: "PUT",
        };
      },
      invalidatesTags: ["permissions"],
    }),
    getSinglePermission: builder.query({
      query: (id) => {
        return {
          url: `user/create_role/${id}/`,
          method: "GET",
        };
      },
      providesTags: ["permissions"],
    }),
    updateRolePermission: builder.mutation({
      query: (data) => {
        return {
          url: `/user/group_permission/${data[0]}/`,
          method: "POST",
          body: data[1],
        };
      },
      invalidatesTags: ["permissions"],
    }),
    assignRoleToUser: builder.mutation({
      query: (data) => {
        const { role, ...rest } = data;
        // console.log("role", role, typeof role);
        return {
          url: `/user/assign_role/`,
          method: "POST",
          body: typeof role == "number" ? data : rest,
        };
      },
      invalidatesTags: ["assign"],
    }),
    list: builder.query({
      providesTags: ["list"],
      query: ({ page, search }) => {
        console.log(
          "🚀 ~ file: roleManagement.service.js:99 ~ page, search:",
          page,
          search
        );
        return {
          url: `user/assign_role/?page_size=10&page=${page}&search=${search}`,
          method: "GET",
        };
      },
      providesTags: ["assign"],
    }),
    updateAssignedUserRole: builder.mutation({
      query: (assignData) => {
        // console.log({ assignData });
        return {
          url: `/user/assign_role/${assignData?.[0]}/`,
          method: "PATCH",
          body: assignData?.[1],
        };
      },
      invalidatesTags: ["permissions", "assign", "list"],
    }),
    deleteListedRole: builder.mutation({
      query: (body) => {
        {
          // console.log("api body", body);
        }
        return {
          url: `user/create_role/${body}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["permissions"],
    }),
  }),
});

export const {
  useGetAllPermissionsQuery,
  useCreatePermissionsMutation,
  useGetCreatedPermissionsQuery,
  useDeleteCreatedPermissionsMutation,
  useGetSinglePermissionQuery,
  useUpdateRolePermissionMutation,
  useAssignRoleToUserMutation,
  useRoleCreatePermissionMutation,
  useUpdateAssignedUserRoleMutation,
  useListQuery,
  useDeleteListedRoleMutation,
  useRoleListQuery,
} = userPermissionsApi;

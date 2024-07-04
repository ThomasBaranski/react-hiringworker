import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

// import { } from "react-router-dom"

export const dashboardApi = createApi({
  reducerPath: "dashboard",
  tagTypes: ["dashboard"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    dashboard: builder.mutation({
      query: (body) => ({
        url: "customers/admin-dashboard/?page=" + body[1].page,
        method: "POST",
        body: body[0],
      }),
    }),
  }),
});

export const { useDashboardMutation } = dashboardApi;

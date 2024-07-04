import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const filterApi = createApi({
  reducerPath: "filter",
  tagTypes: ["filters"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("clientapikey", `${process.env.REACT_APP_CLIENT_API_KEY}`);
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    filterResults: builder.mutation({
      query: (body) => ({
        url: "/customers/admin-dashboard/",
        method: "POST",
        body: body,
      }),
      providesTags: ["filters"],
    }),
  }),
});

export const { useFilterResultsMutation } = filterApi;

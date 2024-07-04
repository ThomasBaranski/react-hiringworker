import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const skillWokerApi = createApi({
  reducerPath: "skillworker",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      // console.log(token);
      headers.set("clientapikey", `${process.env.REACT_APP_CLIENT_API_KEY}`);
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    findAll: builder.query({
      query: () => {
        return {
          url: "/skilled-workers/",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFindAllQuery } = skillWokerApi;

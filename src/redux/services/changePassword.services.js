import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const changePasswordApi = createApi({
  reducerPath: "changePassword",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers) => {
      console.log(
        "process.env.REACT_APP_CLIENT_API_KEY",
        process.env.REACT_APP_CLIENT_API_KEY
      );
      const token = localStorage.getItem("token");
      headers.set("clientapikey", `${process.env.REACT_APP_CLIENT_API_KEY}`);
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fildAll: builder.mutation({
      query: (body) => ({
        url: "user/password/change/",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const { useFildAllMutation } = changePasswordApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      clientapikey: `${process.env.REACT_APP_CLIENT_API_KEY}`,
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/api/admin_user_login/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;

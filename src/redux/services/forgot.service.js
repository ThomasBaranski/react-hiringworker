import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forgotApi = createApi({
  reducerPath: "forgot",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      clientapikey: `${process.env.REACT_APP_CLIENT_API_KEY}`,
    },
  }),
  endpoints: (builder) => ({
    forget: builder.mutation({
      query: (body) => ({
        url: "/user/auth/password/forget/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useForgetMutation } = forgotApi;

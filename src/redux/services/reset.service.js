import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resetApi = createApi({
  reducerPath: "reset",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      clientapikey: `${process.env.REACT_APP_CLIENT_API_KEY}`,
    },
  }),
  endpoints: (builder) => ({
    reset: builder.mutation({
      query: (body) => ({
        url: "/user/auth/password/reset/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useResetMutation } = resetApi;

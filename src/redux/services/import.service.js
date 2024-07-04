import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const importApi = createApi({
  reducerPath: "importApiData",
  tagTypes: ["Import"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    importCsv: builder.mutation({
      query: (body) => ({
        url: "/user/upload_user_file/",
        method: "POST",
        body,
      }),
      providesTags: ["Import"],
    }),
  }),
});

export const { useImportCsvMutation } = importApi;

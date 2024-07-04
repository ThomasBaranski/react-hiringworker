import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const newsLetterApi = createApi({
  reducerPath: "news",
  tagTypes: ["/customers/news_letter/"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    newsList: builder.query({
      query: (page) => {
        return {
          url: `/customers/news_letter/?page_size=10&page=${page?.page}&search=${page?.search}`,
          method: "GET",
        };
      },
      providesTags: ["/customers/news_letter/"],
    }),
  }),
});

export const { useNewsListQuery } = newsLetterApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const contactusApi = createApi({
  reducerPath: "contactusapi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllContactUs: builder.query({
      query: ({ page, search }) => {
        return {
          url: `/contact-us/contact_us_list/?page_size=10&page=${page}&search=${search}`,
          method: "GET",
        };
      },
      invalidatesTags: ["contactusapi"],
    }),

    getContactById: builder.query({
      query: (id) => {
        return {
          url: `/contact-us/get_contact_us/${id}/`,
          method: "GET",
        };
      },
      invalidatesTags: ["contactusapi"],
    }),
  }),
});
//
export const { useGetAllContactUsQuery, useGetContactByIdQuery } = contactusApi;

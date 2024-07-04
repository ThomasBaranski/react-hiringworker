import { createApi } from "@reduxjs/toolkit/query//react";
import baseQueryWithReauth from "./util";

export const CountryStateCityApi = createApi({
  reducerPath: "country",
  tagTypes: ["country"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    countryList: builder.query({
      query: () => {
        return {
          url: "countries/",
          method: "GET",
        };
      },
      providesTags: ["country"],
    }),
    stateList: builder.query({
      query: ({ country }) => {
        return {
          url: `states/?country=${country}`,
          method: "GET",
        };
      },
    }),
    cityList: builder.query({
      query: ({ country, state }) => {
        return {
          url: `cities/?state=${state}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCountryListQuery,
  useLazyStateListQuery,
  useLazyCityListQuery,
} = CountryStateCityApi;

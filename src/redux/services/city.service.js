import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const CityApi = createApi({
  reducerPath: "city",
  tagTypes: ["city"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    cityList: builder.query({
      query: (body) => {
        return {
          url: `cities/?country=${body.country}&states=${body.state}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCityListQuery } = CityApi;

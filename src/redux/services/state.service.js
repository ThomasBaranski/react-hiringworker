import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./util";

export const StateApi = createApi({
  reducerPath: "state",
  tagTypes: ["state"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    stateList: builder.query({
      query: (body) => {
        {
          console.log("state body", body);
        }
        return {
          url: `states/?country=${body}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useStateListQuery } = StateApi;

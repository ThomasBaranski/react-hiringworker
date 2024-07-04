import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_BASE_URL}`,

  // attach bearer token to headers in every request
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("clientapikey", `${process.env.REACT_APP_CLIENT_API_KEY}`);
    }
    return headers;
  },
});

// redirect user to login page when token is expired
const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    var result = await baseQuery(args, api, extraOptions);
    if (
      result.error &&
      (result.error.status === 401 || result.error.status === 406)
    ) {
      localStorage.removeItem("token");

      window.location.href = "/login";
      // redirect("/login");
    }
    return result;
  } catch (error) {
    console.log("err", error);
  }
};

export default baseQueryWithReauth;

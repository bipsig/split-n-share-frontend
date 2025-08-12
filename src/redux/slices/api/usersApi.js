import { apiSlice } from "./apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: 'users/me'
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      }
    })
  })
})

export const { useGetUserDetailsQuery } = usersApi;
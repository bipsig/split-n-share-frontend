import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
       url: 'auth/login',
       method: 'POST',
       body: credentials, 
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      },
    }),
    // MORE ENDPOINTS
  })
});

export const { useLoginMutation } = authApi;
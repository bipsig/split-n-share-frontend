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
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'DELETE'
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      },
    }),
    identifyUser: builder.mutation({
      query: (userData) => ({
        url: 'auth/identifyUser',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      },
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: 'auth/resetPassword',
        method: 'POST',
        body: resetData,
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      },
    })
  })
  // MORE ENDPOINTS
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useIdentifyUserMutation, useResetPasswordMutation } = authApi;
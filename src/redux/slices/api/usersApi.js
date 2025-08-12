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
    }),
    getFinancialSummary: builder.query({
      query: () => ({
        url: 'users/financial-summary'
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      }
    }),
    getGroupsSummary: builder.query({
      query: () => ({
        url: 'users/groups-summary'
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      }
    }),
    getRecentTransactions: builder.query({
      query: () => ({
        url: 'users/recent-transactions'
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

export const { useGetUserDetailsQuery, useGetFinancialSummaryQuery, useGetGroupsSummaryQuery, useGetRecentTransactionsQuery } = usersApi;
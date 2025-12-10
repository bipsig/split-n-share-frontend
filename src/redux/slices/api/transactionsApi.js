import { apiSlice } from "./apiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addExpense: builder.mutation({
      query: (expenseData) => ({
        url: 'transactions',
        method: 'POST',
        body: expenseData,
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      }
    }),
    deleteTransaction: builder.mutation({
      query: (transactionId) => ({
        url: `transactions/${transactionId}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => {
        if (!response.success) {
          throw new Error(response.message);
        }
        return response;
      }
    })
  })
})

export const { useAddExpenseMutation, useDeleteTransactionMutation } = transactionApi;